import api from "./client";

export async function uploadReport(file: File) {

  const formData = new FormData();

  formData.append(
    "file",
    file
  );

  const response = await api.post(
    "/reports/upload",
    formData
  );

  return response.data;
}