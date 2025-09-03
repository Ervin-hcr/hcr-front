"use client";

import { useEffect, useState } from "react";

export default function Gallery() {
  const [photos, setPhotos] = useState([]);
  const [visibleCount, setVisibleCount] = useState(6);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/photos-travauxes?populate=image`
        );
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();

        if (data.data && data.data.length > 0) {
          setPhotos(data.data);
        }
      } catch (error) {
        console.error("Erreur lors du fetch des photosTravaux :", error);
      }
    };

    fetchPhotos();
  }, []);

  if (!photos || photos.length === 0)
    return <p className="p-6 text-center">Chargement des photos...</p>;

  const allVisible = visibleCount >= photos.length;

  return (
    <section className="p-6 background-clair">
      <h2 className="text-3xl color-text font-bold mb-6 text-center">
        De nombreux autres travaux à découvrir
      </h2>

  <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
  {photos.slice(0, visibleCount).map((photoItem) => {
    const imageUrl =
      photoItem.image?.[0]?.formats?.medium?.url ||
      photoItem.image?.[0]?.url ||
      null;

    return (
      <div
        key={photoItem.id}
        className="rounded-lg overflow-hidden w-full flex items-center justify-center sm:h-40 md:h-60 lg:h-48"
      >
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={`Photo ${photoItem.id}`}
            className="w-full h-full object-contain"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-gray-500">Pas d'image</span>
          </div>
        )}
      </div>
    );
  })}
</div>



      {photos.length > 6 && (
        <div className="flex justify-center mt-6">
          <button
            onClick={() =>
              allVisible
                ? setVisibleCount(6)
                : setVisibleCount((prev) => prev + 3)
            }
            className="mt-4 px-6 py-3 bg-button text-white rounded-lg shadow-md hover:shadow-lg cursor-pointer transition"
          >
            {allVisible ? "Voir moins" : "Voir plus"}
          </button>
        </div>
      )}
    </section>
  );
}
