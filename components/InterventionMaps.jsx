export default function InterventionMap() {
  return (
    <section className="p-6 background-beige">
      <h2
        id="zones"
        className="text-3xl color-text font-bold text-center mb-4 md:text-4xl scroll-mt-20"
      >
        Nos zones d'intervention
      </h2>

      <p className="text-center mb-4 text-gray-700 md:text-2xl min-h-[3rem] md:min-h-[3.5rem]">
        Basée à Amnéville, H.C.R intervient au Luxembourg, à Metz, à Nancy et
        dans les environs pour tous vos projets de rénovation.
      </p>

      <div className="w-full lg:max-w-5xl lg:mx-auto">
        {/* Wrapper pour forcer aspect ratio 16:9 */}
        <div className="relative w-full aspect-[16/9]">
          <iframe
            src="https://www.google.com/maps/d/u/0/embed?mid=1o0HxgWUiEsC8zu6niL2xVZdU5IqeA-I&ehbc=2E312F&noprof=1"
            className="absolute top-0 left-0 w-full h-full"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            title="Carte zones d'intervention H.C.R"
          ></iframe>
        </div>
      </div>
    </section>
  );
}
