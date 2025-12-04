import React, { useState, useEffect } from "react";
import { certificates } from "../../constants";

const Certificates = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // autoplay every 3 seconds
  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % certificates.length);
    }, 3000);
    return () => clearInterval(id);
  }, []);

  const prev = () => setIndex((i) => (i - 1 + certificates.length) % certificates.length);
  const next = () => setIndex((i) => (i + 1) % certificates.length);

  return (
    <section id="certificates" className="py-20 px-6 md:px-12 lg:px-16">
      <div className="text-center mb-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-white">CERTIFICATES</h2>
        <div className="w-24 h-1 bg-[#8245ec] mx-auto mt-3 rounded-md"></div>
        <p className="text-gray-400 mt-4">Verified certificates & course completions.</p>
      </div>

      <div className="relative flex items-center justify-center gap-4">
        {/* Left arrow - near the container */}
        <button
          onClick={prev}
          aria-label="Previous"
          className={`z-30 w-14 h-14 rounded-full flex items-center justify-center text-2xl font-bold shadow-lg transition-all ${
            certificates[index]?.image
              ? "bg-violet-600 hover:bg-violet-700 text-white"
              : "bg-white hover:bg-gray-100 text-black"
          }`}
        >
          ‹
        </button>

        {/* Slides container */}
        <div className="w-full max-w-3xl h-[280px] sm:h-[360px] lg:h-[450px] overflow-hidden relative rounded-2xl">
          {certificates.map((c, i) => {
            const active = i === index;
            return (
              <div
                key={c.id}
                className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${
                  active ? "opacity-100 scale-100 z-20" : "opacity-0 scale-95 z-10 pointer-events-none"
                }`}
                aria-hidden={!active}
              >
                <div className="w-full h-full bg-white rounded-2xl p-0 shadow-2xl flex flex-col">
                  {/* Title section - fixed height */}
                  <div className="flex-none bg-gray-50 px-6 sm:px-8 py-4 sm:py-5 border-b border-gray-200">
                    <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800 line-clamp-2">
                      {c.title}
                    </h3>
                  </div>

                  {/* Image area - fills all remaining space */}
                  <div className="flex-1 w-full bg-white overflow-hidden">
                    {c.image ? (
                      <img
                        src={c.image}
                        alt={c.title}
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <div className="flex items-center justify-center text-gray-400 text-center w-full h-full">
                        <p>No certificate image available</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right arrow - near the container */}
        <button
          onClick={next}
          aria-label="Next"
          className={`z-30 w-14 h-14 rounded-full flex items-center justify-center text-2xl font-bold shadow-lg transition-all ${
            certificates[index]?.image
              ? "bg-violet-600 hover:bg-violet-700 text-white"
              : "bg-white hover:bg-gray-100 text-black"
          }`}
        >
          ›
        </button>
      </div>

      {/* indicator dots - violet when active & image present, white for inactive */}
      <div className="flex justify-center gap-3 mt-8">
        {certificates.map((c, i) => {
          const isActive = i === index;
          const hasImage = Boolean(c.image);
          return (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`w-4 h-4 rounded-full transition-colors ${
                isActive && hasImage
                  ? "bg-violet-600 shadow-md"
                  : "bg-white"
              }`}
              aria-label={`Go to certificate ${i + 1}`}
            />
          );
        })}
      </div>
    </section>
  );
};

export default Certificates;