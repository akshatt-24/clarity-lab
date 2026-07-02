import api from "./client";

export interface Biomarker {
  test_name: string;
  value: string;
  unit?: string;
  reference_range?: string;
  status: string;

  explanation?: string;
  possible_causes?: string[];
  questions_to_ask?: string[];
}

export interface ClarityReport {
  report_id: string;

  summary: string;

  normal_count: number;
  low_count: number;
  high_count: number;

  biomarkers: Biomarker[];

  attention_required: Biomarker[];

  normal_biomarkers: Biomarker[];
}

export async function uploadReport(
  file: File
): Promise<ClarityReport> {

  const formData = new FormData();

  formData.append("file", file);

  const response = await api.post(
    "/reports/upload",
    formData
  );

  return response.data;
}