import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import img from "./h4.gif";
import sanjihappy from "./h7.gif";
import sanjisad from "./h8.gif";
import "./App.css";

function App() {
  const [issad, setisSad] = useState(false);
  const hearts = Array.from({ length: 20 });
  const noBtnRef = useRef(null);
  const navigate = useNavigate();

  const isMobile = window.innerWidth < 640;

  // 🏃 NO button dodge
  const dodge = () => {
    const btn = noBtnRef.current;
    if (!btn) return;

    setisSad(true);

    const x = Math.random() * 120 - 60;
    const y = Math.random() * 80 - 40;

    btn.style.transform = `translate(${x}px, ${y}px)`;

    setTimeout(() => {
      setisSad(false);
    }, 400);
  };

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const text = isInView ? "Hello, Vanchika!" : "";
  const text2 = isInView ? "Will you be my valentine?" : "";

  return (
    <div className="relative bg-[#F8C8DC] min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden">

      {/* ❤️ Floating Hearts */}
      <div className="absolute inset-0 pointer-events-none">
        {hearts.map((_, i) => (
          <motion.span
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 90 + 5}%`,
              fontSize: `${14 + Math.random() * 20}px`,
              color: "#E63973",
            }}
            initial={{ opacity: 0, y: "100%" }}
            animate={{
              opacity: [0, 1, 1, 0],
              y: "-10%",
              x: `${Math.random() * 30 - 15}px`,
            }}
            transition={{
              duration: 6 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "linear",
            }}
          >
            ❤️
          </motion.span>
        ))}
      </div>

      {/* 👋 Heading */}
      <div className="flex items-center gap-2 mb-6 z-10">
        <h1
          ref={ref}
          className="
            text-xl
            xs:text-2xl
            sm:text-3xl
            md:text-4xl
            font-semibold
            text-[#4A2C2A]
            text-center
            leading-tight
          "
        >
          {text.split("").map((char, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.06 }}
            >
              {char}
            </motion.span>
          ))}
        </h1>

        <motion.img
          src={img}
          alt="love"
          className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: text.length * 0.06 + 0.4 }}
        />
      </div>

      {/* 💌 Card */}
      <div className="bg-white w-full max-w-xs sm:max-w-md aspect-square rounded-full flex items-center justify-center shadow-lg z-10">
        <div className="flex flex-col items-center gap-4 px-4">

          <h2
            className="
              text-base
              xs:text-lg
              sm:text-xl
              md:text-2xl
              text-[#4A2C2A]
              text-center
              leading-snug
              px-2
            "
          >
            {text2.split("").map((letter, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: index * 0.05 }}
              >
                {letter}
              </motion.span>
            ))}
          </h2>

          <motion.img
            src={issad ? sanjisad : sanjihappy}
            alt="sanji"
            className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24"
            animate={{ scale: issad ? 0.9 : 1 }}
            transition={{ duration: 0.3 }}
          />

          {/* 🔘 Buttons */}
          <div className="mt-6 flex justify-center w-full">
  <div className="relative flex items-center gap-3  px-4 py-2 rounded-full">

    {/* YES */}
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="bg-[#E63973] text-white px-6 py-2 rounded-full text-lg shadow-md z-10"
      onClick={() => navigate("/home?accepted=yes")}
    >
      YES 💕
    </motion.button>

    {/* NO */}
    <motion.button
      ref={noBtnRef}
      className="bg-gray-300 text-black px-6 py-2 rounded-full text-lg select-none z-10"
      onMouseEnter={!isMobile ? dodge : undefined}
      onMouseMove={!isMobile ? dodge : undefined}
      onTouchStart={(e) => {
        e.preventDefault();
        dodge();
      }}
    >
      NO 💔
    </motion.button>

  </div>
</div>

        </div>
      </div>
    </div>
  );
}

export default App;
