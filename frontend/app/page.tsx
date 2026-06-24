"use client";

import { useState } from "react";
import axios from "axios";

export default function Home() {

  const [file, setFile] = useState<File | null>(null);

  const [result, setResult] = useState<any>(null);

  const [loading, setLoading] = useState(false);

  async function uploadFile() {

    if (!file) return;

    const formData = new FormData();

    formData.append(
      "file",
      file
    );

    setLoading(true);

    try {

      const response =
        await axios.post(
          "http://localhost:8000/reports/upload",
          formData,
          {
            headers: {
              "Content-Type":
                "multipart/form-data",
            },
          }
        );

      setResult(
        response.data
      );

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);
    }
  }

  return (
    <main className="p-8">

      <h1 className="text-3xl font-bold mb-6">
        ClarityLab
      </h1>

      <input
        type="file"
        onChange={(e) =>
          setFile(
            e.target.files?.[0] || null
          )
        }
      />

      <button
        onClick={uploadFile}
        className="bg-black text-white px-4 py-2 ml-4"
      >
        Upload
      </button>

      {loading && (
        <p className="mt-4">
          Processing...
        </p>
      )}

      {result && (
        <pre className="mt-8 whitespace-pre-wrap">
          {JSON.stringify(
            result,
            null,
            2
          )}
        </pre>
      )}

    </main>
  );
}