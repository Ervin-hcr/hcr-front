"use client";

import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Composant pour un slider unique
function TransformationSlider({ images, description, sliderId }) {
  const swiperRef = useRef(null);
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  // Stocker le fit choisi par image
  const [fits, setFits] = useState([]);

  useEffect(() => {
    if (swiperRef.current && prevRef.current && nextRef.current) {
      const swiper = swiperRef.current.swiper;
      swiper.params.navigation.prevEl = prevRef.current;
      swiper.params.navigation.nextEl = nextRef.current;
      swiper.navigation.destroy();
      swiper.navigation.init();
      swiper.navigation.update();
    }
  }, [images]);

  // Charger les dimensions réelles des images pour décider du fit
  useEffect(() => {
    const loadFits = async () => {
      const promises = images.map(
        (url) =>
          new Promise((resolve) => {
            const img = new Image();
            img.src = url;
            img.onload = () => {
              const ratio = img.width / img.height;
              const containerRatio = 16 / 9; // même que aspect-[16/9]
              const diff = Math.abs(ratio - containerRatio);

              // si ratio proche → cover, sinon contain
              if (diff < 0.3) {
                resolve("object-cover");
              } else {
                resolve("object-contain");
              }
            };
            img.onerror = () => resolve("object-contain"); // fallback
          })
      );

      const results = await Promise.all(promises);
      setFits(results);
    };

    if (images.length > 0) {
      loadFits();
    }
  }, [images]);

  return (
   <div className="w-full md:w-[90%] mx-auto relative">
  <Swiper
    ref={swiperRef}
    modules={[Navigation, Pagination]}
    loop={true}
    slidesPerView={1}
    spaceBetween={20}
    navigation={false}
    className="w-full"
  >
    {images.map((url, idx) => (
      <SwiperSlide key={idx} className="flex justify-center">
        <div className="w-full flex items-center justify-center rounded-lg overflow-hidden background-clair md:h-[600px]">
          <img
            src={url}
            alt={`Slide ${idx + 1}`}
            className="w-full h-full md:inline-block md:mx-auto object-contain md:object-contain"
          />
        </div>
      </SwiperSlide>
    ))}
  </Swiper>

  {/* Chevrons */}
  <button
    ref={prevRef}
    className="absolute left-2 top-1/2 -translate-y-1/2 z-10 text-white text-3xl bg-black/50 p-2 rounded-full hover:bg-black/70 transition"
    aria-label="Image précédente"
  >
    ‹
  </button>
  <button
    ref={nextRef}
    className="absolute right-2 top-1/2 -translate-y-1/2 z-10 text-white text-3xl bg-black/50 p-2 rounded-full hover:bg-black/70 transition"
    aria-label="Image suivante"
  >
    ›
  </button>


    {/* Pagination individuelle juste sous le slider */}
{/* <div className={`pagination-${sliderId} mt-2 flex justify-center`}></div> */}


 {description && (
  <p className="mt-2 text-center text-gray-700 whitespace-pre-line md:text-2xl">
    {description}
  </p>
)}

    </div>
  );
}

// Composant principal qui récupère les transformations
export default function Slider() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/transformations?populate=*`
        );
        if (!res.ok) throw new Error("Erreur réseau");
        const data = await res.json();
        setItems(data.data || []);
      } catch (err) {
        console.error("Erreur lors de la récupération :", err);
      }
    };
    fetchData();
  }, []);

  const toFullUrl = (url) =>
    url?.startsWith("http") ? url : `${process.env.NEXT_PUBLIC_API_URL}${url}`;

  return (
    <section className="p-6 background-clair">
      <h2 id="photos" className="text-3xl font-bold text-center mb-8 color-text md:text-4xl">
        Avant / Après : nos réalisations en image
      </h2>

      <div className="space-y-6">
        {items.length === 0 ? (
          <p className="text-center text-lg">Chargement des transformations...</p>
        ) : (
          items.map((item) => {
            const images = [
              item.image1?.[0]?.formats?.medium?.url || item.image1?.[0]?.url,
              item.image2?.[0]?.formats?.medium?.url || item.image2?.[0]?.url,
              item.image3?.[0]?.formats?.medium?.url || item.image3?.[0]?.url,
            ]
              .filter(Boolean)
              .map(toFullUrl);

            return (
              <TransformationSlider
                key={item.id}
                images={images}
                description={item.description}
                sliderId={item.id} // identifiant unique pour la pagination
              />
            );
          })
        )}
      </div>
    </section>
  );
}
