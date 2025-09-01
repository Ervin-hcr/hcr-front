"use client";

import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Composant pour un slider unique
function TransformationSlider({ images, description }) {
  const swiperRef = useRef(null);
  const prevRef = useRef(null);
  const nextRef = useRef(null);

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

  return (
    <div className="  p-4 relative">
      <Swiper
        ref={swiperRef}
        modules={[Navigation, Pagination]}
        loop={true}
        slidesPerView={1}
        spaceBetween={20}
        pagination={{ clickable: true }}
        navigation={false} // sera initialisé dans useEffect
        className="w-full h-[300px] sm:h-[400px] lg:h-[500px]"
      >
        {images.map((url, idx) => (
          <SwiperSlide key={idx}>
            <img
              src={url}
              alt={`Slide ${idx + 1}`}
              className="w-full h-full object-cover rounded-lg"
            />
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

      {description && (
        <p className="mt-4 text-center text-gray-700 whitespace-pre-line">
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
      <h2 className="text-3xl font-bold text-center mb-8 color-text">
       Avant / Après : nos réalisations en image
      </h2>

      <div className="space-y-12">
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
              />
            );
          })
        )}
      </div>
    </section>
  );
}
