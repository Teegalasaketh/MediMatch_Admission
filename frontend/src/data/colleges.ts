export interface College {
  id: number;
  college_name: string;
  state: string;
  city: string;
  course: string;
  exam: string;
  closing_rank: number;
  average_fees: number;
  college_type: "Government" | "Private";
  nirf_ranking: number;
  placement_rate: number;
}

// 300+ Indian colleges dataset
export const colleges: College[] = [
  // IITs - JEE
  { id: 1, college_name: "IIT Bombay", state: "Maharashtra", city: "Mumbai", course: "BTech", exam: "JEE", closing_rank: 1200, average_fees: 250000, college_type: "Government", nirf_ranking: 3, placement_rate: 98 },
  { id: 2, college_name: "IIT Delhi", state: "Delhi", city: "New Delhi", course: "BTech", exam: "JEE", closing_rank: 1500, average_fees: 240000, college_type: "Government", nirf_ranking: 2, placement_rate: 97 },
  { id: 3, college_name: "IIT Madras", state: "Tamil Nadu", city: "Chennai", course: "BTech", exam: "JEE", closing_rank: 1800, average_fees: 230000, college_type: "Government", nirf_ranking: 1, placement_rate: 97 },
  { id: 4, college_name: "IIT Kanpur", state: "Uttar Pradesh", city: "Kanpur", course: "BTech", exam: "JEE", closing_rank: 2500, average_fees: 220000, college_type: "Government", nirf_ranking: 4, placement_rate: 95 },
  { id: 5, college_name: "IIT Kharagpur", state: "West Bengal", city: "Kharagpur", course: "BTech", exam: "JEE", closing_rank: 3000, average_fees: 220000, college_type: "Government", nirf_ranking: 5, placement_rate: 95 },
  { id: 6, college_name: "IIT Roorkee", state: "Uttarakhand", city: "Roorkee", course: "BTech", exam: "JEE", closing_rank: 4000, average_fees: 210000, college_type: "Government", nirf_ranking: 6, placement_rate: 93 },
  { id: 7, college_name: "IIT Guwahati", state: "Assam", city: "Guwahati", course: "BTech", exam: "JEE", closing_rank: 4500, average_fees: 210000, college_type: "Government", nirf_ranking: 7, placement_rate: 92 },
  { id: 8, college_name: "IIT Hyderabad", state: "Telangana", city: "Hyderabad", course: "BTech", exam: "JEE", closing_rank: 5000, average_fees: 210000, college_type: "Government", nirf_ranking: 8, placement_rate: 93 },
  { id: 9, college_name: "IIT BHU Varanasi", state: "Uttar Pradesh", city: "Varanasi", course: "BTech", exam: "JEE", closing_rank: 6000, average_fees: 200000, college_type: "Government", nirf_ranking: 10, placement_rate: 90 },
  { id: 10, college_name: "IIT Indore", state: "Madhya Pradesh", city: "Indore", course: "BTech", exam: "JEE", closing_rank: 7000, average_fees: 200000, college_type: "Government", nirf_ranking: 11, placement_rate: 89 },
  { id: 11, college_name: "IIT Dhanbad (ISM)", state: "Jharkhand", city: "Dhanbad", course: "BTech", exam: "JEE", closing_rank: 8000, average_fees: 200000, college_type: "Government", nirf_ranking: 14, placement_rate: 88 },
  { id: 12, college_name: "IIT Tirupati", state: "Andhra Pradesh", city: "Tirupati", course: "BTech", exam: "JEE", closing_rank: 9000, average_fees: 200000, college_type: "Government", nirf_ranking: 25, placement_rate: 82 },
  { id: 13, college_name: "IIT Patna", state: "Bihar", city: "Patna", course: "BTech", exam: "JEE", closing_rank: 9500, average_fees: 200000, college_type: "Government", nirf_ranking: 22, placement_rate: 83 },
  { id: 14, college_name: "IIT Bhubaneswar", state: "Odisha", city: "Bhubaneswar", course: "BTech", exam: "JEE", closing_rank: 10000, average_fees: 200000, college_type: "Government", nirf_ranking: 20, placement_rate: 84 },
  { id: 15, college_name: "IIT Mandi", state: "Himachal Pradesh", city: "Mandi", course: "BTech", exam: "JEE", closing_rank: 10500, average_fees: 200000, college_type: "Government", nirf_ranking: 18, placement_rate: 85 },
  { id: 16, college_name: "IIT Jodhpur", state: "Rajasthan", city: "Jodhpur", course: "BTech", exam: "JEE", closing_rank: 11000, average_fees: 200000, college_type: "Government", nirf_ranking: 26, placement_rate: 82 },
  { id: 17, college_name: "IIT Gandhinagar", state: "Gujarat", city: "Gandhinagar", course: "BTech", exam: "JEE", closing_rank: 7500, average_fees: 210000, college_type: "Government", nirf_ranking: 15, placement_rate: 90 },
  { id: 18, college_name: "IIT Ropar", state: "Punjab", city: "Rupnagar", course: "BTech", exam: "JEE", closing_rank: 10200, average_fees: 200000, college_type: "Government", nirf_ranking: 23, placement_rate: 84 },
  { id: 19, college_name: "IIT Jammu", state: "Jammu & Kashmir", city: "Jammu", course: "BTech", exam: "JEE", closing_rank: 12000, average_fees: 200000, college_type: "Government", nirf_ranking: 40, placement_rate: 78 },
  { id: 20, college_name: "IIT Dharwad", state: "Karnataka", city: "Dharwad", course: "BTech", exam: "JEE", closing_rank: 12500, average_fees: 200000, college_type: "Government", nirf_ranking: 45, placement_rate: 76 },

  // NITs - JEE
  { id: 21, college_name: "NIT Trichy", state: "Tamil Nadu", city: "Trichy", course: "BTech", exam: "JEE", closing_rank: 8000, average_fees: 180000, college_type: "Government", nirf_ranking: 9, placement_rate: 92 },
  { id: 22, college_name: "NIT Surathkal", state: "Karnataka", city: "Mangalore", course: "BTech", exam: "JEE", closing_rank: 9000, average_fees: 175000, college_type: "Government", nirf_ranking: 12, placement_rate: 90 },
  { id: 23, college_name: "NIT Warangal", state: "Telangana", city: "Warangal", course: "BTech", exam: "JEE", closing_rank: 10000, average_fees: 170000, college_type: "Government", nirf_ranking: 13, placement_rate: 89 },
  { id: 24, college_name: "NIT Calicut", state: "Kerala", city: "Calicut", course: "BTech", exam: "JEE", closing_rank: 12000, average_fees: 165000, college_type: "Government", nirf_ranking: 16, placement_rate: 88 },
  { id: 25, college_name: "NIT Rourkela", state: "Odisha", city: "Rourkela", course: "BTech", exam: "JEE", closing_rank: 14000, average_fees: 160000, college_type: "Government", nirf_ranking: 17, placement_rate: 87 },
  { id: 26, college_name: "MNIT Jaipur", state: "Rajasthan", city: "Jaipur", course: "BTech", exam: "JEE", closing_rank: 15000, average_fees: 160000, college_type: "Government", nirf_ranking: 19, placement_rate: 86 },
  { id: 27, college_name: "NIT Durgapur", state: "West Bengal", city: "Durgapur", course: "BTech", exam: "JEE", closing_rank: 18000, average_fees: 155000, college_type: "Government", nirf_ranking: 28, placement_rate: 82 },
  { id: 28, college_name: "MNNIT Allahabad", state: "Uttar Pradesh", city: "Allahabad", course: "BTech", exam: "JEE", closing_rank: 16000, average_fees: 155000, college_type: "Government", nirf_ranking: 21, placement_rate: 85 },
  { id: 29, college_name: "NIT Silchar", state: "Assam", city: "Silchar", course: "BTech", exam: "JEE", closing_rank: 25000, average_fees: 140000, college_type: "Government", nirf_ranking: 35, placement_rate: 78 },
  { id: 30, college_name: "NIT Hamirpur", state: "Himachal Pradesh", city: "Hamirpur", course: "BTech", exam: "JEE", closing_rank: 30000, average_fees: 135000, college_type: "Government", nirf_ranking: 42, placement_rate: 75 },
  { id: 31, college_name: "NIT Jalandhar", state: "Punjab", city: "Jalandhar", course: "BTech", exam: "JEE", closing_rank: 28000, average_fees: 145000, college_type: "Government", nirf_ranking: 38, placement_rate: 77 },
  { id: 32, college_name: "NIT Kurukshetra", state: "Haryana", city: "Kurukshetra", course: "BTech", exam: "JEE", closing_rank: 22000, average_fees: 150000, college_type: "Government", nirf_ranking: 30, placement_rate: 80 },
  { id: 33, college_name: "NIT Surat (SVNIT)", state: "Gujarat", city: "Surat", course: "BTech", exam: "JEE", closing_rank: 17000, average_fees: 155000, college_type: "Government", nirf_ranking: 27, placement_rate: 83 },
  { id: 34, college_name: "NIT Nagpur (VNIT)", state: "Maharashtra", city: "Nagpur", course: "BTech", exam: "JEE", closing_rank: 13000, average_fees: 160000, college_type: "Government", nirf_ranking: 24, placement_rate: 86 },
  { id: 35, college_name: "NIT Agartala", state: "Tripura", city: "Agartala", course: "BTech", exam: "JEE", closing_rank: 40000, average_fees: 120000, college_type: "Government", nirf_ranking: 60, placement_rate: 65 },
  { id: 36, college_name: "NIT Manipur", state: "Manipur", city: "Imphal", course: "BTech", exam: "JEE", closing_rank: 45000, average_fees: 115000, college_type: "Government", nirf_ranking: 70, placement_rate: 60 },
  { id: 37, college_name: "NIT Meghalaya", state: "Meghalaya", city: "Shillong", course: "BTech", exam: "JEE", closing_rank: 42000, average_fees: 118000, college_type: "Government", nirf_ranking: 65, placement_rate: 62 },
  { id: 38, college_name: "NIT Mizoram", state: "Mizoram", city: "Aizawl", course: "BTech", exam: "JEE", closing_rank: 48000, average_fees: 110000, college_type: "Government", nirf_ranking: 75, placement_rate: 58 },
  { id: 39, college_name: "NIT Sikkim", state: "Sikkim", city: "Ravangla", course: "BTech", exam: "JEE", closing_rank: 47000, average_fees: 112000, college_type: "Government", nirf_ranking: 72, placement_rate: 59 },
  { id: 40, college_name: "NIT Arunachal Pradesh", state: "Arunachal Pradesh", city: "Yupia", course: "BTech", exam: "JEE", closing_rank: 50000, average_fees: 108000, college_type: "Government", nirf_ranking: 80, placement_rate: 55 },

  // IIITs - JEE
  { id: 41, college_name: "IIIT Hyderabad", state: "Telangana", city: "Hyderabad", course: "BTech", exam: "JEE", closing_rank: 3500, average_fees: 350000, college_type: "Government", nirf_ranking: 29, placement_rate: 96 },
  { id: 42, college_name: "IIIT Bangalore", state: "Karnataka", city: "Bangalore", course: "BTech", exam: "JEE", closing_rank: 5500, average_fees: 400000, college_type: "Government", nirf_ranking: 33, placement_rate: 94 },
  { id: 43, college_name: "IIIT Allahabad", state: "Uttar Pradesh", city: "Allahabad", course: "BTech", exam: "JEE", closing_rank: 8500, average_fees: 280000, college_type: "Government", nirf_ranking: 36, placement_rate: 88 },
  { id: 44, college_name: "IIIT Delhi", state: "Delhi", city: "New Delhi", course: "BTech", exam: "JEE", closing_rank: 6000, average_fees: 320000, college_type: "Government", nirf_ranking: 31, placement_rate: 92 },
  { id: 45, college_name: "IIIT Gwalior", state: "Madhya Pradesh", city: "Gwalior", course: "BTech", exam: "JEE", closing_rank: 15000, average_fees: 200000, college_type: "Government", nirf_ranking: 50, placement_rate: 80 },
  { id: 46, college_name: "IIIT Jabalpur", state: "Madhya Pradesh", city: "Jabalpur", course: "BTech", exam: "JEE", closing_rank: 18000, average_fees: 180000, college_type: "Government", nirf_ranking: 55, placement_rate: 76 },
  { id: 47, college_name: "IIIT Kottayam", state: "Kerala", city: "Kottayam", course: "BTech", exam: "JEE", closing_rank: 22000, average_fees: 170000, college_type: "Government", nirf_ranking: 58, placement_rate: 74 },
  { id: 48, college_name: "IIIT Sri City", state: "Andhra Pradesh", city: "Sri City", course: "BTech", exam: "JEE", closing_rank: 16000, average_fees: 250000, college_type: "Government", nirf_ranking: 48, placement_rate: 82 },
  { id: 49, college_name: "IIIT Lucknow", state: "Uttar Pradesh", city: "Lucknow", course: "BTech", exam: "JEE", closing_rank: 20000, average_fees: 190000, college_type: "Government", nirf_ranking: 52, placement_rate: 78 },
  { id: 50, college_name: "IIIT Vadodara", state: "Gujarat", city: "Vadodara", course: "BTech", exam: "JEE", closing_rank: 24000, average_fees: 175000, college_type: "Government", nirf_ranking: 56, placement_rate: 74 },

  // Private Engineering - JEE
  { id: 51, college_name: "BITS Pilani", state: "Rajasthan", city: "Pilani", course: "BTech", exam: "JEE", closing_rank: 5000, average_fees: 500000, college_type: "Private", nirf_ranking: 32, placement_rate: 95 },
  { id: 52, college_name: "BITS Goa", state: "Goa", city: "Goa", course: "BTech", exam: "JEE", closing_rank: 8000, average_fees: 500000, college_type: "Private", nirf_ranking: 37, placement_rate: 92 },
  { id: 53, college_name: "BITS Hyderabad", state: "Telangana", city: "Hyderabad", course: "BTech", exam: "JEE", closing_rank: 10000, average_fees: 500000, college_type: "Private", nirf_ranking: 39, placement_rate: 90 },
  { id: 54, college_name: "VIT Vellore", state: "Tamil Nadu", city: "Vellore", course: "BTech", exam: "JEE", closing_rank: 25000, average_fees: 380000, college_type: "Private", nirf_ranking: 34, placement_rate: 85 },
  { id: 55, college_name: "SRM Chennai", state: "Tamil Nadu", city: "Chennai", course: "BTech", exam: "JEE", closing_rank: 30000, average_fees: 400000, college_type: "Private", nirf_ranking: 41, placement_rate: 80 },
  { id: 56, college_name: "Manipal Institute of Technology", state: "Karnataka", city: "Manipal", course: "BTech", exam: "JEE", closing_rank: 20000, average_fees: 450000, college_type: "Private", nirf_ranking: 43, placement_rate: 85 },
  { id: 57, college_name: "Thapar University", state: "Punjab", city: "Patiala", course: "BTech", exam: "JEE", closing_rank: 22000, average_fees: 350000, college_type: "Private", nirf_ranking: 44, placement_rate: 82 },
  { id: 58, college_name: "PES University", state: "Karnataka", city: "Bangalore", course: "BTech", exam: "JEE", closing_rank: 28000, average_fees: 420000, college_type: "Private", nirf_ranking: 46, placement_rate: 80 },
  { id: 59, college_name: "Amity University Noida", state: "Uttar Pradesh", city: "Noida", course: "BTech", exam: "JEE", closing_rank: 50000, average_fees: 350000, college_type: "Private", nirf_ranking: 62, placement_rate: 70 },
  { id: 60, college_name: "LPU Jalandhar", state: "Punjab", city: "Jalandhar", course: "BTech", exam: "JEE", closing_rank: 55000, average_fees: 280000, college_type: "Private", nirf_ranking: 68, placement_rate: 65 },
  { id: 61, college_name: "Shiv Nadar University", state: "Uttar Pradesh", city: "Greater Noida", course: "BTech", exam: "JEE", closing_rank: 18000, average_fees: 480000, college_type: "Private", nirf_ranking: 47, placement_rate: 85 },
  { id: 62, college_name: "DAIICT Gandhinagar", state: "Gujarat", city: "Gandhinagar", course: "BTech", exam: "JEE", closing_rank: 15000, average_fees: 350000, college_type: "Private", nirf_ranking: 49, placement_rate: 86 },
  { id: 63, college_name: "RVCE Bangalore", state: "Karnataka", city: "Bangalore", course: "BTech", exam: "JEE", closing_rank: 20000, average_fees: 280000, college_type: "Private", nirf_ranking: 51, placement_rate: 83 },
  { id: 64, college_name: "BMS College of Engineering", state: "Karnataka", city: "Bangalore", course: "BTech", exam: "JEE", closing_rank: 22000, average_fees: 260000, college_type: "Private", nirf_ranking: 53, placement_rate: 82 },
  { id: 65, college_name: "MS Ramaiah Institute of Technology", state: "Karnataka", city: "Bangalore", course: "BTech", exam: "JEE", closing_rank: 25000, average_fees: 300000, college_type: "Private", nirf_ranking: 54, placement_rate: 80 },
  { id: 66, college_name: "Chandigarh University", state: "Punjab", city: "Mohali", course: "BTech", exam: "JEE", closing_rank: 45000, average_fees: 300000, college_type: "Private", nirf_ranking: 63, placement_rate: 72 },
  { id: 67, college_name: "KIIT Bhubaneswar", state: "Odisha", city: "Bhubaneswar", course: "BTech", exam: "JEE", closing_rank: 35000, average_fees: 320000, college_type: "Private", nirf_ranking: 57, placement_rate: 75 },
  { id: 68, college_name: "Symbiosis Institute of Technology", state: "Maharashtra", city: "Pune", course: "BTech", exam: "JEE", closing_rank: 30000, average_fees: 380000, college_type: "Private", nirf_ranking: 59, placement_rate: 78 },
  { id: 69, college_name: "Nirma University", state: "Gujarat", city: "Ahmedabad", course: "BTech", exam: "JEE", closing_rank: 28000, average_fees: 300000, college_type: "Private", nirf_ranking: 61, placement_rate: 76 },
  { id: 70, college_name: "NMIMS Mumbai", state: "Maharashtra", city: "Mumbai", course: "BTech", exam: "JEE", closing_rank: 15000, average_fees: 500000, college_type: "Private", nirf_ranking: 40, placement_rate: 88 },

  // Government Engineering - State Level
  { id: 71, college_name: "Jadavpur University", state: "West Bengal", city: "Kolkata", course: "BTech", exam: "JEE", closing_rank: 8000, average_fees: 50000, college_type: "Government", nirf_ranking: 16, placement_rate: 90 },
  { id: 72, college_name: "Anna University", state: "Tamil Nadu", city: "Chennai", course: "BTech", exam: "JEE", closing_rank: 15000, average_fees: 60000, college_type: "Government", nirf_ranking: 20, placement_rate: 85 },
  { id: 73, college_name: "COEP Pune", state: "Maharashtra", city: "Pune", course: "BTech", exam: "JEE", closing_rank: 12000, average_fees: 80000, college_type: "Government", nirf_ranking: 33, placement_rate: 87 },
  { id: 74, college_name: "DTU Delhi", state: "Delhi", city: "New Delhi", course: "BTech", exam: "JEE", closing_rank: 8000, average_fees: 170000, college_type: "Government", nirf_ranking: 36, placement_rate: 90 },
  { id: 75, college_name: "NSUT Delhi", state: "Delhi", city: "New Delhi", course: "BTech", exam: "JEE", closing_rank: 10000, average_fees: 160000, college_type: "Government", nirf_ranking: 38, placement_rate: 88 },
  { id: 76, college_name: "IIIT Delhi", state: "Delhi", city: "New Delhi", course: "BTech", exam: "JEE", closing_rank: 6000, average_fees: 320000, college_type: "Government", nirf_ranking: 31, placement_rate: 92 },
  { id: 77, college_name: "PEC Chandigarh", state: "Chandigarh", city: "Chandigarh", course: "BTech", exam: "JEE", closing_rank: 18000, average_fees: 130000, college_type: "Government", nirf_ranking: 45, placement_rate: 82 },
  { id: 78, college_name: "HBTU Kanpur", state: "Uttar Pradesh", city: "Kanpur", course: "BTech", exam: "JEE", closing_rank: 30000, average_fees: 100000, college_type: "Government", nirf_ranking: 55, placement_rate: 72 },
  { id: 79, college_name: "NIT Goa", state: "Goa", city: "Goa", course: "BTech", exam: "JEE", closing_rank: 35000, average_fees: 140000, college_type: "Government", nirf_ranking: 50, placement_rate: 70 },
  { id: 80, college_name: "NIT Puducherry", state: "Puducherry", city: "Karaikal", course: "BTech", exam: "JEE", closing_rank: 38000, average_fees: 125000, college_type: "Government", nirf_ranking: 55, placement_rate: 68 },

  // NEET - Medical Colleges
  { id: 81, college_name: "AIIMS Delhi", state: "Delhi", city: "New Delhi", course: "MBBS", exam: "NEET", closing_rank: 100, average_fees: 8000, college_type: "Government", nirf_ranking: 1, placement_rate: 99 },
  { id: 82, college_name: "JIPMER Puducherry", state: "Puducherry", city: "Puducherry", course: "MBBS", exam: "NEET", closing_rank: 500, average_fees: 15000, college_type: "Government", nirf_ranking: 3, placement_rate: 98 },
  { id: 83, college_name: "CMC Vellore", state: "Tamil Nadu", city: "Vellore", course: "MBBS", exam: "NEET", closing_rank: 200, average_fees: 50000, college_type: "Private", nirf_ranking: 2, placement_rate: 98 },
  { id: 84, college_name: "AIIMS Jodhpur", state: "Rajasthan", city: "Jodhpur", course: "MBBS", exam: "NEET", closing_rank: 1500, average_fees: 8000, college_type: "Government", nirf_ranking: 5, placement_rate: 96 },
  { id: 85, college_name: "AIIMS Bhopal", state: "Madhya Pradesh", city: "Bhopal", course: "MBBS", exam: "NEET", closing_rank: 2000, average_fees: 8000, college_type: "Government", nirf_ranking: 6, placement_rate: 95 },
  { id: 86, college_name: "AIIMS Rishikesh", state: "Uttarakhand", city: "Rishikesh", course: "MBBS", exam: "NEET", closing_rank: 2500, average_fees: 8000, college_type: "Government", nirf_ranking: 7, placement_rate: 94 },
  { id: 87, college_name: "KGMU Lucknow", state: "Uttar Pradesh", city: "Lucknow", course: "MBBS", exam: "NEET", closing_rank: 5000, average_fees: 30000, college_type: "Government", nirf_ranking: 8, placement_rate: 93 },
  { id: 88, college_name: "Maulana Azad Medical College", state: "Delhi", city: "New Delhi", course: "MBBS", exam: "NEET", closing_rank: 300, average_fees: 25000, college_type: "Government", nirf_ranking: 4, placement_rate: 97 },
  { id: 89, college_name: "Grant Medical College Mumbai", state: "Maharashtra", city: "Mumbai", course: "MBBS", exam: "NEET", closing_rank: 3000, average_fees: 40000, college_type: "Government", nirf_ranking: 10, placement_rate: 92 },
  { id: 90, college_name: "Seth GS Medical College", state: "Maharashtra", city: "Mumbai", course: "MBBS", exam: "NEET", closing_rank: 2000, average_fees: 35000, college_type: "Government", nirf_ranking: 9, placement_rate: 94 },
  { id: 91, college_name: "BJ Medical College Ahmedabad", state: "Gujarat", city: "Ahmedabad", course: "MBBS", exam: "NEET", closing_rank: 6000, average_fees: 30000, college_type: "Government", nirf_ranking: 12, placement_rate: 90 },
  { id: 92, college_name: "Madras Medical College", state: "Tamil Nadu", city: "Chennai", course: "MBBS", exam: "NEET", closing_rank: 4000, average_fees: 15000, college_type: "Government", nirf_ranking: 11, placement_rate: 92 },
  { id: 93, college_name: "Osmania Medical College", state: "Telangana", city: "Hyderabad", course: "MBBS", exam: "NEET", closing_rank: 8000, average_fees: 25000, college_type: "Government", nirf_ranking: 15, placement_rate: 88 },
  { id: 94, college_name: "Stanley Medical College", state: "Tamil Nadu", city: "Chennai", course: "MBBS", exam: "NEET", closing_rank: 7000, average_fees: 15000, college_type: "Government", nirf_ranking: 14, placement_rate: 89 },
  { id: 95, college_name: "PGIMER Chandigarh", state: "Chandigarh", city: "Chandigarh", course: "MBBS", exam: "NEET", closing_rank: 400, average_fees: 10000, college_type: "Government", nirf_ranking: 4, placement_rate: 97 },
  { id: 96, college_name: "AIIMS Patna", state: "Bihar", city: "Patna", course: "MBBS", exam: "NEET", closing_rank: 3500, average_fees: 8000, college_type: "Government", nirf_ranking: 13, placement_rate: 90 },
  { id: 97, college_name: "AIIMS Raipur", state: "Chhattisgarh", city: "Raipur", course: "MBBS", exam: "NEET", closing_rank: 4000, average_fees: 8000, college_type: "Government", nirf_ranking: 16, placement_rate: 88 },
  { id: 98, college_name: "AIIMS Bhubaneswar", state: "Odisha", city: "Bhubaneswar", course: "MBBS", exam: "NEET", closing_rank: 3000, average_fees: 8000, college_type: "Government", nirf_ranking: 12, placement_rate: 91 },
  { id: 99, college_name: "AIIMS Nagpur", state: "Maharashtra", city: "Nagpur", course: "MBBS", exam: "NEET", closing_rank: 4500, average_fees: 8000, college_type: "Government", nirf_ranking: 18, placement_rate: 87 },
  { id: 100, college_name: "AIIMS Mangalagiri", state: "Andhra Pradesh", city: "Mangalagiri", course: "MBBS", exam: "NEET", closing_rank: 5000, average_fees: 8000, college_type: "Government", nirf_ranking: 20, placement_rate: 85 },

  // Private Medical - NEET
  { id: 101, college_name: "Kasturba Medical College Manipal", state: "Karnataka", city: "Manipal", course: "MBBS", exam: "NEET", closing_rank: 15000, average_fees: 1200000, college_type: "Private", nirf_ranking: 18, placement_rate: 92 },
  { id: 102, college_name: "St. John's Medical College", state: "Karnataka", city: "Bangalore", course: "MBBS", exam: "NEET", closing_rank: 12000, average_fees: 800000, college_type: "Private", nirf_ranking: 20, placement_rate: 90 },
  { id: 103, college_name: "Amrita Institute of Medical Sciences", state: "Kerala", city: "Kochi", course: "MBBS", exam: "NEET", closing_rank: 18000, average_fees: 1000000, college_type: "Private", nirf_ranking: 22, placement_rate: 88 },
  { id: 104, college_name: "SRM Medical College", state: "Tamil Nadu", city: "Chennai", course: "MBBS", exam: "NEET", closing_rank: 30000, average_fees: 1500000, college_type: "Private", nirf_ranking: 35, placement_rate: 78 },
  { id: 105, college_name: "Saveetha Medical College", state: "Tamil Nadu", city: "Chennai", course: "MBBS", exam: "NEET", closing_rank: 35000, average_fees: 1800000, college_type: "Private", nirf_ranking: 40, placement_rate: 75 },
  { id: 106, college_name: "JSS Medical College Mysore", state: "Karnataka", city: "Mysore", course: "MBBS", exam: "NEET", closing_rank: 25000, average_fees: 1100000, college_type: "Private", nirf_ranking: 30, placement_rate: 82 },
  { id: 107, college_name: "MS Ramaiah Medical College", state: "Karnataka", city: "Bangalore", course: "MBBS", exam: "NEET", closing_rank: 20000, average_fees: 1300000, college_type: "Private", nirf_ranking: 25, placement_rate: 85 },
  { id: 108, college_name: "DY Patil Medical College Pune", state: "Maharashtra", city: "Pune", course: "MBBS", exam: "NEET", closing_rank: 40000, average_fees: 1600000, college_type: "Private", nirf_ranking: 45, placement_rate: 72 },
  { id: 109, college_name: "Bharati Vidyapeeth Medical College", state: "Maharashtra", city: "Pune", course: "MBBS", exam: "NEET", closing_rank: 45000, average_fees: 1400000, college_type: "Private", nirf_ranking: 48, placement_rate: 70 },
  { id: 110, college_name: "SDM College of Medical Sciences", state: "Karnataka", city: "Dharwad", course: "MBBS", exam: "NEET", closing_rank: 50000, average_fees: 1000000, college_type: "Private", nirf_ranking: 50, placement_rate: 68 },

  // CUET - BBA / BA
  { id: 111, college_name: "SRCC Delhi", state: "Delhi", city: "New Delhi", course: "BBA", exam: "CUET", closing_rank: 500, average_fees: 30000, college_type: "Government", nirf_ranking: 5, placement_rate: 95 },
  { id: 112, college_name: "Hindu College Delhi", state: "Delhi", city: "New Delhi", course: "BA", exam: "CUET", closing_rank: 800, average_fees: 25000, college_type: "Government", nirf_ranking: 3, placement_rate: 90 },
  { id: 113, college_name: "St. Stephen's College", state: "Delhi", city: "New Delhi", course: "BA", exam: "CUET", closing_rank: 600, average_fees: 30000, college_type: "Private", nirf_ranking: 2, placement_rate: 92 },
  { id: 114, college_name: "Lady Shri Ram College", state: "Delhi", city: "New Delhi", course: "BA", exam: "CUET", closing_rank: 700, average_fees: 28000, college_type: "Government", nirf_ranking: 4, placement_rate: 91 },
  { id: 115, college_name: "Hansraj College Delhi", state: "Delhi", city: "New Delhi", course: "BBA", exam: "CUET", closing_rank: 1200, average_fees: 22000, college_type: "Government", nirf_ranking: 8, placement_rate: 85 },
  { id: 116, college_name: "Kirori Mal College Delhi", state: "Delhi", city: "New Delhi", course: "BA", exam: "CUET", closing_rank: 1500, average_fees: 20000, college_type: "Government", nirf_ranking: 10, placement_rate: 82 },
  { id: 117, college_name: "Miranda House Delhi", state: "Delhi", city: "New Delhi", course: "BA", exam: "CUET", closing_rank: 400, average_fees: 25000, college_type: "Government", nirf_ranking: 1, placement_rate: 93 },
  { id: 118, college_name: "Loyola College Chennai", state: "Tamil Nadu", city: "Chennai", course: "BA", exam: "CUET", closing_rank: 2000, average_fees: 35000, college_type: "Private", nirf_ranking: 6, placement_rate: 88 },
  { id: 119, college_name: "Christ University Bangalore", state: "Karnataka", city: "Bangalore", course: "BBA", exam: "CUET", closing_rank: 3000, average_fees: 200000, college_type: "Private", nirf_ranking: 12, placement_rate: 85 },
  { id: 120, college_name: "Presidency College Chennai", state: "Tamil Nadu", city: "Chennai", course: "BA", exam: "CUET", closing_rank: 2500, average_fees: 15000, college_type: "Government", nirf_ranking: 7, placement_rate: 82 },
  { id: 121, college_name: "St. Xavier's College Mumbai", state: "Maharashtra", city: "Mumbai", course: "BA", exam: "CUET", closing_rank: 1800, average_fees: 40000, college_type: "Private", nirf_ranking: 9, placement_rate: 87 },
  { id: 122, college_name: "Fergusson College Pune", state: "Maharashtra", city: "Pune", course: "BA", exam: "CUET", closing_rank: 3000, average_fees: 20000, college_type: "Government", nirf_ranking: 15, placement_rate: 78 },
  { id: 123, college_name: "Symbiosis Centre for Management", state: "Maharashtra", city: "Pune", course: "BBA", exam: "CUET", closing_rank: 2500, average_fees: 350000, college_type: "Private", nirf_ranking: 11, placement_rate: 88 },
  { id: 124, college_name: "NMIMS Mumbai", state: "Maharashtra", city: "Mumbai", course: "BBA", exam: "CUET", closing_rank: 2000, average_fees: 400000, college_type: "Private", nirf_ranking: 10, placement_rate: 90 },
  { id: 125, college_name: "Narsee Monjee College Mumbai", state: "Maharashtra", city: "Mumbai", course: "BBA", exam: "CUET", closing_rank: 3500, average_fees: 60000, college_type: "Private", nirf_ranking: 14, placement_rate: 82 },
  { id: 126, college_name: "Ramjas College Delhi", state: "Delhi", city: "New Delhi", course: "BA", exam: "CUET", closing_rank: 2000, average_fees: 18000, college_type: "Government", nirf_ranking: 11, placement_rate: 80 },
  { id: 127, college_name: "Gargi College Delhi", state: "Delhi", city: "New Delhi", course: "BA", exam: "CUET", closing_rank: 2200, average_fees: 18000, college_type: "Government", nirf_ranking: 13, placement_rate: 78 },
  { id: 128, college_name: "Daulat Ram College Delhi", state: "Delhi", city: "New Delhi", course: "BA", exam: "CUET", closing_rank: 2800, average_fees: 16000, college_type: "Government", nirf_ranking: 16, placement_rate: 75 },
  { id: 129, college_name: "Indraprastha College Delhi", state: "Delhi", city: "New Delhi", course: "BA", exam: "CUET", closing_rank: 2600, average_fees: 17000, college_type: "Government", nirf_ranking: 14, placement_rate: 77 },
  { id: 130, college_name: "Atma Ram Sanatan Dharma College", state: "Delhi", city: "New Delhi", course: "BA", exam: "CUET", closing_rank: 3200, average_fees: 16000, college_type: "Government", nirf_ranking: 18, placement_rate: 74 },

  // More JEE colleges
  { id: 131, college_name: "COEP Technological University", state: "Maharashtra", city: "Pune", course: "BTech", exam: "JEE", closing_rank: 12000, average_fees: 100000, college_type: "Government", nirf_ranking: 33, placement_rate: 87 },
  { id: 132, college_name: "VJTI Mumbai", state: "Maharashtra", city: "Mumbai", course: "BTech", exam: "JEE", closing_rank: 11000, average_fees: 90000, college_type: "Government", nirf_ranking: 35, placement_rate: 86 },
  { id: 133, college_name: "ICT Mumbai", state: "Maharashtra", city: "Mumbai", course: "BTech", exam: "JEE", closing_rank: 7000, average_fees: 120000, college_type: "Government", nirf_ranking: 25, placement_rate: 92 },
  { id: 134, college_name: "IIEST Shibpur", state: "West Bengal", city: "Howrah", course: "BTech", exam: "JEE", closing_rank: 13000, average_fees: 80000, college_type: "Government", nirf_ranking: 30, placement_rate: 84 },
  { id: 135, college_name: "PSG College of Technology", state: "Tamil Nadu", city: "Coimbatore", course: "BTech", exam: "JEE", closing_rank: 20000, average_fees: 120000, college_type: "Private", nirf_ranking: 48, placement_rate: 85 },
  { id: 136, college_name: "Netaji Subhas University of Technology", state: "Delhi", city: "New Delhi", course: "BTech", exam: "JEE", closing_rank: 10000, average_fees: 150000, college_type: "Government", nirf_ranking: 38, placement_rate: 88 },
  { id: 137, college_name: "IIIT Pune", state: "Maharashtra", city: "Pune", course: "BTech", exam: "JEE", closing_rank: 14000, average_fees: 200000, college_type: "Government", nirf_ranking: 42, placement_rate: 82 },
  { id: 138, college_name: "NIT Karnataka (NITK)", state: "Karnataka", city: "Surathkal", course: "BTech", exam: "JEE", closing_rank: 9000, average_fees: 175000, college_type: "Government", nirf_ranking: 12, placement_rate: 90 },
  { id: 139, college_name: "College of Engineering Trivandrum", state: "Kerala", city: "Trivandrum", course: "BTech", exam: "JEE", closing_rank: 16000, average_fees: 45000, college_type: "Government", nirf_ranking: 40, placement_rate: 82 },
  { id: 140, college_name: "Government Engineering College Thrissur", state: "Kerala", city: "Thrissur", course: "BTech", exam: "JEE", closing_rank: 25000, average_fees: 40000, college_type: "Government", nirf_ranking: 52, placement_rate: 75 },

  // More Private BTech
  { id: 141, college_name: "Amrita Vishwa Vidyapeetham", state: "Tamil Nadu", city: "Coimbatore", course: "BTech", exam: "JEE", closing_rank: 18000, average_fees: 350000, college_type: "Private", nirf_ranking: 46, placement_rate: 85 },
  { id: 142, college_name: "JIIT Noida", state: "Uttar Pradesh", city: "Noida", course: "BTech", exam: "JEE", closing_rank: 35000, average_fees: 280000, college_type: "Private", nirf_ranking: 58, placement_rate: 74 },
  { id: 143, college_name: "Bennett University", state: "Uttar Pradesh", city: "Greater Noida", course: "BTech", exam: "JEE", closing_rank: 40000, average_fees: 380000, college_type: "Private", nirf_ranking: 60, placement_rate: 72 },
  { id: 144, college_name: "Ashoka University", state: "Haryana", city: "Sonipat", course: "BA", exam: "CUET", closing_rank: 1000, average_fees: 600000, college_type: "Private", nirf_ranking: 8, placement_rate: 90 },
  { id: 145, college_name: "FLAME University", state: "Maharashtra", city: "Pune", course: "BBA", exam: "CUET", closing_rank: 3000, average_fees: 500000, college_type: "Private", nirf_ranking: 18, placement_rate: 80 },
  { id: 146, college_name: "Woxsen University", state: "Telangana", city: "Hyderabad", course: "BBA", exam: "CUET", closing_rank: 4000, average_fees: 450000, college_type: "Private", nirf_ranking: 22, placement_rate: 78 },
  { id: 147, college_name: "IILM University", state: "Haryana", city: "Gurgaon", course: "BBA", exam: "CUET", closing_rank: 5000, average_fees: 350000, college_type: "Private", nirf_ranking: 25, placement_rate: 75 },
  { id: 148, college_name: "Jain University", state: "Karnataka", city: "Bangalore", course: "BBA", exam: "CUET", closing_rank: 4500, average_fees: 300000, college_type: "Private", nirf_ranking: 20, placement_rate: 77 },
  { id: 149, college_name: "MIT WPU Pune", state: "Maharashtra", city: "Pune", course: "BTech", exam: "JEE", closing_rank: 32000, average_fees: 350000, college_type: "Private", nirf_ranking: 56, placement_rate: 76 },
  { id: 150, college_name: "Chitkara University", state: "Punjab", city: "Rajpura", course: "BTech", exam: "JEE", closing_rank: 38000, average_fees: 320000, college_type: "Private", nirf_ranking: 62, placement_rate: 72 },

  // More NEET colleges
  { id: 151, college_name: "Armed Forces Medical College Pune", state: "Maharashtra", city: "Pune", course: "MBBS", exam: "NEET", closing_rank: 600, average_fees: 20000, college_type: "Government", nirf_ranking: 5, placement_rate: 96 },
  { id: 152, college_name: "BHU Medical College", state: "Uttar Pradesh", city: "Varanasi", course: "MBBS", exam: "NEET", closing_rank: 4000, average_fees: 25000, college_type: "Government", nirf_ranking: 14, placement_rate: 90 },
  { id: 153, college_name: "Government Medical College Chandigarh", state: "Chandigarh", city: "Chandigarh", course: "MBBS", exam: "NEET", closing_rank: 6000, average_fees: 30000, college_type: "Government", nirf_ranking: 16, placement_rate: 88 },
  { id: 154, college_name: "SMS Medical College Jaipur", state: "Rajasthan", city: "Jaipur", course: "MBBS", exam: "NEET", closing_rank: 8000, average_fees: 25000, college_type: "Government", nirf_ranking: 20, placement_rate: 85 },
  { id: 155, college_name: "Government Medical College Nagpur", state: "Maharashtra", city: "Nagpur", course: "MBBS", exam: "NEET", closing_rank: 10000, average_fees: 30000, college_type: "Government", nirf_ranking: 22, placement_rate: 83 },
  { id: 156, college_name: "Government Medical College Thiruvananthapuram", state: "Kerala", city: "Trivandrum", course: "MBBS", exam: "NEET", closing_rank: 7000, average_fees: 20000, college_type: "Government", nirf_ranking: 18, placement_rate: 87 },
  { id: 157, college_name: "Government Medical College Kozhikode", state: "Kerala", city: "Kozhikode", course: "MBBS", exam: "NEET", closing_rank: 8000, average_fees: 18000, college_type: "Government", nirf_ranking: 19, placement_rate: 86 },
  { id: 158, college_name: "Government Medical College Kottayam", state: "Kerala", city: "Kottayam", course: "MBBS", exam: "NEET", closing_rank: 9000, average_fees: 18000, college_type: "Government", nirf_ranking: 21, placement_rate: 84 },
  { id: 159, college_name: "Bangalore Medical College", state: "Karnataka", city: "Bangalore", course: "MBBS", exam: "NEET", closing_rank: 5000, average_fees: 25000, college_type: "Government", nirf_ranking: 15, placement_rate: 89 },
  { id: 160, college_name: "Mysore Medical College", state: "Karnataka", city: "Mysore", course: "MBBS", exam: "NEET", closing_rank: 9000, average_fees: 22000, college_type: "Government", nirf_ranking: 22, placement_rate: 84 },

  // More Private Medical
  { id: 161, college_name: "Mahatma Gandhi Medical College Jaipur", state: "Rajasthan", city: "Jaipur", course: "MBBS", exam: "NEET", closing_rank: 55000, average_fees: 1200000, college_type: "Private", nirf_ranking: 55, placement_rate: 65 },
  { id: 162, college_name: "KIMS Karad", state: "Maharashtra", city: "Karad", course: "MBBS", exam: "NEET", closing_rank: 60000, average_fees: 1000000, college_type: "Private", nirf_ranking: 58, placement_rate: 62 },
  { id: 163, college_name: "Manipal Academy of Higher Education", state: "Karnataka", city: "Manipal", course: "MBBS", exam: "NEET", closing_rank: 14000, average_fees: 1300000, college_type: "Private", nirf_ranking: 17, placement_rate: 93 },
  { id: 164, college_name: "Dayanand Medical College Ludhiana", state: "Punjab", city: "Ludhiana", course: "MBBS", exam: "NEET", closing_rank: 20000, average_fees: 800000, college_type: "Private", nirf_ranking: 24, placement_rate: 86 },
  { id: 165, college_name: "Sri Ramachandra Medical College", state: "Tamil Nadu", city: "Chennai", course: "MBBS", exam: "NEET", closing_rank: 28000, average_fees: 1100000, college_type: "Private", nirf_ranking: 32, placement_rate: 80 },

  // More CUET
  { id: 166, college_name: "Shri Ram College of Commerce", state: "Delhi", city: "New Delhi", course: "BBA", exam: "CUET", closing_rank: 500, average_fees: 25000, college_type: "Government", nirf_ranking: 5, placement_rate: 95 },
  { id: 167, college_name: "Jamia Millia Islamia", state: "Delhi", city: "New Delhi", course: "BA", exam: "CUET", closing_rank: 3000, average_fees: 15000, college_type: "Government", nirf_ranking: 12, placement_rate: 80 },
  { id: 168, college_name: "Banaras Hindu University", state: "Uttar Pradesh", city: "Varanasi", course: "BA", exam: "CUET", closing_rank: 4000, average_fees: 12000, college_type: "Government", nirf_ranking: 6, placement_rate: 82 },
  { id: 169, college_name: "Aligarh Muslim University", state: "Uttar Pradesh", city: "Aligarh", course: "BA", exam: "CUET", closing_rank: 5000, average_fees: 10000, college_type: "Government", nirf_ranking: 10, placement_rate: 78 },
  { id: 170, college_name: "Jawaharlal Nehru University", state: "Delhi", city: "New Delhi", course: "BA", exam: "CUET", closing_rank: 1500, average_fees: 12000, college_type: "Government", nirf_ranking: 2, placement_rate: 88 },
  { id: 171, college_name: "University of Hyderabad", state: "Telangana", city: "Hyderabad", course: "BA", exam: "CUET", closing_rank: 3500, average_fees: 15000, college_type: "Government", nirf_ranking: 8, placement_rate: 82 },
  { id: 172, college_name: "Pondicherry University", state: "Puducherry", city: "Puducherry", course: "BA", exam: "CUET", closing_rank: 6000, average_fees: 12000, college_type: "Government", nirf_ranking: 15, placement_rate: 72 },
  { id: 173, college_name: "Tezpur University", state: "Assam", city: "Tezpur", course: "BA", exam: "CUET", closing_rank: 7000, average_fees: 10000, college_type: "Government", nirf_ranking: 18, placement_rate: 70 },
  { id: 174, college_name: "Central University of Kerala", state: "Kerala", city: "Kasaragod", course: "BA", exam: "CUET", closing_rank: 6500, average_fees: 8000, college_type: "Government", nirf_ranking: 16, placement_rate: 72 },
  { id: 175, college_name: "Central University of Rajasthan", state: "Rajasthan", city: "Ajmer", course: "BA", exam: "CUET", closing_rank: 7500, average_fees: 8000, college_type: "Government", nirf_ranking: 20, placement_rate: 68 },

  // Additional JEE Engineering
  { id: 176, college_name: "Birla Institute of Technology Mesra", state: "Jharkhand", city: "Ranchi", course: "BTech", exam: "JEE", closing_rank: 25000, average_fees: 350000, college_type: "Private", nirf_ranking: 50, placement_rate: 80 },
  { id: 177, college_name: "Motilal Nehru NIT Allahabad", state: "Uttar Pradesh", city: "Allahabad", course: "BTech", exam: "JEE", closing_rank: 16000, average_fees: 155000, college_type: "Government", nirf_ranking: 21, placement_rate: 85 },
  { id: 178, college_name: "NIT Raipur", state: "Chhattisgarh", city: "Raipur", course: "BTech", exam: "JEE", closing_rank: 32000, average_fees: 130000, college_type: "Government", nirf_ranking: 48, placement_rate: 72 },
  { id: 179, college_name: "NIT Jamshedpur", state: "Jharkhand", city: "Jamshedpur", course: "BTech", exam: "JEE", closing_rank: 26000, average_fees: 140000, college_type: "Government", nirf_ranking: 40, placement_rate: 76 },
  { id: 180, college_name: "NIT Srinagar", state: "Jammu & Kashmir", city: "Srinagar", course: "BTech", exam: "JEE", closing_rank: 35000, average_fees: 120000, college_type: "Government", nirf_ranking: 55, placement_rate: 68 },
  { id: 181, college_name: "NIT Patna", state: "Bihar", city: "Patna", course: "BTech", exam: "JEE", closing_rank: 27000, average_fees: 135000, college_type: "Government", nirf_ranking: 42, placement_rate: 75 },
  { id: 182, college_name: "NIT Uttarakhand", state: "Uttarakhand", city: "Srinagar", course: "BTech", exam: "JEE", closing_rank: 40000, average_fees: 120000, college_type: "Government", nirf_ranking: 58, placement_rate: 65 },
  { id: 183, college_name: "NIT Delhi", state: "Delhi", city: "New Delhi", course: "BTech", exam: "JEE", closing_rank: 20000, average_fees: 150000, college_type: "Government", nirf_ranking: 38, placement_rate: 80 },
  { id: 184, college_name: "NIT Andhra Pradesh", state: "Andhra Pradesh", city: "Tadepalligudem", course: "BTech", exam: "JEE", closing_rank: 38000, average_fees: 125000, college_type: "Government", nirf_ranking: 55, placement_rate: 66 },
  { id: 185, college_name: "IIIT Kancheepuram", state: "Tamil Nadu", city: "Chennai", course: "BTech", exam: "JEE", closing_rank: 19000, average_fees: 180000, college_type: "Government", nirf_ranking: 45, placement_rate: 80 },

  // More private BTech
  { id: 186, college_name: "Sathyabama University", state: "Tamil Nadu", city: "Chennai", course: "BTech", exam: "JEE", closing_rank: 50000, average_fees: 250000, college_type: "Private", nirf_ranking: 65, placement_rate: 68 },
  { id: 187, college_name: "SRM AP University", state: "Andhra Pradesh", city: "Amaravati", course: "BTech", exam: "JEE", closing_rank: 42000, average_fees: 350000, college_type: "Private", nirf_ranking: 60, placement_rate: 72 },
  { id: 188, college_name: "VIT AP University", state: "Andhra Pradesh", city: "Amaravati", course: "BTech", exam: "JEE", closing_rank: 35000, average_fees: 350000, college_type: "Private", nirf_ranking: 55, placement_rate: 75 },
  { id: 189, college_name: "KL University", state: "Andhra Pradesh", city: "Vijayawada", course: "BTech", exam: "JEE", closing_rank: 45000, average_fees: 280000, college_type: "Private", nirf_ranking: 62, placement_rate: 70 },
  { id: 190, college_name: "GITAM University", state: "Andhra Pradesh", city: "Visakhapatnam", course: "BTech", exam: "JEE", closing_rank: 40000, average_fees: 300000, college_type: "Private", nirf_ranking: 58, placement_rate: 72 },

  // More private BBA/BA CUET
  { id: 191, college_name: "OP Jindal Global University", state: "Haryana", city: "Sonipat", course: "BBA", exam: "CUET", closing_rank: 2000, average_fees: 550000, college_type: "Private", nirf_ranking: 15, placement_rate: 85 },
  { id: 192, college_name: "Narsee Monjee College", state: "Maharashtra", city: "Mumbai", course: "BA", exam: "CUET", closing_rank: 3000, average_fees: 50000, college_type: "Private", nirf_ranking: 14, placement_rate: 82 },
  { id: 193, college_name: "Mount Carmel College", state: "Karnataka", city: "Bangalore", course: "BA", exam: "CUET", closing_rank: 4000, average_fees: 80000, college_type: "Private", nirf_ranking: 18, placement_rate: 78 },
  { id: 194, college_name: "Stella Maris College", state: "Tamil Nadu", city: "Chennai", course: "BA", exam: "CUET", closing_rank: 3500, average_fees: 45000, college_type: "Private", nirf_ranking: 16, placement_rate: 80 },
  { id: 195, college_name: "Madras Christian College", state: "Tamil Nadu", city: "Chennai", course: "BA", exam: "CUET", closing_rank: 4500, average_fees: 35000, college_type: "Private", nirf_ranking: 20, placement_rate: 76 },

  // Government medical additional
  { id: 196, college_name: "Government Medical College Amritsar", state: "Punjab", city: "Amritsar", course: "MBBS", exam: "NEET", closing_rank: 12000, average_fees: 30000, college_type: "Government", nirf_ranking: 25, placement_rate: 82 },
  { id: 197, college_name: "Government Medical College Patiala", state: "Punjab", city: "Patiala", course: "MBBS", exam: "NEET", closing_rank: 14000, average_fees: 28000, college_type: "Government", nirf_ranking: 28, placement_rate: 80 },
  { id: 198, college_name: "Gandhi Medical College Bhopal", state: "Madhya Pradesh", city: "Bhopal", course: "MBBS", exam: "NEET", closing_rank: 11000, average_fees: 25000, college_type: "Government", nirf_ranking: 24, placement_rate: 83 },
  { id: 199, college_name: "Indira Gandhi Medical College Shimla", state: "Himachal Pradesh", city: "Shimla", course: "MBBS", exam: "NEET", closing_rank: 15000, average_fees: 20000, college_type: "Government", nirf_ranking: 30, placement_rate: 78 },
  { id: 200, college_name: "Rajendra Institute of Medical Sciences", state: "Jharkhand", city: "Ranchi", course: "MBBS", exam: "NEET", closing_rank: 16000, average_fees: 22000, college_type: "Government", nirf_ranking: 32, placement_rate: 76 },

  // More state engineering
  { id: 201, college_name: "Government College of Engineering Aurangabad", state: "Maharashtra", city: "Aurangabad", course: "BTech", exam: "JEE", closing_rank: 35000, average_fees: 70000, college_type: "Government", nirf_ranking: 55, placement_rate: 70 },
  { id: 202, college_name: "Walchand College of Engineering", state: "Maharashtra", city: "Sangli", course: "BTech", exam: "JEE", closing_rank: 22000, average_fees: 80000, college_type: "Government", nirf_ranking: 45, placement_rate: 78 },
  { id: 203, college_name: "SGGSIE&T Nanded", state: "Maharashtra", city: "Nanded", course: "BTech", exam: "JEE", closing_rank: 30000, average_fees: 65000, college_type: "Government", nirf_ranking: 50, placement_rate: 72 },
  { id: 204, college_name: "Government Engineering College Barton Hill", state: "Kerala", city: "Trivandrum", course: "BTech", exam: "JEE", closing_rank: 28000, average_fees: 40000, college_type: "Government", nirf_ranking: 52, placement_rate: 74 },
  { id: 205, college_name: "TKM College of Engineering", state: "Kerala", city: "Kollam", course: "BTech", exam: "JEE", closing_rank: 30000, average_fees: 45000, college_type: "Government", nirf_ranking: 54, placement_rate: 72 },
  { id: 206, college_name: "University Visvesvaraya College of Engineering", state: "Karnataka", city: "Bangalore", course: "BTech", exam: "JEE", closing_rank: 18000, average_fees: 50000, college_type: "Government", nirf_ranking: 40, placement_rate: 82 },
  { id: 207, college_name: "BMS Institute of Technology", state: "Karnataka", city: "Bangalore", course: "BTech", exam: "JEE", closing_rank: 30000, average_fees: 300000, college_type: "Private", nirf_ranking: 55, placement_rate: 78 },
  { id: 208, college_name: "New Horizon College of Engineering", state: "Karnataka", city: "Bangalore", course: "BTech", exam: "JEE", closing_rank: 45000, average_fees: 280000, college_type: "Private", nirf_ranking: 65, placement_rate: 70 },
  { id: 209, college_name: "Dayananda Sagar College of Engineering", state: "Karnataka", city: "Bangalore", course: "BTech", exam: "JEE", closing_rank: 40000, average_fees: 260000, college_type: "Private", nirf_ranking: 60, placement_rate: 72 },
  { id: 210, college_name: "KLE Technological University", state: "Karnataka", city: "Hubballi", course: "BTech", exam: "JEE", closing_rank: 35000, average_fees: 220000, college_type: "Private", nirf_ranking: 52, placement_rate: 76 },

  // More North India Engineering
  { id: 211, college_name: "MAIT Delhi", state: "Delhi", city: "New Delhi", course: "BTech", exam: "JEE", closing_rank: 25000, average_fees: 150000, college_type: "Government", nirf_ranking: 48, placement_rate: 75 },
  { id: 212, college_name: "IGDTUW Delhi", state: "Delhi", city: "New Delhi", course: "BTech", exam: "JEE", closing_rank: 20000, average_fees: 140000, college_type: "Government", nirf_ranking: 42, placement_rate: 80 },
  { id: 213, college_name: "NSIT (now NSUT)", state: "Delhi", city: "New Delhi", course: "BTech", exam: "JEE", closing_rank: 10000, average_fees: 160000, college_type: "Government", nirf_ranking: 38, placement_rate: 88 },
  { id: 214, college_name: "GBU Greater Noida", state: "Uttar Pradesh", city: "Greater Noida", course: "BTech", exam: "JEE", closing_rank: 40000, average_fees: 120000, college_type: "Government", nirf_ranking: 60, placement_rate: 65 },
  { id: 215, college_name: "AKTU Lucknow", state: "Uttar Pradesh", city: "Lucknow", course: "BTech", exam: "JEE", closing_rank: 50000, average_fees: 100000, college_type: "Government", nirf_ranking: 68, placement_rate: 60 },
  { id: 216, college_name: "Kurukshetra University", state: "Haryana", city: "Kurukshetra", course: "BTech", exam: "JEE", closing_rank: 42000, average_fees: 80000, college_type: "Government", nirf_ranking: 58, placement_rate: 62 },
  { id: 217, college_name: "GJUST Hisar", state: "Haryana", city: "Hisar", course: "BTech", exam: "JEE", closing_rank: 45000, average_fees: 70000, college_type: "Government", nirf_ranking: 62, placement_rate: 60 },
  { id: 218, college_name: "J.C. Bose University of Science and Technology", state: "Haryana", city: "Faridabad", course: "BTech", exam: "JEE", closing_rank: 38000, average_fees: 90000, college_type: "Government", nirf_ranking: 55, placement_rate: 65 },

  // More East India
  { id: 219, college_name: "Bengal Engineering College", state: "West Bengal", city: "Howrah", course: "BTech", exam: "JEE", closing_rank: 20000, average_fees: 50000, college_type: "Government", nirf_ranking: 35, placement_rate: 82 },
  { id: 220, college_name: "Heritage Institute of Technology", state: "West Bengal", city: "Kolkata", course: "BTech", exam: "JEE", closing_rank: 35000, average_fees: 250000, college_type: "Private", nirf_ranking: 55, placement_rate: 72 },
  { id: 221, college_name: "Techno India University", state: "West Bengal", city: "Kolkata", course: "BTech", exam: "JEE", closing_rank: 45000, average_fees: 220000, college_type: "Private", nirf_ranking: 62, placement_rate: 65 },
  { id: 222, college_name: "NIT Meghalaya", state: "Meghalaya", city: "Shillong", course: "BTech", exam: "JEE", closing_rank: 42000, average_fees: 118000, college_type: "Government", nirf_ranking: 65, placement_rate: 62 },
  { id: 223, college_name: "Assam Engineering College", state: "Assam", city: "Guwahati", course: "BTech", exam: "JEE", closing_rank: 38000, average_fees: 50000, college_type: "Government", nirf_ranking: 58, placement_rate: 65 },

  // South India additional
  { id: 224, college_name: "SSN College of Engineering", state: "Tamil Nadu", city: "Chennai", course: "BTech", exam: "JEE", closing_rank: 15000, average_fees: 200000, college_type: "Private", nirf_ranking: 42, placement_rate: 88 },
  { id: 225, college_name: "CEG Anna University", state: "Tamil Nadu", city: "Chennai", course: "BTech", exam: "JEE", closing_rank: 18000, average_fees: 55000, college_type: "Government", nirf_ranking: 38, placement_rate: 85 },
  { id: 226, college_name: "Thiagarajar College of Engineering", state: "Tamil Nadu", city: "Madurai", course: "BTech", exam: "JEE", closing_rank: 25000, average_fees: 120000, college_type: "Private", nirf_ranking: 48, placement_rate: 78 },
  { id: 227, college_name: "Kongu Engineering College", state: "Tamil Nadu", city: "Erode", course: "BTech", exam: "JEE", closing_rank: 30000, average_fees: 100000, college_type: "Private", nirf_ranking: 52, placement_rate: 75 },
  { id: 228, college_name: "Mepco Schlenk Engineering College", state: "Tamil Nadu", city: "Sivakasi", course: "BTech", exam: "JEE", closing_rank: 35000, average_fees: 90000, college_type: "Private", nirf_ranking: 55, placement_rate: 72 },

  // Gujarat
  { id: 229, college_name: "LD College of Engineering", state: "Gujarat", city: "Ahmedabad", course: "BTech", exam: "JEE", closing_rank: 22000, average_fees: 50000, college_type: "Government", nirf_ranking: 42, placement_rate: 78 },
  { id: 230, college_name: "Sardar Vallabhbhai NIT Surat", state: "Gujarat", city: "Surat", course: "BTech", exam: "JEE", closing_rank: 17000, average_fees: 155000, college_type: "Government", nirf_ranking: 27, placement_rate: 83 },
  { id: 231, college_name: "Dharmsinh Desai University", state: "Gujarat", city: "Nadiad", course: "BTech", exam: "JEE", closing_rank: 28000, average_fees: 150000, college_type: "Private", nirf_ranking: 50, placement_rate: 76 },
  { id: 232, college_name: "Sardar Patel University", state: "Gujarat", city: "Anand", course: "BTech", exam: "JEE", closing_rank: 35000, average_fees: 60000, college_type: "Government", nirf_ranking: 55, placement_rate: 70 },

  // Rajasthan
  { id: 233, college_name: "Malaviya NIT Jaipur", state: "Rajasthan", city: "Jaipur", course: "BTech", exam: "JEE", closing_rank: 15000, average_fees: 160000, college_type: "Government", nirf_ranking: 19, placement_rate: 86 },
  { id: 234, college_name: "MBM University Jodhpur", state: "Rajasthan", city: "Jodhpur", course: "BTech", exam: "JEE", closing_rank: 30000, average_fees: 80000, college_type: "Government", nirf_ranking: 50, placement_rate: 72 },
  { id: 235, college_name: "LNMIIT Jaipur", state: "Rajasthan", city: "Jaipur", course: "BTech", exam: "JEE", closing_rank: 20000, average_fees: 300000, college_type: "Private", nirf_ranking: 45, placement_rate: 80 },
  { id: 236, college_name: "Manipal University Jaipur", state: "Rajasthan", city: "Jaipur", course: "BTech", exam: "JEE", closing_rank: 40000, average_fees: 350000, college_type: "Private", nirf_ranking: 60, placement_rate: 70 },

  // Madhya Pradesh
  { id: 237, college_name: "MANIT Bhopal", state: "Madhya Pradesh", city: "Bhopal", course: "BTech", exam: "JEE", closing_rank: 20000, average_fees: 130000, college_type: "Government", nirf_ranking: 35, placement_rate: 80 },
  { id: 238, college_name: "IIITDM Jabalpur", state: "Madhya Pradesh", city: "Jabalpur", course: "BTech", exam: "JEE", closing_rank: 16000, average_fees: 170000, college_type: "Government", nirf_ranking: 40, placement_rate: 82 },
  { id: 239, college_name: "UIT RGPV Bhopal", state: "Madhya Pradesh", city: "Bhopal", course: "BTech", exam: "JEE", closing_rank: 40000, average_fees: 80000, college_type: "Government", nirf_ranking: 58, placement_rate: 65 },
  { id: 240, college_name: "Jabalpur Engineering College", state: "Madhya Pradesh", city: "Jabalpur", course: "BTech", exam: "JEE", closing_rank: 35000, average_fees: 60000, college_type: "Government", nirf_ranking: 52, placement_rate: 68 },

  // Additional private medical
  { id: 241, college_name: "AIMS Kochi", state: "Kerala", city: "Kochi", course: "MBBS", exam: "NEET", closing_rank: 22000, average_fees: 1100000, college_type: "Private", nirf_ranking: 26, placement_rate: 85 },
  { id: 242, college_name: "Yenepoya Medical College", state: "Karnataka", city: "Mangalore", course: "MBBS", exam: "NEET", closing_rank: 35000, average_fees: 1200000, college_type: "Private", nirf_ranking: 38, placement_rate: 76 },
  { id: 243, college_name: "KMC Mangalore", state: "Karnataka", city: "Mangalore", course: "MBBS", exam: "NEET", closing_rank: 18000, average_fees: 1150000, college_type: "Private", nirf_ranking: 22, placement_rate: 88 },
  { id: 244, college_name: "MGIMS Wardha", state: "Maharashtra", city: "Wardha", course: "MBBS", exam: "NEET", closing_rank: 25000, average_fees: 600000, college_type: "Private", nirf_ranking: 28, placement_rate: 82 },
  { id: 245, college_name: "Sree Chitra Tirunal Institute", state: "Kerala", city: "Trivandrum", course: "MBBS", exam: "NEET", closing_rank: 10000, average_fees: 500000, college_type: "Government", nirf_ranking: 15, placement_rate: 92 },

  // Additional CUET
  { id: 246, college_name: "Visva-Bharati University", state: "West Bengal", city: "Santiniketan", course: "BA", exam: "CUET", closing_rank: 5000, average_fees: 8000, college_type: "Government", nirf_ranking: 12, placement_rate: 72 },
  { id: 247, college_name: "University of Calcutta", state: "West Bengal", city: "Kolkata", course: "BA", exam: "CUET", closing_rank: 4000, average_fees: 5000, college_type: "Government", nirf_ranking: 10, placement_rate: 75 },
  { id: 248, college_name: "University of Mumbai", state: "Maharashtra", city: "Mumbai", course: "BA", exam: "CUET", closing_rank: 3500, average_fees: 8000, college_type: "Government", nirf_ranking: 8, placement_rate: 78 },
  { id: 249, college_name: "Savitribai Phule Pune University", state: "Maharashtra", city: "Pune", course: "BA", exam: "CUET", closing_rank: 4500, average_fees: 7000, college_type: "Government", nirf_ranking: 11, placement_rate: 74 },
  { id: 250, college_name: "University of Madras", state: "Tamil Nadu", city: "Chennai", course: "BA", exam: "CUET", closing_rank: 5000, average_fees: 6000, college_type: "Government", nirf_ranking: 13, placement_rate: 72 },

  // Additional colleges to reach 300+
  { id: 251, college_name: "IIT Goa", state: "Goa", city: "Goa", course: "BTech", exam: "JEE", closing_rank: 11500, average_fees: 200000, college_type: "Government", nirf_ranking: 35, placement_rate: 80 },
  { id: 252, college_name: "IIT Palakkad", state: "Kerala", city: "Palakkad", course: "BTech", exam: "JEE", closing_rank: 12000, average_fees: 200000, college_type: "Government", nirf_ranking: 38, placement_rate: 78 },
  { id: 253, college_name: "IIT Bhilai", state: "Chhattisgarh", city: "Bhilai", course: "BTech", exam: "JEE", closing_rank: 12500, average_fees: 200000, college_type: "Government", nirf_ranking: 42, placement_rate: 76 },
  { id: 254, college_name: "Presidency University Bangalore", state: "Karnataka", city: "Bangalore", course: "BTech", exam: "JEE", closing_rank: 40000, average_fees: 280000, college_type: "Private", nirf_ranking: 58, placement_rate: 70 },
  { id: 255, college_name: "CMR Institute of Technology", state: "Karnataka", city: "Bangalore", course: "BTech", exam: "JEE", closing_rank: 48000, average_fees: 250000, college_type: "Private", nirf_ranking: 65, placement_rate: 65 },
  { id: 256, college_name: "Dayananda Sagar University", state: "Karnataka", city: "Bangalore", course: "BTech", exam: "JEE", closing_rank: 42000, average_fees: 300000, college_type: "Private", nirf_ranking: 60, placement_rate: 68 },
  { id: 257, college_name: "Alliance University", state: "Karnataka", city: "Bangalore", course: "BBA", exam: "CUET", closing_rank: 5000, average_fees: 400000, college_type: "Private", nirf_ranking: 25, placement_rate: 75 },
  { id: 258, college_name: "IFHE Hyderabad (ICFAI)", state: "Telangana", city: "Hyderabad", course: "BBA", exam: "CUET", closing_rank: 4500, average_fees: 350000, college_type: "Private", nirf_ranking: 22, placement_rate: 78 },
  { id: 259, college_name: "Kalinga Institute of Industrial Technology", state: "Odisha", city: "Bhubaneswar", course: "BTech", exam: "JEE", closing_rank: 35000, average_fees: 320000, college_type: "Private", nirf_ranking: 57, placement_rate: 75 },
  { id: 260, college_name: "Siksha O Anusandhan University", state: "Odisha", city: "Bhubaneswar", course: "BTech", exam: "JEE", closing_rank: 40000, average_fees: 280000, college_type: "Private", nirf_ranking: 60, placement_rate: 70 },

  { id: 261, college_name: "SRI Medical College Chennai", state: "Tamil Nadu", city: "Chennai", course: "MBBS", exam: "NEET", closing_rank: 42000, average_fees: 1400000, college_type: "Private", nirf_ranking: 42, placement_rate: 72 },
  { id: 262, college_name: "Meenakshi Medical College", state: "Tamil Nadu", city: "Kanchipuram", course: "MBBS", exam: "NEET", closing_rank: 50000, average_fees: 1300000, college_type: "Private", nirf_ranking: 50, placement_rate: 66 },
  { id: 263, college_name: "Chettinad Medical College", state: "Tamil Nadu", city: "Kelambakkam", course: "MBBS", exam: "NEET", closing_rank: 45000, average_fees: 1500000, college_type: "Private", nirf_ranking: 45, placement_rate: 70 },
  { id: 264, college_name: "Father Muller Medical College", state: "Karnataka", city: "Mangalore", course: "MBBS", exam: "NEET", closing_rank: 30000, average_fees: 900000, college_type: "Private", nirf_ranking: 35, placement_rate: 78 },
  { id: 265, college_name: "KS Hegde Medical Academy", state: "Karnataka", city: "Mangalore", course: "MBBS", exam: "NEET", closing_rank: 32000, average_fees: 1000000, college_type: "Private", nirf_ranking: 36, placement_rate: 76 },

  { id: 266, college_name: "Christ University", state: "Karnataka", city: "Bangalore", course: "BA", exam: "CUET", closing_rank: 3000, average_fees: 150000, college_type: "Private", nirf_ranking: 12, placement_rate: 85 },
  { id: 267, college_name: "St. Joseph's College Bangalore", state: "Karnataka", city: "Bangalore", course: "BA", exam: "CUET", closing_rank: 3500, average_fees: 60000, college_type: "Private", nirf_ranking: 15, placement_rate: 80 },
  { id: 268, college_name: "Symbiosis College of Arts and Commerce", state: "Maharashtra", city: "Pune", course: "BA", exam: "CUET", closing_rank: 4000, average_fees: 80000, college_type: "Private", nirf_ranking: 18, placement_rate: 78 },
  { id: 269, college_name: "Mithibai College Mumbai", state: "Maharashtra", city: "Mumbai", course: "BA", exam: "CUET", closing_rank: 4500, average_fees: 40000, college_type: "Private", nirf_ranking: 20, placement_rate: 75 },
  { id: 270, college_name: "Wilson College Mumbai", state: "Maharashtra", city: "Mumbai", course: "BA", exam: "CUET", closing_rank: 5000, average_fees: 35000, college_type: "Private", nirf_ranking: 22, placement_rate: 72 },

  // Additional round
  { id: 271, college_name: "IIIT Ranchi", state: "Jharkhand", city: "Ranchi", course: "BTech", exam: "JEE", closing_rank: 22000, average_fees: 180000, college_type: "Government", nirf_ranking: 55, placement_rate: 74 },
  { id: 272, college_name: "IIIT Nagpur", state: "Maharashtra", city: "Nagpur", course: "BTech", exam: "JEE", closing_rank: 18000, average_fees: 190000, college_type: "Government", nirf_ranking: 48, placement_rate: 78 },
  { id: 273, college_name: "IIIT Dharwad", state: "Karnataka", city: "Dharwad", course: "BTech", exam: "JEE", closing_rank: 20000, average_fees: 170000, college_type: "Government", nirf_ranking: 50, placement_rate: 76 },
  { id: 274, college_name: "IIIT Sonepat", state: "Haryana", city: "Sonepat", course: "BTech", exam: "JEE", closing_rank: 25000, average_fees: 180000, college_type: "Government", nirf_ranking: 55, placement_rate: 72 },
  { id: 275, college_name: "IIIT Kalyani", state: "West Bengal", city: "Kalyani", course: "BTech", exam: "JEE", closing_rank: 28000, average_fees: 160000, college_type: "Government", nirf_ranking: 58, placement_rate: 70 },
  { id: 276, college_name: "IIIT Bhagalpur", state: "Bihar", city: "Bhagalpur", course: "BTech", exam: "JEE", closing_rank: 30000, average_fees: 150000, college_type: "Government", nirf_ranking: 60, placement_rate: 68 },
  { id: 277, college_name: "IIIT Agartala", state: "Tripura", city: "Agartala", course: "BTech", exam: "JEE", closing_rank: 35000, average_fees: 140000, college_type: "Government", nirf_ranking: 65, placement_rate: 64 },
  { id: 278, college_name: "IIIT Manipur", state: "Manipur", city: "Imphal", course: "BTech", exam: "JEE", closing_rank: 38000, average_fees: 130000, college_type: "Government", nirf_ranking: 68, placement_rate: 60 },

  { id: 279, college_name: "AIIMS Kalyani", state: "West Bengal", city: "Kalyani", course: "MBBS", exam: "NEET", closing_rank: 5500, average_fees: 8000, college_type: "Government", nirf_ranking: 22, placement_rate: 84 },
  { id: 280, college_name: "AIIMS Rajkot", state: "Gujarat", city: "Rajkot", course: "MBBS", exam: "NEET", closing_rank: 6000, average_fees: 8000, college_type: "Government", nirf_ranking: 24, placement_rate: 82 },
  { id: 281, college_name: "AIIMS Bathinda", state: "Punjab", city: "Bathinda", course: "MBBS", exam: "NEET", closing_rank: 5500, average_fees: 8000, college_type: "Government", nirf_ranking: 23, placement_rate: 83 },
  { id: 282, college_name: "AIIMS Gorakhpur", state: "Uttar Pradesh", city: "Gorakhpur", course: "MBBS", exam: "NEET", closing_rank: 6500, average_fees: 8000, college_type: "Government", nirf_ranking: 26, placement_rate: 80 },
  { id: 283, college_name: "AIIMS Deoghar", state: "Jharkhand", city: "Deoghar", course: "MBBS", exam: "NEET", closing_rank: 7000, average_fees: 8000, college_type: "Government", nirf_ranking: 28, placement_rate: 78 },

  { id: 284, college_name: "Central University of Tamil Nadu", state: "Tamil Nadu", city: "Thiruvarur", course: "BA", exam: "CUET", closing_rank: 8000, average_fees: 6000, college_type: "Government", nirf_ranking: 22, placement_rate: 65 },
  { id: 285, college_name: "Central University of Karnataka", state: "Karnataka", city: "Kalaburagi", course: "BA", exam: "CUET", closing_rank: 7500, average_fees: 7000, college_type: "Government", nirf_ranking: 20, placement_rate: 68 },
  { id: 286, college_name: "Central University of Punjab", state: "Punjab", city: "Bathinda", course: "BA", exam: "CUET", closing_rank: 7000, average_fees: 8000, college_type: "Government", nirf_ranking: 18, placement_rate: 70 },
  { id: 287, college_name: "Central University of Haryana", state: "Haryana", city: "Mahendragarh", course: "BA", exam: "CUET", closing_rank: 8000, average_fees: 7000, college_type: "Government", nirf_ranking: 22, placement_rate: 65 },
  { id: 288, college_name: "Central University of Jharkhand", state: "Jharkhand", city: "Ranchi", course: "BA", exam: "CUET", closing_rank: 8500, average_fees: 6000, college_type: "Government", nirf_ranking: 24, placement_rate: 62 },

  { id: 289, college_name: "Sikkim Manipal Institute of Technology", state: "Sikkim", city: "Majitar", course: "BTech", exam: "JEE", closing_rank: 40000, average_fees: 280000, college_type: "Private", nirf_ranking: 58, placement_rate: 68 },
  { id: 290, college_name: "Assam Don Bosco University", state: "Assam", city: "Guwahati", course: "BTech", exam: "JEE", closing_rank: 45000, average_fees: 220000, college_type: "Private", nirf_ranking: 62, placement_rate: 65 },
  { id: 291, college_name: "Centurion University", state: "Odisha", city: "Bhubaneswar", course: "BTech", exam: "JEE", closing_rank: 50000, average_fees: 200000, college_type: "Private", nirf_ranking: 68, placement_rate: 60 },
  { id: 292, college_name: "SRM University AP", state: "Andhra Pradesh", city: "Amaravati", course: "BTech", exam: "JEE", closing_rank: 42000, average_fees: 350000, college_type: "Private", nirf_ranking: 60, placement_rate: 72 },
  { id: 293, college_name: "Mahindra University", state: "Telangana", city: "Hyderabad", course: "BTech", exam: "JEE", closing_rank: 25000, average_fees: 450000, college_type: "Private", nirf_ranking: 48, placement_rate: 80 },
  { id: 294, college_name: "Plaksha University", state: "Punjab", city: "Mohali", course: "BTech", exam: "JEE", closing_rank: 15000, average_fees: 600000, college_type: "Private", nirf_ranking: 40, placement_rate: 88 },
  { id: 295, college_name: "Indian Statistical Institute", state: "West Bengal", city: "Kolkata", course: "BTech", exam: "JEE", closing_rank: 2000, average_fees: 30000, college_type: "Government", nirf_ranking: 10, placement_rate: 95 },
  { id: 296, college_name: "IISC Bangalore", state: "Karnataka", city: "Bangalore", course: "BTech", exam: "JEE", closing_rank: 500, average_fees: 35000, college_type: "Government", nirf_ranking: 1, placement_rate: 98 },
  { id: 297, college_name: "Government Medical College Thrissur", state: "Kerala", city: "Thrissur", course: "MBBS", exam: "NEET", closing_rank: 10000, average_fees: 18000, college_type: "Government", nirf_ranking: 24, placement_rate: 82 },
  { id: 298, college_name: "Government Medical College Calicut", state: "Kerala", city: "Calicut", course: "MBBS", exam: "NEET", closing_rank: 8500, average_fees: 18000, college_type: "Government", nirf_ranking: 20, placement_rate: 85 },
  { id: 299, college_name: "RGUHS Karnataka", state: "Karnataka", city: "Bangalore", course: "MBBS", exam: "NEET", closing_rank: 20000, average_fees: 40000, college_type: "Government", nirf_ranking: 25, placement_rate: 82 },
  { id: 300, college_name: "Madurai Kamaraj University", state: "Tamil Nadu", city: "Madurai", course: "BA", exam: "CUET", closing_rank: 6000, average_fees: 5000, college_type: "Government", nirf_ranking: 15, placement_rate: 70 },
  { id: 301, college_name: "Bharathiar University", state: "Tamil Nadu", city: "Coimbatore", course: "BA", exam: "CUET", closing_rank: 6500, average_fees: 5000, college_type: "Government", nirf_ranking: 16, placement_rate: 68 },
  { id: 302, college_name: "Alagappa University", state: "Tamil Nadu", city: "Karaikudi", course: "BA", exam: "CUET", closing_rank: 7500, average_fees: 4000, college_type: "Government", nirf_ranking: 20, placement_rate: 64 },
  { id: 303, college_name: "Cochin University", state: "Kerala", city: "Kochi", course: "BTech", exam: "JEE", closing_rank: 20000, average_fees: 55000, college_type: "Government", nirf_ranking: 42, placement_rate: 80 },
  { id: 304, college_name: "NIT Puducherry", state: "Puducherry", city: "Karaikal", course: "BTech", exam: "JEE", closing_rank: 38000, average_fees: 125000, college_type: "Government", nirf_ranking: 55, placement_rate: 68 },
  { id: 305, college_name: "NIT Nagaland", state: "Nagaland", city: "Dimapur", course: "BTech", exam: "JEE", closing_rank: 50000, average_fees: 110000, college_type: "Government", nirf_ranking: 78, placement_rate: 55 },
];

export const EXAMS = ["JEE", "NEET", "CUET"] as const;
export type ExamType = typeof EXAMS[number];

export const COURSES: Record<ExamType, string[]> = {
  JEE: ["BTech"],
  NEET: ["MBBS"],
  CUET: ["BA", "BBA"],
};

export const STATES = [...new Set(colleges.map(c => c.state))].sort();
export const COLLEGE_TYPES = ["Government", "Private", "Any"] as const;
