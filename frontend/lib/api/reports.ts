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

  disclaimer?: string;
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

/*
Report history item
*/
export interface ReportHistoryItem {
  id: string;
  file_name: string;
  summary: string;
  uploaded_at: string;
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

/*
Fetch report history
*/
export async function getReports(): Promise<ReportHistoryItem[]> {

  const response = await api.get(
    "/reports/history"
  );

  return response.data;
}

/*
Fetch one report
*/
export async function getReport(
  reportId: string
): Promise<ClarityReport> {

  const response = await api.get(
    `/reports/${reportId}`
  );

  return response.data;
}
