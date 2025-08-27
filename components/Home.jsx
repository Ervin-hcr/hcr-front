"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/articles?populate=cover`
        );
        const data = await res.json();
        setArticles(data.data || []);
      } catch (error) {
        console.error("Erreur lors du fetch :", error);
      }
    };

    fetchArticles();
  }, []);

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-6">Articles</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {articles.map((article) => {
          const { id, title, description, cover } = article;

          // Construction de l’URL de l’image
        // Construction de l’URL de l’image
const coverUrl = cover?.url
  ? cover.url // Déjà complet grâce à Cloudinary
  : cover?.formats?.thumbnail?.url
  ? cover.formats.thumbnail.url
  : null;


          return (
            <div
              key={id}
              className="border rounded-lg shadow-md p-4 bg-white hover:shadow-lg transition"
            >
              {coverUrl ? (
                <img
                  src={coverUrl}
                  alt={title}
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
              ) : (
                <p className="text-gray-400">Pas d’image</p>
              )}
              <h2 className="text-xl font-semibold">{title || "Titre indisponible"}</h2>
              <p className="text-gray-600 mt-2">
                {description || "Pas de description"}
              </p>
            </div>
          );
        })}
      </div>
    </main>
  );
}
