import { GoogleGenAI } from "@google/genai";
import { Movie } from "@/types/movie";

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  throw new Error("GEMINI_API_KEY is not set");
}

const ai = new GoogleGenAI({
  apiKey: apiKey,
});

export async function generateContent(movie: Movie) {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: `Suggest 5 unique snack ideas that would pair well with the following movie. 
Consider the genre and the overall mood of the film to make your suggestions creative, relevant, and thematic. 
Make them easy to prepare in under 30 minutes, give each snack a fun and catchy name, include:
- a short description
- a list of ingredients
- step-by-step instructions
- estimated preparation time in minutes

Return the result as a JSON array of 5 objects, each object having the following fields:
- name (string)
- description (string)
- ingredients (array of strings)
- instructions (array of strings)
- prepTimeMinutes (number)

Title: ${movie.title}
Genres: ${movie.genres.join(", ")}
Overview: ${movie.overview}
Release Date: ${movie.release_date}
`,
  });
  console.log(response.text);
}
