"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [accueils, setAccueils] = useState([]);

  useEffect(() => {
    const fetchAccueils = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/accueils?populate=imageAccueil`
        );
        const data = await res.json();
        setAccueils(data.data || []);
        console.log("Données reçues de Strapi:", data);


      } catch (error) {
        console.error("Erreur lors du fetch accueil :", error);
      }
    };

    fetchAccueils();
  }, []);

  return (
    <main className="p-6 background-beige">
  
      <div className="grid grid-cols-1 gap-6 ">
        {accueils.map((accueil) => {
          const { id, titre, titre2, imageAccueil } = accueil; // ⚡ mêmes champs au premier niveau

          const imageUrl = imageAccueil?.url
            ? imageAccueil.url // URL déjà complète via Cloudinary
            : imageAccueil?.formats?.thumbnail?.url
            ? imageAccueil.formats.thumbnail.url
            : null;

          return (
            <div
              key={id}
              className="relative w-full h-[300px]  rounded-lg overflow-hidden shadow-md md:top-12 md:mb-[50px]"
            >
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt={titre || "Image accueil"}
                  className="w-full h-full object-cover"
                  
                />
                
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-500">Pas d’image</span>
                  
                </div>
                
              )}
              
 <div className="absolute inset-0 flex flex-col items-center justify-center bg-opacity-40 text-center">
  <h1 className="text-4xl text-white font-bold">{titre}</h1>
  <h2 className="text-2xl text-white mt-2 font-bold">{titre2}</h2>
<a
  href="#contact"
  className="mt-4 px-6 py-3 bg-button text-white rounded-lg shadow-md hover:shadow-lg cursor-pointer transition block text-center rounded-lg"
>
  Nous contacter
</a>

</div>


            </div>
          );
        })}
      </div>
    </main>
  );
}
