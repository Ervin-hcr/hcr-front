export default function InterventionMap() {
  return (
    <section className="p-6 background-beige">
      <h2 id="zones" className="text-3xl color-text font-bold text-center mb-4 md:text-4xl">
        Nos zones d'intervention
      </h2>
   <p className="text-center mb-4 text-gray-700 md:text-2xl">
  Basée à Amnéville, H.C.R intervient au Luxembourg, à Metz, à Nancy et dans les environs pour tous vos projets de rénovation.
</p>

      <div className="w-full h-[300px] sm:h-[400px] lg:h-[600px]">
        <iframe
          src="https://www.google.com/maps/d/u/0/embed?mid=1o0HxgWUiEsC8zu6niL2xVZdU5IqeA-I&ehbc=2E312F&noprof=1"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          title="Carte zones d'intervention H.C.R"
        ></iframe>
      </div>
    </section>
  );
}
