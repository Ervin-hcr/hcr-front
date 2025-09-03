"use client";

import { useEffect, useState, useRef } from "react";

export default function Services() {
  const [services, setServices] = useState([]);
  const [presentation, setPresentation] = useState({ titre: "", description: "" });
  const [visibleCount, setVisibleCount] = useState(6);
  const cardRefs = useRef([]); // refs pour chaque card

  // Fetch des services
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/services?populate=image`);
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();
        if (data.data && data.data.length > 0) setServices(data.data);
      } catch (error) {
        console.error("Erreur lors du fetch des services :", error);
      }
    };
    fetchServices();
  }, []);

  // Fetch de la présentation
  useEffect(() => {
    const fetchPresentation = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/presentation-services?populate=*`);
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();
        if (data.data && data.data.length > 0) {
          setPresentation({
            titre: data.data[0].titre,
            description: data.data[0].description,
          });
        }
      } catch (error) {
        console.error("Erreur lors du fetch de la présentation :", error);
      }
    };
    fetchPresentation();
  }, []);

  if (!services || services.length === 0)
    return <p className="p-6">Chargement des services...</p>;

  // Fonction pour ajouter 3 services visibles à la fois
  const handleVoirPlus = () => {
    setVisibleCount(prev => Math.min(prev + 3, services.length));
  };

  return (
    <section className="p-6 background-beige">
      <h2 id="services" className="text-3xl color-text font-bold mb-6 text-center">
        {presentation.titre}
      </h2>
      <p className="mb-6 text-center text-gray-700">{presentation.description}</p>

      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {services.slice(0, visibleCount).map((serviceItem, index) => {
          const { id, service, description, image } = serviceItem;
          const imageUrl = image?.[0]?.formats?.medium?.url || image?.[0]?.url || null;

          return (
            <div
              key={id}
              ref={(el) => (cardRefs.current[index] = el)}
              className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col"
            >
              {imageUrl ? (
                <img src={imageUrl} alt={service} className="w-full h-48 object-cover" />
              ) : (
                <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-500">Pas d'image</span>
                </div>
              )}
              <div className="p-4 flex flex-col flex-grow">
                <h3 className="text-xl font-semibold mb-2 text-center">{service}</h3>
                <p className="text-gray-700 whitespace-pre-line text-center">{description}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bouton Voir plus */}
      {visibleCount < services.length && (
        <div className="flex justify-center mt-6">
          <button
            onClick={handleVoirPlus}
            className="mt-4 px-6 py-3 bg-button text-white rounded-lg shadow-md hover:shadow-lg cursor-pointer transition"
          >
            Voir plus
          </button>
        </div>
      )}
    </section>
  );
}
