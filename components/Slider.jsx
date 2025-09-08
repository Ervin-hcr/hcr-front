"use client";

import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Composant pour un slider unique
function TransformationSlider({ images, description, sliderId, toFullUrl }) {
  const swiperRef = useRef(null);
  const prevRef = useRef(null);
  const nextRef = useRef(null);

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

  useEffect(() => {
    const loadFits = async () => {
      const promises = images.map(
        (image) =>
          new Promise((resolve) => {
            const img = new Image();
            img.src = toFullUrl(image.url, 800, 600);
            img.onload = () => {
              const ratio = img.width / img.height;
              const containerRatio = 16 / 9;
              const diff = Math.abs(ratio - containerRatio);

              if (diff < 0.3) {
                resolve("object-cover");
              } else {
                resolve("object-contain");
              }
            };
            img.onerror = () => resolve("object-contain");
          })
      );

      const results = await Promise.all(promises);
      setFits(results);
    };

    if (images.length > 0) {
      loadFits();
    }
  }, [images, toFullUrl]);

  return (
    <div className="w-full md:w-[90%] mx-auto relative lg:bg-white xl:shadow-lg xl:rounded-2xl xl:p-6">
      <Swiper
        ref={swiperRef}
        modules={[Navigation, Pagination]}
        loop={true}
        slidesPerView={1}
        spaceBetween={20}
        navigation={false}
        className="w-full"
      >
        {images.map((image, idx) => (
          <SwiperSlide key={idx} className="flex justify-center">
            <div className="w-full flex items-center justify-center rounded-lg overflow-hidden sm:background-clair md:h-[600px]">
              <img
                src={toFullUrl(image.url, 800, 600)}
                srcSet={`
                  ${toFullUrl(image.url, 400, 300)} 400w,
                  ${toFullUrl(image.url, 800, 600)} 800w,
                  ${toFullUrl(image.url, 1200, 900)} 1200w
                `}
                sizes="(max-width: 768px) 400px, (max-width: 1024px) 800px, 1200px"
                alt={image.alternativeText || "Rénovation par HCR Amnéville"}
                className={`w-full h-full md:inline-block md:mx-auto ${fits[idx] || "object-contain"}`}
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

  const toFullUrl = (url, width = 800, height = 600) =>
    url?.startsWith("http")
      ? url
      : `${process.env.NEXT_PUBLIC_API_URL}${url}?w=${width}&h=${height}&c=fill`;

  return (
    <section className="p-6 background-clair">
      <h2
        id="photos"
        className="text-3xl font-bold text-center mb-8 color-text md:text-4xl scroll-mt-20"
      >
        Avant / Après : nos réalisations en image
      </h2>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {items.length === 0 ? (
          <p className="text-center text-lg">Chargement des transformations...</p>
        ) : (
          items.map((item) => {
            const images = [
              item.image1?.[0],
              item.image2?.[0],
              item.image3?.[0],
            ].filter(Boolean);

            return (
              <TransformationSlider
                key={item.id}
                images={images}
                description={item.description}
                sliderId={item.id}
                toFullUrl={toFullUrl}
              />
            );
          })
        )}
      </div>
    </section>
  );
}
