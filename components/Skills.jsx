"use client";
import { useEffect, useState } from "react";

export default function Services() {
  const [services, setServices] = useState([]);
  const [visibleCount, setVisibleCount] = useState(6); // nombre de services visibles

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/services?populate=image`);
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();
        console.log("Données services :", data);

        if (data.data && data.data.length > 0) {
          setServices(data.data);
        }
      } catch (error) {
        console.error("Erreur lors du fetch des services :", error);
      }
    };

    fetchServices();
  }, []);

  if (!services || services.length === 0)
    return <p className="p-6">Chargement des services...</p>;

  const allVisible = visibleCount >= services.length;

  return (
    <section className="p-6 background-beige">
      <h2 className="text-3xl color-text font-bold mb-6 text-center">
        Nos savoir-faire à votre service
      </h2>
      <p className="text-xl mb-6 text-center">
        Chez H.C.R, nous mettons notre expertise au service de tous vos projets
        de rénovation. Chaque métier est pris en charge par des professionnels
        qualifiés pour garantir un résultat soigné, durable et à votre image.
      </p>

      {/* Cards */}
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {services.slice(0, visibleCount).map((serviceItem) => {
          const { id, service, description, image } = serviceItem;
          const imageUrl =
            image?.[0]?.formats?.medium?.url || image?.[0]?.url || null;

          return (
            <div
              key={id}
              className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col"
            >
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt={service}
                  className="w-full h-48 object-cover"
                />
              ) : (
                <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-500">Pas d'image</span>
                </div>
              )}

              <div className="p-4 flex flex-col flex-grow">
                <h3 className="text-xl font-semibold mb-2 text-center">
                  {service}
                </h3>
                <p className="text-gray-700 whitespace-pre-line text-center">
                  {description}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bouton Voir plus / Voir moins */}
      {services.length > 6 && (
        <div className="flex justify-center mt-6">
          <button
            onClick={() =>
              allVisible ? setVisibleCount(6) : setVisibleCount((prev) => prev + 3)
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
