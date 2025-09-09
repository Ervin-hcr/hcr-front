"use client";

import { useState, useEffect } from "react";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) setVisible(true);
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookieConsent", "true");
    setVisible(false);
  };

  const handleReject = () => {
    localStorage.setItem("cookieConsent", "false");
    // Optionnel : supprimer les cookies tiers existants
    document.cookie
      .split(";")
      .forEach(
        (c) =>
          (document.cookie = c
            .replace(/^ +/, "")
            .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"))
      );
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 bg-gray-900 text-white p-4 rounded shadow-lg z-50">
      <p>
        Nous utilisons des cookies pour améliorer votre expérience et analyser
        le trafic. Vous pouvez accepter ou refuser.
      </p>
      <div className="mt-2 flex gap-2 justify-end">
        <button
          onClick={handleReject}
          className="px-4 py-2 bg-gray-600 rounded hover:bg-gray-700"
        >
          Refuser
        </button>
        <button
          onClick={handleAccept}
          className="px-4 py-2 bg-green-600 rounded hover:bg-green-700"
        >
          Accepter
        </button>
      </div>
    </div>
  );
}