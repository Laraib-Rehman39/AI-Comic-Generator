import React, { useCallback, useEffect, useMemo, useState, useRef } from "react";

export default function LoadingScreen({ onComplete }) {
  const [phase, setPhase] = useState("images");
  const [imgIndex, setImgIndex] = useState(0);

  const timers = useRef([]);
  const ended = useRef(false);

  // ===== COMIC IMAGES (Using online URLs that work) =====
  const images = useMemo(
    () => [
      "/img/comic/1.jpg",
      "/img/comic/2.jpg",
      "/img/comic/3.jpg",
      "/img/comic/4.jpg",
      "/img/comic/5.jpg",
      "/img/comic/6.jpg",
      "/img/comic/7.jpg",
      "/img/comic/8.jpg",
      "/img/comic/9.jpg",
      "/img/comic/10.jpg",
    ],
    []
  );

  // ==============================
  // SAFE END FUNCTION
  // ==============================
  const endIntro = useCallback(() => {
    if (ended.current) return;
    ended.current = true;

    timers.current.forEach(clearTimeout);
    timers.current = [];

    onComplete && onComplete();
  }, [onComplete]);

  // ==============================
  // SKIP
  // ==============================
  const skipIntro = () => {
    endIntro();
  };

      // ==============================
    // TIMELINE
    // ==============================
    useEffect(() => {
      images.forEach((_, i) => {
        const t = setTimeout(() => {
          if (!ended.current) setImgIndex(i + 1);
        }, i * 400);
        timers.current.push(t);
      });

      // IMMEDIATELY switch to final phase when images done
      timers.current.push(
        setTimeout(() => {
          if (!ended.current) setPhase("final");
        }, images.length * 300 + 500) // Reduced delay
      );

      // End intro after text animation
      timers.current.push(
        setTimeout(() => {
          endIntro();
        }, images.length * 300 + 3500) // Total time reduced
      );

      return () => timers.current.forEach(clearTimeout);
    }, [endIntro, images]);

  // random image spread
  const randomOffset = () => ({
    "--x": `${Math.random() * 300 - 150}px`,
    "--y": `${Math.random() * 220 - 110}px`,
  });

  return (
    <div className="fixed inset-0 bg-black overflow-hidden z-[9999] pointer-events-auto">

      {/* ===== SKIP BUTTON (100% CLICKABLE) ===== */}
      <button
        onClick={skipIntro}
        className="absolute top-6 right-6 z-[10000] pointer-events-auto
                   text-white text-sm px-4 py-2
                   border border-white/40 rounded-full
                   hover:bg-white hover:text-black transition"
      >
        SKIP →
      </button>

      {/* ===== IMAGES PHASE ===== */}
      {phase === "images" && (
        <div className="absolute inset-0 flex items-center justify-center perspective-1000 pointer-events-none">
          {images.map((img, i) => (
            <div
              key={i}
              className={`absolute ${i < imgIndex ? "opacity-100" : "opacity-0"}`}
              style={{
                ...randomOffset(),
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%) scale(3) translateZ(700px)",
                animation:
                  i < imgIndex ? `pop${i} 1.3s ease-out forwards` : "none",
              }}
            >
              <img
                src={img}
                draggable={false}
                alt={`Comic ${i + 1}`}
                className="w-[520px] h-[320px] object-cover rounded-xl shadow-2xl"
              />
            </div>
          ))}
        </div>
      )}

      {/* ===== FINAL TEXT ===== */}
      {(phase === "comic" || phase === "final") && (
        <>
          <div
            className="absolute inset-0 bg-cover bg-center blur-xl opacity-30 scale-110 pointer-events-none"
            style={{ backgroundImage: `url(${images[4]})` }}
          />

          <div className="relative z-10 flex flex-col items-center justify-center h-full">
            <div className="flex items-center gap-10">
              <div
                className="text-white text-[100px] font-extrabold opacity-0"
                style={{ animation: "sideLeft 1s forwards" }}
              >
                AI
              </div>

              <div
                className="text-[110px] font-black text-transparent"
                style={{
                  WebkitTextStroke: "4px white",
                  background: `url(${images[7]}) center/cover`,
                  WebkitBackgroundClip: "text",
                  animation: "comicReveal 1.3s forwards",
                }}
              >
                COMIC
              </div>

              <div
                className="text-white text-[100px] font-extrabold opacity-0"
                style={{ animation: "sideRight 1s forwards" }}
              >
                GENERATOR
              </div>
            </div>

            <div
              className="text-white text-[40px] font-extrabold opacity-0 mt-4"
              style={{ animation: "taglineUp 1s forwards 0.8s" }}
            >
              Where stories become art
            </div>
          </div>
        </>
      )}

      {/* ===== CSS ===== */}
      <style>{`
        .perspective-1000 { perspective: 1000px; }

        ${images
          .map(
            (_, i) => `
          @keyframes pop${i} {
            0% {
              transform: translate(-50%, -50%) scale(3) translateZ(800px);
              opacity: 0;
            }
            40% { opacity: 1; }
            100% {
              transform: translate(
                calc(-50% + var(--x)),
                calc(-50% + var(--y))
              ) scale(1) translateZ(-300px);
              opacity: 0;
            }
          }
        `
          )
          .join("")}

        @keyframes comicReveal {
          0% { transform: scale(0.5); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }

        @keyframes sideLeft {
          from { transform: translateX(-200px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }

        @keyframes sideRight {
          from { transform: translateX(200px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }

        @keyframes taglineUp {
          from { transform: translateY(40px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
}