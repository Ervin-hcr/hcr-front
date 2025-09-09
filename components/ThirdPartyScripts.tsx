"use client";

import { useEffect, useState } from "react";

export default function ThirdPartyScripts() {
  const [consent, setConsent] = useState(false);

  useEffect(() => {
    const c = localStorage.getItem("cookieConsent");
    if (c === "true") setConsent(true);
  }, []);

  if (!consent) return null;

  return (
    <>
      {/* Google Analytics */}
      <script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXX"
      ></script>
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XXXXXXX');
          `,
        }}
      />
    </>
  );
}