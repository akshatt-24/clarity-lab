import axios from "axios";

export type ClarityReport = {
  summary?: string;
  normal_count?: number;
  low_count?: number;
  high_count?: number;
  attention_required?: Array<Record<string, unknown>>;
  normal_biomarkers?: Array<Record<string, unknown>>;
};

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8000";

export async function uploadReport(file: File): Promise<ClarityReport> {
  const formData = new FormData();
  formData.append("file", file);

  const response = await axios.post<ClarityReport>(
    `${API_BASE_URL}/reports/upload`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
}
