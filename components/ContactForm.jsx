"use client";

import React, { useRef, useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import { Poppins } from "next/font/google";

const poppins = Poppins({ weight: ["400", "700"], subsets: ["latin"] });

export default function ContactForm() {
  const form = useRef();
  const [status, setStatus] = useState("");
  const [coords, setCoords] = useState(null); // État pour stocker les coordonnées

  // Fonction pour envoyer le mail
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

  // Récupération des coordonnées depuis Strapi
  useEffect(() => {
  const fetchCoords = async () => {
    try {
      const res = await fetch("https://hcr-back.onrender.com/api/coordonnees?populate=*");
      const data = await res.json();
      console.log("Coordonnées reçues :", data.data[0]);
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
    <div className="max-w-md mx-auto p-6 background-clair rounded-2xl shadow-md">
      <h2
        className={`${poppins.className} text-3xl text-center color-text font-bold mb-4`}
      >
        Nous contacter
      </h2>
      <p className="text-center text-gray-700 mb-4">
        Une question, un projet ? Écrivez-nous directement via le formulaire de
        contact.
      </p>

      {/* Formulaire */}
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

      {/* Coordonnées depuis Strapi */}
  {coords && (
  <div className="text-center mt-6 leading-tight text-gray-700 text-xl">
    <p className="font-semibold">{coords.entreprise}</p>
    <p>{coords.adresse}</p>
    <p>{coords.ville}</p>
    <p>{coords.mail}</p>
    <p>{coords.telephone}</p>
  </div>
)}


      {/* Logos réseaux sociaux */}
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
  );
}
