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
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Suggest 3 unique snack ideas that would pair well with the following movie. 
Consider the genre and the overall mood of the film to make your suggestions creative, relevant, and thematic. 
Make them easy to prepare in under 30 minutes, give each snack a fun and catchy name, include:
- a short description
- a list of ingredients
- step-by-step instructions
- estimated preparation time in minutes

Return the result as a JSON array of 3 objects, each object having the following fields:
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

    const responseText = response.text || "";
    console.log("Gemini response:", responseText);

    // Try to parse the JSON response
    try {
      // Extract JSON from markdown code blocks if present
      let jsonText = responseText;
      if (jsonText.includes('```json')) {
        const jsonMatch = jsonText.match(/```json\s*([\s\S]*?)\s*```/);
        if (jsonMatch) {
          jsonText = jsonMatch[1];
        }
      }
      
      const parsedResponse = JSON.parse(jsonText);
      return parsedResponse;
    } catch (parseError) {
      console.error("Failed to parse JSON response:", parseError);
      // Return a fallback response if JSON parsing fails
      return {
        error: "Failed to parse AI response",
        rawResponse: responseText
      };
    }
  } catch (error) {
    console.error("Error generating content:", error);
    throw error;
  }
}
