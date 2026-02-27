"""
College Admission Assistant — FastAPI Backend
==========================================
Architecture:
  1. Filter colleges by exam/course/budget/state
  2. Score using weighted algorithm (rank, NIRF, placement, budget)
  3. RAG: embed student profile + retrieve top-k semantically similar colleges
  4. LLM: generate personalized explanations via Groq (llama-3.3-70b-versatile)
  5. Return ranked results with Safe/Target/Dream classification

Setup:
  pip install fastapi uvicorn groq numpy python-dotenv
  export GROQ_API_KEY=gsk_...
  uvicorn main:app --reload --port 8000
"""

import os
import math
import json
from typing import List, Optional
from dataclasses import dataclass, field
from dotenv import load_dotenv

import numpy as np
from groq import Groq
from fastapi import FastAPI, HTTPException
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

load_dotenv()

app = FastAPI(title="College Admission Assistant API", version="1.0.0")

# Allow frontend dev server
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000", "*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

client = Groq(api_key=os.getenv("GROQ_API_KEY"))

# ---------------------------------------------------------------------------
# Data Layer — mirrors frontend/src/data/colleges.ts
# ---------------------------------------------------------------------------

@dataclass
class College:
    id: int
    college_name: str
    state: str
    city: str
    course: str
    exam: str
    closing_rank: int
    average_fees: int
    college_type: str   # "Government" | "Private"
    nirf_ranking: int
    placement_rate: int
    # Vector embedding computed at startup
    embedding: List[float] = field(default_factory=list)


COLLEGES_RAW: List[College] = [
    # IITs - JEE
    College(1, "IIT Bombay", "Maharashtra", "Mumbai", "BTech", "JEE", 1200, 250000, "Government", 3, 98),
    College(2, "IIT Delhi", "Delhi", "New Delhi", "BTech", "JEE", 1500, 240000, "Government", 2, 97),
    College(3, "IIT Madras", "Tamil Nadu", "Chennai", "BTech", "JEE", 1800, 230000, "Government", 1, 97),
    College(4, "IIT Kanpur", "Uttar Pradesh", "Kanpur", "BTech", "JEE", 2500, 220000, "Government", 4, 95),
    College(5, "IIT Kharagpur", "West Bengal", "Kharagpur", "BTech", "JEE", 3000, 220000, "Government", 5, 95),
    College(6, "IIT Roorkee", "Uttarakhand", "Roorkee", "BTech", "JEE", 4000, 210000, "Government", 6, 93),
    College(7, "IIT Guwahati", "Assam", "Guwahati", "BTech", "JEE", 4500, 210000, "Government", 7, 92),
    College(8, "IIT Hyderabad", "Telangana", "Hyderabad", "BTech", "JEE", 5000, 210000, "Government", 8, 93),
    College(9, "IIT BHU Varanasi", "Uttar Pradesh", "Varanasi", "BTech", "JEE", 6000, 200000, "Government", 10, 90),
    College(10, "IIT Indore", "Madhya Pradesh", "Indore", "BTech", "JEE", 7000, 200000, "Government", 11, 89),
    College(11, "IIT Dhanbad (ISM)", "Jharkhand", "Dhanbad", "BTech", "JEE", 8000, 200000, "Government", 14, 88),
    College(12, "IIT Tirupati", "Andhra Pradesh", "Tirupati", "BTech", "JEE", 9000, 200000, "Government", 25, 82),
    College(13, "IIT Patna", "Bihar", "Patna", "BTech", "JEE", 9500, 200000, "Government", 22, 83),
    College(14, "IIT Bhubaneswar", "Odisha", "Bhubaneswar", "BTech", "JEE", 10000, 200000, "Government", 20, 84),
    College(15, "IIT Mandi", "Himachal Pradesh", "Mandi", "BTech", "JEE", 10500, 200000, "Government", 18, 85),
    College(16, "IIT Jodhpur", "Rajasthan", "Jodhpur", "BTech", "JEE", 11000, 200000, "Government", 26, 82),
    College(17, "IIT Gandhinagar", "Gujarat", "Gandhinagar", "BTech", "JEE", 7500, 210000, "Government", 15, 90),
    College(18, "IIT Ropar", "Punjab", "Rupnagar", "BTech", "JEE", 10200, 200000, "Government", 23, 84),
    College(19, "IIT Jammu", "Jammu & Kashmir", "Jammu", "BTech", "JEE", 12000, 200000, "Government", 40, 78),
    College(20, "IIT Dharwad", "Karnataka", "Dharwad", "BTech", "JEE", 12500, 200000, "Government", 45, 76),
    # NITs - JEE
    College(21, "NIT Trichy", "Tamil Nadu", "Trichy", "BTech", "JEE", 8000, 180000, "Government", 9, 92),
    College(22, "NIT Surathkal", "Karnataka", "Mangalore", "BTech", "JEE", 9000, 175000, "Government", 12, 90),
    College(23, "NIT Warangal", "Telangana", "Warangal", "BTech", "JEE", 10000, 170000, "Government", 13, 89),
    College(24, "NIT Calicut", "Kerala", "Calicut", "BTech", "JEE", 12000, 165000, "Government", 16, 88),
    College(25, "NIT Rourkela", "Odisha", "Rourkela", "BTech", "JEE", 14000, 160000, "Government", 17, 87),
    College(26, "MNIT Jaipur", "Rajasthan", "Jaipur", "BTech", "JEE", 15000, 160000, "Government", 19, 86),
    College(27, "NIT Durgapur", "West Bengal", "Durgapur", "BTech", "JEE", 18000, 155000, "Government", 28, 82),
    College(28, "MNNIT Allahabad", "Uttar Pradesh", "Allahabad", "BTech", "JEE", 16000, 155000, "Government", 21, 85),
    College(29, "NIT Silchar", "Assam", "Silchar", "BTech", "JEE", 25000, 140000, "Government", 35, 78),
    College(30, "NIT Hamirpur", "Himachal Pradesh", "Hamirpur", "BTech", "JEE", 30000, 135000, "Government", 42, 75),
    College(31, "NIT Jalandhar", "Punjab", "Jalandhar", "BTech", "JEE", 28000, 145000, "Government", 38, 77),
    College(32, "NIT Kurukshetra", "Haryana", "Kurukshetra", "BTech", "JEE", 22000, 150000, "Government", 30, 80),
    College(33, "NIT Surat (SVNIT)", "Gujarat", "Surat", "BTech", "JEE", 17000, 155000, "Government", 27, 83),
    College(34, "NIT Nagpur (VNIT)", "Maharashtra", "Nagpur", "BTech", "JEE", 13000, 160000, "Government", 24, 86),
    College(35, "NIT Agartala", "Tripura", "Agartala", "BTech", "JEE", 40000, 120000, "Government", 60, 65),
    College(36, "NIT Manipur", "Manipur", "Imphal", "BTech", "JEE", 45000, 115000, "Government", 70, 60),
    College(37, "NIT Meghalaya", "Meghalaya", "Shillong", "BTech", "JEE", 42000, 118000, "Government", 65, 62),
    College(38, "NIT Mizoram", "Mizoram", "Aizawl", "BTech", "JEE", 48000, 110000, "Government", 75, 58),
    College(39, "NIT Sikkim", "Sikkim", "Ravangla", "BTech", "JEE", 47000, 112000, "Government", 72, 59),
    College(40, "NIT Arunachal Pradesh", "Arunachal Pradesh", "Yupia", "BTech", "JEE", 50000, 108000, "Government", 80, 55),
    # IIITs - JEE
    College(41, "IIIT Hyderabad", "Telangana", "Hyderabad", "BTech", "JEE", 3500, 350000, "Government", 29, 96),
    College(42, "IIIT Bangalore", "Karnataka", "Bangalore", "BTech", "JEE", 5500, 400000, "Government", 33, 94),
    College(43, "IIIT Allahabad", "Uttar Pradesh", "Allahabad", "BTech", "JEE", 8500, 280000, "Government", 36, 88),
    College(44, "IIIT Delhi", "Delhi", "New Delhi", "BTech", "JEE", 6000, 320000, "Government", 31, 92),
    College(45, "IIIT Gwalior", "Madhya Pradesh", "Gwalior", "BTech", "JEE", 15000, 200000, "Government", 50, 80),
    College(46, "IIIT Jabalpur", "Madhya Pradesh", "Jabalpur", "BTech", "JEE", 18000, 180000, "Government", 55, 76),
    College(47, "IIIT Kottayam", "Kerala", "Kottayam", "BTech", "JEE", 22000, 170000, "Government", 58, 74),
    College(48, "IIIT Sri City", "Andhra Pradesh", "Sri City", "BTech", "JEE", 16000, 250000, "Government", 48, 82),
    College(49, "IIIT Lucknow", "Uttar Pradesh", "Lucknow", "BTech", "JEE", 20000, 190000, "Government", 52, 78),
    College(50, "IIIT Vadodara", "Gujarat", "Vadodara", "BTech", "JEE", 24000, 175000, "Government", 56, 74),
    # Private Engineering - JEE
    College(51, "BITS Pilani", "Rajasthan", "Pilani", "BTech", "JEE", 5000, 500000, "Private", 32, 95),
    College(52, "BITS Goa", "Goa", "Goa", "BTech", "JEE", 8000, 500000, "Private", 37, 92),
    College(53, "BITS Hyderabad", "Telangana", "Hyderabad", "BTech", "JEE", 10000, 500000, "Private", 39, 90),
    College(54, "VIT Vellore", "Tamil Nadu", "Vellore", "BTech", "JEE", 25000, 380000, "Private", 34, 85),
    College(55, "SRM Chennai", "Tamil Nadu", "Chennai", "BTech", "JEE", 30000, 400000, "Private", 41, 80),
    College(56, "Manipal Institute of Technology", "Karnataka", "Manipal", "BTech", "JEE", 20000, 450000, "Private", 43, 85),
    College(57, "Thapar University", "Punjab", "Patiala", "BTech", "JEE", 22000, 350000, "Private", 44, 82),
    College(58, "Amity University Noida", "Uttar Pradesh", "Noida", "BTech", "JEE", 35000, 300000, "Private", 62, 75),
    College(59, "LPU Jalandhar", "Punjab", "Jalandhar", "BTech", "JEE", 40000, 280000, "Private", 68, 72),
    College(60, "Chandigarh University", "Punjab", "Chandigarh", "BTech", "JEE", 38000, 320000, "Private", 66, 74),
    College(61, "Christ University Bangalore", "Karnataka", "Bangalore", "BTech", "JEE", 32000, 260000, "Private", 71, 76),
    College(62, "PES University Bangalore", "Karnataka", "Bangalore", "BTech", "JEE", 28000, 400000, "Private", 63, 80),
    College(63, "RV College of Engineering", "Karnataka", "Bangalore", "BTech", "JEE", 15000, 350000, "Private", 47, 84),
    College(64, "MS Ramaiah Institute of Technology", "Karnataka", "Bangalore", "BTech", "JEE", 18000, 320000, "Private", 54, 82),
    College(65, "BMS College of Engineering", "Karnataka", "Bangalore", "BTech", "JEE", 20000, 300000, "Private", 57, 80),
    # NEET Colleges - Medical
    College(101, "AIIMS Delhi", "Delhi", "New Delhi", "MBBS", "NEET", 50, 1500, "Government", 1, 100),
    College(102, "AIIMS Mumbai", "Maharashtra", "Mumbai", "MBBS", "NEET", 200, 2000, "Government", 2, 99),
    College(103, "AIIMS Bangalore", "Karnataka", "Bangalore", "MBBS", "NEET", 300, 2000, "Government", 3, 99),
    College(104, "AIIMS Bhopal", "Madhya Pradesh", "Bhopal", "MBBS", "NEET", 400, 2000, "Government", 4, 98),
    College(105, "AIIMS Jodhpur", "Rajasthan", "Jodhpur", "MBBS", "NEET", 500, 2000, "Government", 5, 98),
    College(106, "JIPMER Puducherry", "Puducherry", "Puducherry", "MBBS", "NEET", 600, 5000, "Government", 6, 97),
    College(107, "Maulana Azad Medical College", "Delhi", "New Delhi", "MBBS", "NEET", 1200, 50000, "Government", 7, 96),
    College(108, "Lady Hardinge Medical College", "Delhi", "New Delhi", "MBBS", "NEET", 2000, 45000, "Government", 8, 95),
    College(109, "Grant Medical College Mumbai", "Maharashtra", "Mumbai", "MBBS", "NEET", 3000, 80000, "Government", 9, 94),
    College(110, "Madras Medical College", "Tamil Nadu", "Chennai", "MBBS", "NEET", 2500, 60000, "Government", 10, 95),
    College(111, "Osmania Medical College", "Telangana", "Hyderabad", "MBBS", "NEET", 5000, 70000, "Government", 15, 90),
    College(112, "Bangalore Medical College", "Karnataka", "Bangalore", "MBBS", "NEET", 4500, 75000, "Government", 13, 91),
    College(113, "Stanley Medical College Chennai", "Tamil Nadu", "Chennai", "MBBS", "NEET", 6000, 65000, "Government", 18, 89),
    College(114, "Kasturba Medical College Manipal", "Karnataka", "Manipal", "MBBS", "NEET", 15000, 1800000, "Private", 22, 92),
    College(115, "Amrita School of Medicine", "Tamil Nadu", "Coimbatore", "MBBS", "NEET", 20000, 1600000, "Private", 25, 88),
    College(116, "Sri Ramachandra Medical College", "Tamil Nadu", "Chennai", "MBBS", "NEET", 18000, 1500000, "Private", 20, 90),
    College(117, "JSS Medical College", "Karnataka", "Mysore", "MBBS", "NEET", 25000, 1200000, "Private", 30, 85),
    College(118, "KIMS Hyderabad", "Telangana", "Hyderabad", "MBBS", "NEET", 30000, 1000000, "Private", 35, 83),
    College(119, "Saveetha Medical College", "Tamil Nadu", "Chennai", "MBBS", "NEET", 40000, 900000, "Private", 45, 78),
    College(120, "Shri Sathya Sai Medical College", "Tamil Nadu", "Chennai", "MBBS", "NEET", 35000, 950000, "Private", 40, 80),
    # CUET Colleges - Central Universities
    College(201, "Delhi University - BA (Hons) Economics", "Delhi", "New Delhi", "BA", "CUET", 500, 30000, "Government", 11, 88),
    College(202, "Delhi University - BCom (Hons)", "Delhi", "New Delhi", "BCom", "CUET", 800, 28000, "Government", 11, 85),
    College(203, "Delhi University - BSc (Hons) Mathematics", "Delhi", "New Delhi", "BSc", "CUET", 1000, 25000, "Government", 11, 82),
    College(204, "JNU - BA Social Sciences", "Delhi", "New Delhi", "BA", "CUET", 2000, 20000, "Government", 8, 90),
    College(205, "BHU - BA Liberal Arts", "Uttar Pradesh", "Varanasi", "BA", "CUET", 3000, 15000, "Government", 16, 78),
    College(206, "BHU - BCom", "Uttar Pradesh", "Varanasi", "BCom", "CUET", 4000, 14000, "Government", 16, 75),
    College(207, "BHU - BSc", "Uttar Pradesh", "Varanasi", "BSc", "CUET", 5000, 13000, "Government", 16, 74),
    College(208, "Hyderabad Central University - MA", "Telangana", "Hyderabad", "BA", "CUET", 6000, 25000, "Government", 19, 80),
    College(209, "Jadavpur University - BA", "West Bengal", "Kolkata", "BA", "CUET", 7000, 20000, "Government", 23, 77),
    College(210, "Jadavpur University - BSc", "West Bengal", "Kolkata", "BSc", "CUET", 6500, 18000, "Government", 23, 76),
    College(211, "Pondicherry University - BA", "Puducherry", "Puducherry", "BA", "CUET", 10000, 30000, "Government", 40, 70),
    College(212, "Jamia Millia Islamia - BA", "Delhi", "New Delhi", "BA", "CUET", 8000, 22000, "Government", 30, 75),
    College(213, "Aligarh Muslim University - BA", "Uttar Pradesh", "Aligarh", "BA", "CUET", 9000, 18000, "Government", 32, 72),
    College(214, "Aligarh Muslim University - BCom", "Uttar Pradesh", "Aligarh", "BCom", "CUET", 11000, 16000, "Government", 32, 70),
    College(215, "Tezpur University - BSc", "Assam", "Tezpur", "BSc", "CUET", 15000, 25000, "Government", 50, 65),
]

# ---------------------------------------------------------------------------
# Embedding & RAG Layer
# ---------------------------------------------------------------------------

def build_college_text(c: College) -> str:
    """Create a rich text representation of a college for embedding."""
    return (
        f"{c.college_name} located in {c.city}, {c.state}. "
        f"Offers {c.course} via {c.exam} exam. "
        f"Closing rank: {c.closing_rank}. "
        f"Annual fees: ₹{c.average_fees:,}. "
        f"NIRF national ranking: #{c.nirf_ranking}. "
        f"Placement rate: {c.placement_rate}%. "
        f"College type: {c.college_type}."
    )


def simple_tfidf_embed(text: str, vocab: dict, idf: np.ndarray) -> np.ndarray:
    """Lightweight TF-IDF based embedding (no external model needed)."""
    words = text.lower().split()
    tf = {}
    for w in words:
        tf[w] = tf.get(w, 0) + 1
    vec = np.zeros(len(vocab))
    for w, count in tf.items():
        if w in vocab:
            vec[vocab[w]] = (count / len(words)) * idf[vocab[w]]
    norm = np.linalg.norm(vec)
    return vec / norm if norm > 0 else vec


class VectorStore:
    def __init__(self):
        self.colleges: List[College] = []
        self.vocab: dict = {}
        self.idf: np.ndarray = np.array([])
        self.embeddings: np.ndarray = np.array([])

    def build(self, colleges: List[College]):
        self.colleges = colleges
        texts = [build_college_text(c) for c in colleges]

        # Build vocabulary
        all_words = set()
        for t in texts:
            all_words.update(t.lower().split())
        self.vocab = {w: i for i, w in enumerate(sorted(all_words))}

        # Compute IDF
        df = np.zeros(len(self.vocab))
        for t in texts:
            words = set(t.lower().split())
            for w in words:
                if w in self.vocab:
                    df[self.vocab[w]] += 1
        self.idf = np.log((len(texts) + 1) / (df + 1)) + 1

        # Embed all colleges
        self.embeddings = np.array([
            simple_tfidf_embed(t, self.vocab, self.idf) for t in texts
        ])

    def query(self, query_text: str, k: int = 5) -> List[College]:
        """Retrieve top-k semantically similar colleges."""
        qvec = simple_tfidf_embed(query_text, self.vocab, self.idf)
        if np.linalg.norm(qvec) == 0:
            return self.colleges[:k]
        sims = self.embeddings @ qvec
        top_k = np.argsort(sims)[::-1][:k]
        return [self.colleges[i] for i in top_k]


vector_store = VectorStore()

@app.on_event("startup")
async def startup():
    vector_store.build(COLLEGES_RAW)
    print(f"✅ Vector store built with {len(COLLEGES_RAW)} colleges")

# ---------------------------------------------------------------------------
# Scoring & Filtering Logic (mirrors frontend logic, enhanced)
# ---------------------------------------------------------------------------

def classify_chance(student_rank: int, closing_rank: int) -> str:
    ratio = student_rank / closing_rank
    if ratio <= 0.7:
        return "Safe"
    elif ratio <= 1.0:
        return "Target"
    return "Dream"


def score_college(college: College, prefs: "StudentPreferences") -> float:
    margin = prefs.rank * 0.3
    rank_proximity = max(0, min(1, 1 - (prefs.rank / (college.closing_rank + margin))))
    nirf_score = max(0, (100 - college.nirf_ranking) / 100)
    placement_score = college.placement_rate / 100
    budget_fit = max(0, 1 - (college.average_fees / prefs.budgetMax)) if prefs.budgetMax > 0 else 0
    return round((0.4 * rank_proximity + 0.2 * nirf_score + 0.2 * placement_score + 0.2 * budget_fit) * 100)


def filter_colleges(all_colleges: List[College], prefs: "StudentPreferences") -> List[College]:
    margin = prefs.rank * 0.3
    filtered = []
    for c in all_colleges:
        if c.exam != prefs.exam:
            continue
        if c.course != prefs.course:
            continue
        if c.average_fees > prefs.budgetMax:
            continue
        if prefs.state and prefs.state != "Any" and c.state != prefs.state:
            continue
        if prefs.collegeType != "Any" and c.college_type != prefs.collegeType:
            continue
        if prefs.rank > c.closing_rank + margin:
            continue
        filtered.append(c)
    return filtered

# ---------------------------------------------------------------------------
# LLM Explanation (RAG + Groq)
# ---------------------------------------------------------------------------

def build_rag_context(colleges: List[College], prefs: "StudentPreferences") -> str:
    """Build the retrieval context string for LLM."""
    lines = []
    for c in colleges:
        lines.append(
            f"- {c.college_name} ({c.state}): Exam={c.exam}, Course={c.course}, "
            f"ClosingRank={c.closing_rank}, Fees=₹{c.average_fees:,}, "
            f"NIRF=#{c.nirf_ranking}, Placement={c.placement_rate}%, Type={c.college_type}"
        )
    return "\n".join(lines)


def generate_llm_explanation(college: College, prefs: "StudentPreferences", chance: str, score: int) -> str:
    """Use Groq to generate a personalized, context-aware explanation."""
    # Use RAG to retrieve semantically similar colleges for richer context
    query = (
        f"Student with rank {prefs.rank} looking for {prefs.course} via {prefs.exam} "
        f"in {prefs.state}, budget ₹{prefs.budgetMax:,}, considering {college.college_name}"
    )
    similar = vector_store.query(query, k=3)
    rag_context = build_rag_context(similar, prefs)

    prompt = f"""You are an expert Indian college admission counselor.

Student Profile:
- Exam: {prefs.exam}
- Rank: {prefs.rank:,}
- Budget: ₹{prefs.budgetMax:,}/year
- Preferred State: {prefs.state}
- Course: {prefs.course}
- College Type: {prefs.collegeType}

College Being Evaluated:
- Name: {college.college_name}
- Location: {college.city}, {college.state}
- Closing Rank: {college.closing_rank:,}
- Annual Fees: ₹{college.average_fees:,}
- NIRF Ranking: #{college.nirf_ranking}
- Placement Rate: {college.placement_rate}%
- Match Score: {score}/100
- Admission Chance: {chance}

Similar Colleges (RAG context for comparison):
{rag_context}

Write a concise, personalized 2-3 sentence explanation for why this college is recommended for this student. 
Mention: rank compatibility, fees vs budget, placement strength, and any notable advantage.
Be specific, encouraging, and honest about risks if it's a Dream college.
Do NOT use bullet points. Write in flowing prose. Keep it under 60 words."""

    try:
        response = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            max_tokens=150,
            messages=[{"role": "user", "content": prompt}]
        )
        return response.choices[0].message.content.strip()
    except Exception as e:
        # Fallback to rule-based explanation
        return _fallback_explanation(college, prefs, chance, score)


def _fallback_explanation(college: College, prefs: "StudentPreferences", chance: str, score: int) -> str:
    parts = []
    if chance == "Safe":
        parts.append(f"Your rank ({prefs.rank:,}) is comfortably within the closing rank of {college.closing_rank:,}, giving you a strong chance.")
    elif chance == "Target":
        parts.append(f"Your rank ({prefs.rank:,}) is close to the closing rank of {college.closing_rank:,} — competitive but achievable.")
    else:
        parts.append(f"Your rank ({prefs.rank:,}) is above the closing rank of {college.closing_rank:,} — an aspirational pick worth monitoring.")
    if college.average_fees <= prefs.budgetMax * 0.7:
        parts.append(f"The fees of ₹{college.average_fees:,} are well within your budget.")
    if college.placement_rate >= 90:
        parts.append(f"Outstanding placement record of {college.placement_rate}%.")
    if college.nirf_ranking <= 10:
        parts.append(f"Ranked #{college.nirf_ranking} nationally by NIRF.")
    return " ".join(parts)

# ---------------------------------------------------------------------------
# API Models & Endpoints
# ---------------------------------------------------------------------------

class StudentPreferences(BaseModel):
    exam: str = Field(..., example="JEE")
    rank: int = Field(..., gt=0, example=5000)
    budgetMin: int = Field(default=0, ge=0)
    budgetMax: int = Field(..., gt=0, example=300000)
    state: str = Field(default="Any", example="Any")
    course: str = Field(..., example="BTech")
    collegeType: str = Field(default="Any", example="Any")
    useAI: bool = Field(default=True, description="Use Claude AI for explanations (slower but richer)")


class RecommendedCollege(BaseModel):
    id: int
    college_name: str
    state: str
    city: str
    course: str
    exam: str
    closing_rank: int
    average_fees: int
    college_type: str
    nirf_ranking: int
    placement_rate: int
    matchScore: int
    admissionChance: str
    explanation: str


class RecommendationResponse(BaseModel):
    total_filtered: int
    results: List[RecommendedCollege]
    student_summary: str


@app.get("/")
def root():
    return {"message": "College Admission Assistant API", "status": "running", "version": "1.0.0"}


@app.get("/health")
def health():
    return {"status": "ok", "colleges_loaded": len(COLLEGES_RAW)}


@app.get("/meta")
def get_meta():
    """Return available exams, courses, states for the frontend dropdowns."""
    exams = list(set(c.exam for c in COLLEGES_RAW))
    courses_by_exam: dict = {}
    for c in COLLEGES_RAW:
        courses_by_exam.setdefault(c.exam, set()).add(c.course)
    states = sorted(set(c.state for c in COLLEGES_RAW))
    return {
        "exams": sorted(exams),
        "courses": {k: sorted(v) for k, v in courses_by_exam.items()},
        "states": states,
        "college_types": ["Any", "Government", "Private"],
    }


@app.post("/recommendations", response_model=RecommendationResponse)
def get_recommendations(prefs: StudentPreferences):
    # Step 1: Filter
    filtered = filter_colleges(COLLEGES_RAW, prefs)

    if not filtered:
        return RecommendationResponse(
            total_filtered=0,
            results=[],
            student_summary=f"No colleges found matching your criteria. Try increasing your budget or removing the state filter."
        )

    # Step 2: Score & Sort
    scored = []
    for c in filtered:
        score = score_college(c, prefs)
        chance = classify_chance(prefs.rank, c.closing_rank)
        scored.append((c, score, chance))

    scored.sort(key=lambda x: x[1], reverse=True)
    top10 = scored[:10]

    # Step 3: Generate explanations (AI or fallback)
    results = []
    for c, score, chance in top10:
        if prefs.useAI:
            explanation = generate_llm_explanation(c, prefs, chance, score)
        else:
            explanation = _fallback_explanation(c, prefs, chance, score)

        results.append(RecommendedCollege(
            id=c.id,
            college_name=c.college_name,
            state=c.state,
            city=c.city,
            course=c.course,
            exam=c.exam,
            closing_rank=c.closing_rank,
            average_fees=c.average_fees,
            college_type=c.college_type,
            nirf_ranking=c.nirf_ranking,
            placement_rate=c.placement_rate,
            matchScore=score,
            admissionChance=chance,
            explanation=explanation,
        ))

    # Step 4: Summary
    safe = sum(1 for r in results if r.admissionChance == "Safe")
    target = sum(1 for r in results if r.admissionChance == "Target")
    dream = sum(1 for r in results if r.admissionChance == "Dream")
    summary = (
        f"Found {len(filtered)} eligible colleges from {len(COLLEGES_RAW)} in our database. "
        f"Showing top {len(results)}: {safe} Safe, {target} Target, {dream} Dream colleges."
    )

    return RecommendationResponse(
        total_filtered=len(filtered),
        results=results,
        student_summary=summary,
    )


# ---------------------------------------------------------------------------
# Chat Streaming Endpoint (ChatGPT-style SSE)
# ---------------------------------------------------------------------------

class CollegeInfo(BaseModel):
    college_name: str
    state: str
    city: str
    course: str
    exam: str
    closing_rank: int
    average_fees: int
    college_type: str
    nirf_ranking: int
    placement_rate: int
    matchScore: int
    admissionChance: str


class ChatStreamRequest(BaseModel):
    college: CollegeInfo
    student_rank: Optional[int] = None
    student_budget: Optional[int] = None
    system_prompt: str
    user_message: str


@app.post("/chat/stream")
async def chat_stream(req: ChatStreamRequest):
    """
    Streams a Groq LLM response as Server-Sent Events (SSE).
    The frontend reads chunks token-by-token and appends them — ChatGPT style.
    """

    def generate():
        try:
            stream = client.chat.completions.create(
                model="llama-3.3-70b-versatile",
                max_tokens=800,
                stream=True,
                messages=[
                    {"role": "system", "content": req.system_prompt},
                    {"role": "user", "content": req.user_message},
                ],
            )

            for chunk in stream:
                delta = chunk.choices[0].delta
                if delta.content:
                    data = {"choices": [{"delta": {"content": delta.content}}]}
                    yield f"data: {json.dumps(data)}\n\n"

            yield "data: [DONE]\n\n"

        except Exception as e:
            error_data = {"choices": [{"delta": {"content": f"\n\n[Error: {str(e)}]"}}]}
            yield f"data: {json.dumps(error_data)}\n\n"
            yield "data: [DONE]\n\n"

    return StreamingResponse(
        generate(),
        media_type="text/event-stream",
        headers={
            "Cache-Control": "no-cache",
            "X-Accel-Buffering": "no",
            "Access-Control-Allow-Origin": "*",
        },
    )