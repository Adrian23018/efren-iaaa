export interface Companies {
  id: number;
  name: string;
  description?: string | null;
  contact_email?: string | null;
  active: boolean;
  created_at?: string | null;
  updated_at?: string | null;
  nit: string;
  profile_pic?: string | null;
  plan_id?: number | null;
  plan?: any | null;
  start_date?: string | null;
  end_date?: string | null;
  num_users?: number | null;
  company_values?: string | null;
  total_users?: number; // Campo calculado por SQL
}

