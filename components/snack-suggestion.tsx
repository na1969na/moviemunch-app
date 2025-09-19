"use client";

import { useState } from "react";
import { Movie } from "@/types/movie";
import { ArrowRightIcon } from "lucide-react";

export function SnackSuggestion({ movie }: { movie: Movie }) {
  const [loading, setLoading] = useState(false);
  const [snacks, setSnacks] = useState<any[]>([]);
  const [expandedSnacks, setExpandedSnacks] = useState<Set<number>>(new Set());

  // ダミーデータ
  const dummySnacks = [
    {
      name: "Cinema Popcorn Deluxe",
      description:
        "A gourmet twist on classic movie theater popcorn with a perfect blend of sweet and savory flavors.",
      ingredients: [
        "1/2 cup popcorn kernels",
        "3 tbsp butter",
        "2 tbsp brown sugar",
        "1 tsp cinnamon",
        "1/2 tsp salt",
        "1/4 cup chocolate chips",
      ],
      instructions: [
        "Heat butter in a large pot over medium heat",
        "Add popcorn kernels and cover with lid",
        "Shake pot occasionally until popping stops",
        "Melt chocolate chips in microwave for 30 seconds",
        "Drizzle chocolate over popcorn and sprinkle with cinnamon sugar",
      ],
      prepTimeMinutes: 15,
    },
    {
      name: "Action Hero Nachos",
      description:
        "Loaded nachos with a spicy kick that will keep you energized through the most intense action sequences.",
      ingredients: [
        "1 bag tortilla chips",
        "1 cup shredded cheese",
        "1/2 cup black beans",
        "1/4 cup jalapeños",
        "2 tbsp sour cream",
        "1 avocado, diced",
        "1/4 cup salsa",
      ],
      instructions: [
        "Preheat oven to 350°F",
        "Spread tortilla chips on baking sheet",
        "Top with cheese, beans, and jalapeños",
        "Bake for 8-10 minutes until cheese melts",
        "Add sour cream, avocado, and salsa on top",
      ],
      prepTimeMinutes: 20,
    },
    {
      name: "Romantic Chocolate Dipped Strawberries",
      description:
        "Elegant and sweet treats perfect for romantic movie nights with your special someone.",
      ingredients: [
        "12 fresh strawberries",
        "1 cup dark chocolate chips",
        "1 tbsp coconut oil",
        "1/4 cup white chocolate chips",
        "Sprinkles or chopped nuts (optional)",
      ],
      instructions: [
        "Wash and dry strawberries completely",
        "Melt dark chocolate with coconut oil in microwave",
        "Dip strawberries 3/4 of the way into chocolate",
        "Place on parchment paper to set",
        "Melt white chocolate and drizzle over strawberries",
        "Add sprinkles or nuts if desired",
      ],
      prepTimeMinutes: 25,
    },
  ];

  const getSnacks = async () => {
    setLoading(true);
    setSnacks(dummySnacks);
    setLoading(false);
  };

  return (
    <div className="min-h-[500px] w-full p-10 bg-gray-100">
      {snacks.length === 0 ? (
        <div className="flex flex-col items-center text-[#11318f] text-2xl font-bold">
          {loading ? (
            <div className="flex items-center gap-3">
              <p className="animate-pulse">Creating Your Snacks...</p>
            </div>
          ) : (
            <button
              onClick={getSnacks}
              disabled={loading}
              className="transform hover:scale-105 transition-all duration-300 cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <p>Get Snack Suggestions</p>
                <ArrowRightIcon className="w-6 h-6 transition-transform duration-300" />
              </div>
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Your Perfect Movie Snacks
            </h2>
            <p className="text-gray-600">
              Click on any snack to see the full recipe
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-1 max-w-4xl mx-auto">
            {snacks.map((snack, index) => (
              <div
                key={index}
                className="transition-all duration-500 overflow-hidden border-b border-gray-300 cursor-pointer group"
              >
                <div
                  className="p-8"
                  onClick={() => {
                    const newExpanded = new Set(expandedSnacks);
                    if (newExpanded.has(index)) {
                      newExpanded.delete(index);
                    } else {
                      newExpanded.add(index);
                    }
                    setExpandedSnacks(newExpanded);
                  }}
                >
                  <div className="flex items-start gap-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-3">
                        <h3 className="text-2xl font-bold text-gray-900">
                          {snack.name}
                        </h3>
                        <span className="px-3 py-1 bg-[#11318f] text-white text-sm font-semibold rounded-full">
                          {snack.prepTimeMinutes} min
                        </span>
                      </div>
                      <p className="text-gray-700 text-lg leading-relaxed mb-4">
                        {snack.description}
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 font-semibold">
                          <span>
                            {expandedSnacks.has(index)
                              ? "Hide Recipe"
                              : "View Recipe"}
                          </span>
                          <div
                            className={`transform transition-transform duration-300 ${
                              expandedSnacks.has(index) ? "rotate-180" : ""
                            }`}
                          >
                            <svg
                              className="w-5 h-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 9l-7 7-7-7"
                              />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {expandedSnacks.has(index) && (
                  <div className="px-8 pb-8 border-t border-gray-100">
                    <div className="pt-6 grid md:grid-cols-2 gap-8">
                      <div>
                        <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-3 text-lg">
                          Ingredients
                        </h4>
                        <ul className="space-y-3">
                          {snack.ingredients.map(
                            (ingredient: string, idx: number) => (
                              <li
                                key={idx}
                                className="text-gray-700 flex items-center gap-3"
                              >
                                <span className="w-2 h-2 bg-gray-400 rounded-full flex-shrink-0"></span>
                                <span>{ingredient}</span>
                              </li>
                            )
                          )}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-3 text-lg">
                          Instructions
                        </h4>
                        <ol className="space-y-3">
                          {snack.instructions.map(
                            (step: string, idx: number) => (
                              <li
                                key={idx}
                                className="text-gray-700 flex gap-4"
                              >
                                <span className="flex-shrink-0 w-8 h-8 text-sm flex items-center justify-center font-bold">
                                  {idx + 1}
                                </span>
                                <span className="pt-1">{step}</span>
                              </li>
                            )
                          )}
                        </ol>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
