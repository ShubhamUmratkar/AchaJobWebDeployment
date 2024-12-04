export interface Job {
  id?: number;
  title: string;
  category: string;
  location: string;
  employmentType: string;
  workModel: string;
  experience: string;
  salary: number;
  status: string;
  adminId?: number;
  created_at?: string;
  updated_at?: string;
  jobDescription: string;
  skills: string;
  company: string;
  openingStartDate?: string; // LocalDate as string
  lastApplyDate?: string; // LocalDate as string
  numberOfOpenings?: number;
  perks?: string;
  companyDescription?: string;
}
