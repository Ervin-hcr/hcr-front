"use client";
import React, { useState, useEffect, useRef } from "react";


const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDesktopMenuVisible, setIsDesktopMenuVisible] = useState(false); // Pour animer le menu en desktop
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Affiche le menu desktop avec animation au chargement de la page
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsDesktopMenuVisible(true);
    }, 200); // Ajoute un délai comme pour ton titre
  
    return () => clearTimeout(timeout);
  }, []);
  

  // Ferme le menu si l'utilisateur clique en dehors
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Ferme le menu lorsque l'utilisateur clique sur un lien
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <div className="relative">
      {/* Menu de bureau : visible à partir de 1024px */}
      <ul
  className={`hidden lg:flex fixed top-0 left-0 w-full h-20 text-3xl z-50 px-4 background-beige shadow-lg animenu ${
    isDesktopMenuVisible ? "animenu-visible" : "animenu-hidden"
  }`}
>


        {/* Liens de navigation à droite */}
        <li className="flex-1 mt-5 sm:text-center color-text hover:shadow-lg transition-shadow duration-300">
          <a href="#entreprise" className="resize-text">
            L'entreprise
          </a>
        </li>
        <li className="sm:flex-1 mt-5 sm:text-center color-text hover:shadow-lg transition-shadow duration-300">
          <a href="#services" className="resize-text">
            Nos services
          </a>
        </li>
        <li className="flex-1 mt-5 text-center color-text hover:shadow-lg transition-shadow duration-300">
          <a href="#photos" className="resize-text">
          Galerie photos
          </a>
        </li>
        <li className="flex-1 mt-5 text-center color-text hover:shadow-lg transition-shadow duration-300">
          <a href="#zones" className="resize-text">
            Zones d'intervention
          </a>
        </li>
    
      </ul>

   

 {/* Bouton Hamburger pour les appareils mobiles */}
<button
  ref={buttonRef}
  onClick={toggleMenu}
  className="lg:hidden w-full p-2 background-beige flex justify-start items-center" // Fond full-width
  aria-label="Menu"
>
  <div className="flex flex-col space-y-1"> {/* Conteneur des barres */}
    <span className="block w-6 h-0.5 bg-black"></span>
    <span className="block w-6 h-0.5 bg-black"></span>
    <span className="block w-6 h-0.5 bg-black"></span>
  </div>
</button>


      {/* Menu déroulant pour les appareils mobiles (visible uniquement avant 1024px) */}
      <nav
        ref={menuRef}
        className={`background-beige lg:hidden w-full fixed top-0 left-0 lg:w-3/4 background-beige shadow-md z-50 transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <ul className="flex flex-col items-center py-4 color-green w-full">
          <li className="w-full">
            <a
              href="#entreprise"
              className="block py-2 px-4 color-text text-2xl md:text-3xl"
              onClick={closeMenu}
            >
              L'entreprise
            </a>
          </li>
          <li className="w-full">
            <a
              href="#services"
              className="block py-2 px-4 color-text text-2xl md:text-3xl"
              onClick={closeMenu}
            >
             Nos services
            </a>
          </li>
          <li className="w-full">
            <a
              href="#photos"
              className="block py-2 px-4 color-text text-2xl md:text-3xl"
              onClick={closeMenu}
            >
              Galerie photos
            </a>
          </li>
          <li className="w-full">
            <a
              href="#zones"
              className="block py-2 px-4 color-text text-2xl md:text-3xl"
              onClick={closeMenu}
            >
             Zones d'intervention
            </a>
          </li>
       
        </ul>
      </nav>
    </div>
  );
};

export default Nav;