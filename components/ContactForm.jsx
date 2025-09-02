"use client";

import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

export default function ContactForm() {
  const form = useRef();
  const [status, setStatus] = useState("");

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

return (
  <div className="max-w-md mx-auto p-6 background-clair rounded-2xl shadow-md">
    <h2 className="text-3xl text-center color-text font-bold mb-4">Nous contacter</h2>
    <p className="text-center mb-4">
      Une question, un projet ? Écrivez-nous directement via le formulaire de contact.
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
{/* Coordonnées */}
<div className="text-center mt-6 leading-tight text-xl">
  <p className="font-semibold">H.C.R</p>
  <p>9B rue Saint-Charles</p>
  <p>57360 Amnéville</p>
  <p>hcr-57@outlook.fr</p>
  <p>06.68.85.62.93</p>
</div>

{/* Logos réseaux sociaux */}
<div className="flex justify-center space-x-6 mt-4">
  <a href="https://www.facebook.com/100063894768191/about/?_rdr" target="_blank" rel="noopener noreferrer">
    <img src="/images/logofb.png" alt="Facebook" className="w-7 h-7 hover:opacity-80" />
  </a>
  <a href="https://www.instagram.com/h.c.r_sasu/" target="_blank" rel="noopener noreferrer">
    <img src="/images/logoinsta.png" alt="Instagram" className="w-7 h-7 hover:opacity-80" />
  </a>
</div>

  </div>
);

}