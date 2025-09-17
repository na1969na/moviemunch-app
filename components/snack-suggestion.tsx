"use client";
import { useState } from "react";
import { Movie } from "@/types/movie";

export function SnackSuggestion({ movie }: { movie: Movie }) {
  const [loading, setLoading] = useState(false);
  const [snack, setSnack] = useState<any>(null);

  const getSnack = async () => {
    setLoading(true);
    const res = await fetch("/api/snack", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ movie }),
    });
    const data = await res.json();
    setSnack(data);
    setLoading(false);
  };

  return (
    <div className="mt-6">
      <button
        onClick={getSnack}
        disabled={loading}
        className="px-4 py-2 bg-pink-600 text-white rounded-lg"
      >
        {loading ? "Thinking..." : "Suggest a Snack"}
      </button>

      {snack && (
        <div className="mt-4 p-4 border rounded-lg bg-pink-50">
          <h3 className="text-lg font-bold">{snack.name}</h3>
          <ul className="list-disc pl-4">
            {snack.ingredients.map((i: string, idx: number) => (
              <li key={idx}>{i}</li>
            ))}
          </ul>
          <ol className="list-decimal pl-4 mt-2">
            {snack.instructions.map((step: string, idx: number) => (
              <li key={idx}>{step}</li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}
