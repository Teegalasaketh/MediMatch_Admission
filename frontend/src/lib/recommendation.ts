// Drop this into frontend/src/lib/recommendation.ts

import { College } from "@/data/colleges";

export interface StudentPreferences {
  exam: string;
  rank: number;
  budgetMin: number;
  budgetMax: number;
  state: string;
  course: string;
  collegeType: string;
  useAI?: boolean;
}

export type AdmissionChance = "Safe" | "Target" | "Dream";

export interface RecommendedCollege extends College {
  matchScore: number;
  admissionChance: AdmissionChance;
  explanation: string;
}

export interface RecommendationResponse {
  total_filtered: number;
  results: RecommendedCollege[];
  student_summary: string;
}

const API_BASE = import.meta.env.VITE_API_URL ?? "http://localhost:8000";

export async function getRecommendations(
  prefs: StudentPreferences
): Promise<RecommendedCollege[]> {
  const data = await getRecommendationsFull(prefs);
  return data.results;
}

export async function getRecommendationsFull(
  prefs: StudentPreferences
): Promise<RecommendationResponse> {
  const res = await fetch(`${API_BASE}/recommendations`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...prefs, useAI: prefs.useAI ?? true }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`API error ${res.status}: ${err}`);
  }

  return res.json();
}