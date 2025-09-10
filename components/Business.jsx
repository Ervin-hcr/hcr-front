"use client";
import { useEffect, useState } from "react";

export default function Business() {
  const [presentation, setPresentation] = useState(null);

  useEffect(() => {
    const fetchPresentation = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/presentations`);
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();


       
        if (data.data && data.data.length > 0) {
          setPresentation(data.data[0]); 
        }
      } catch (error) {
      
      }
    };

    fetchPresentation();
  }, []);

  if (!presentation) return <p className="p-6">Chargement de la présentation...</p>;

  const { titre, presentationEntreprise } = presentation;

  return (
<section id="entreprise" className="p-6 background-beige shadow-md text-center scroll-mt-20">
  <h2 className="text-3xl font-bold mb-4 color-text {`${poppins.className} antialiased`} md:text-4xl">{titre}</h2>
  <p className="text-gray-700 whitespace-pre-line font-roboto md:text-2xl">{presentationEntreprise}</p>
</section>

  );
}
