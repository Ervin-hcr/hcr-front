"use client";

import React, { useRef, useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import { Poppins } from "next/font/google";

const poppins = Poppins({ weight: ["400", "700"], subsets: ["latin"] });

export default function ContactForm() {
  const form = useRef();
  const [status, setStatus] = useState("");
  const [coords, setCoords] = useState(null);

  const sendEmail = (e) => {
    e.preventDefault();
    emailjs
      .sendForm(
        "service_i7i547r",
        "template_cttpfe8",
        form.current,
        "2efqKaR19Kz2s6zHd"
      )
      .then(
        () => {
          setStatus("Message envoyé ✅");
          form.current.reset();
        },
        (error) => {
          setStatus("Erreur ❌ : " + error.text);
        }
      );
  };

  useEffect(() => {
    const fetchCoords = async () => {
      try {
        const res = await fetch(
          "https://hcr-back.onrender.com/api/coordonnees?populate=*"
        );
        const data = await res.json();
        if (data.data && data.data.length > 0) {
          setCoords(data.data[0]);
        }
      } catch (err) {
        console.error("Erreur récupération coordonnées :", err);
      }
    };
    fetchCoords();
  }, []);

  return (
    <div className="w-full background-clair p-6">
      {/* Titre et texte centrés */}
      <div className="max-w-7xl mx-auto mb-12">
        <h2
          id="contact"
          className={`${poppins.className} text-3xl text-center color-text font-bold mb-4 md:text-4xl scroll-mt-20`}
        >
          Nous contacter
        </h2>
        <p className="text-center text-gray-700 mb-4 md:text-2xl">
          Une question, un projet ? Écrivez-nous directement via le formulaire de contact.
        </p>
      </div>

      {/* Formulaire et coordonnées */}
      <div className="max-w-7xl mx-auto xl:flex xl:items-center xl:justify-center xl:space-x-16">
        {/* Formulaire */}
        <div className="xl:w-1/2 max-w-md mx-auto md:max-w-full">
          <form ref={form} onSubmit={sendEmail} className="space-y-4">
            <input
              type="text"
              name="from_name"
              placeholder="Votre nom"
              required
              className="w-full p-2 rounded-lg bg-white"
            />
            <input
              type="email"
              name="from_email"
              placeholder="Votre email"
              required
              className="w-full p-2 rounded-lg bg-white"
            />
            <textarea
              name="message"
              placeholder="Votre message"
              required
              rows="5"
              className="w-full p-2 rounded-lg bg-white"
            ></textarea>

            <button
              type="submit"
              className="mt-4 px-6 py-3 bg-button text-white rounded-lg shadow-md hover:shadow-lg cursor-pointer transition block mx-auto"
            >
              Envoyer
            </button>
          </form>

          {status && <p className="mt-4 text-center">{status}</p>}
        </div>

        {/* Coordonnées et réseaux */}
        {coords && (
          <div className="xl:w-1/2 mt-6 xl:mt-0 flex flex-col justify-center text-center">
            {/* Logo */}
            {coords.logo && coords.logo.length > 0 && (
              <img
                src={coords.logo[0].url}
                alt="Logo entreprise"
                className="mx-auto mb-4 w-32 h-auto"
              />
            )}

            <div className="leading-tight text-gray-700 text-xl md:text-2xl">
              <p className="font-semibold">{coords.entreprise}</p>
              <p>{coords.adresse}</p>
              <p>{coords.ville}</p>
              <p>{coords.mail}</p>
              <p>{coords.telephone}</p>
            </div>

            <div className="flex justify-center space-x-6 mt-4">
              <a
                href="https://www.facebook.com/100063894768191/about/?_rdr"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="/images/logofb.png"
                  alt="Facebook"
                  className="w-7 h-7 hover:opacity-80"
                />
              </a>
              <a
                href="https://www.instagram.com/h.c.r_sasu/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="/images/logoinsta.png"
                  alt="Instagram"
                  className="w-7 h-7 hover:opacity-80"
                />
              </a>
            </div>
          </div>
        )}
      </div>

      {/* Footer discrète */}
      <div className="w-full border-t border-gray-200 mt-12 pt-4 text-center text-gray-500 text-sm space-y-1">
        <p>
          Site réalisé par{" "}
          <a
            href="https://www.jh-studiocode.fr"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-700 hover:text-gray-900 underline transition-colors"
          >
            JH Studio Code
          </a>
        </p>
        <p>
          <a
            href="/mentions-legales"
                  target="_blank"
            className="text-gray-700 hover:text-gray-900 underline transition-colors"
          >
            Mentions légales
          </a>
        </p>
      </div>
    </div>
  );
}
