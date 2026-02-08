import { useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef } from "react";

import img from "./h2.webp";
import m2 from "./musics.mp3";

function Home() {
  const [searchParams] = useSearchParams();
  const check = searchParams.get("accepted");

  const hearts = Array.from({ length: 20 });

  // 📸 Load slideshow images
  const images = import.meta.glob("./assets/*.{png,jpg,jpeg,webp}", {
    eager: true,
  });
  const imageList = Object.values(images).map((img) => img.default);

  const [show, setShow] = useState(true);
  const [showImage, setShowImage] = useState(false);
  const [index, setIndex] = useState(0);

  // 🎵 Music (play only once)
  const musicList = [m2];
  const audioRef = useRef(null);
  const [musicStarted, setMusicStarted] = useState(false);

  // ⏱️ First screen timer
  useEffect(() => {
    if (check) {
      const timer = setTimeout(() => {
        setShow(false);
        setShowImage(true);
      }, 1200);

      return () => clearTimeout(timer);
    }
  }, [check]);

  // 🎞️ Slideshow timer
  useEffect(() => {
    if (showImage && imageList.length > 0) {
      const slideTimer = setInterval(() => {
        setIndex((prev) => (prev + 1) % imageList.length);
      }, 3000);

      return () => clearInterval(slideTimer);
    }
  }, [showImage, imageList.length]);

  // 🎵 Start music ONCE when slideshow starts
  useEffect(() => {
    alert("please click on image")
    if (showImage && !musicStarted) {
      const startMusic = () => {
        audioRef.current.volume = 0.5;
        audioRef.current.src = musicList[0]; // pick ONE song
        audioRef.current.loop = true;
        audioRef.current.play();
        setMusicStarted(true);
      };

      document.addEventListener("click", startMusic, { once: true });
      document.addEventListener("touchstart", startMusic, { once: true });

      return () => {
        document.removeEventListener("click", startMusic);
        document.removeEventListener("touchstart", startMusic);
      };
    }
  }, [showImage, musicStarted]);

  return (
    <>
      {/* 🎵 Audio Element */}
      <audio ref={audioRef} preload="auto" />

      {/* ❤️ Floating Hearts */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
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

      <AnimatePresence mode="wait">
        {/* 🎉 First Screen */}
        {check && show && (
          <motion.div
            className="bg-[#F8C8DC] w-full h-screen flex flex-col items-center justify-center gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.h1
              className="text-4xl text-[#4A2C2A]"
              initial={{ y: -40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              Badhiya kiya Vanchika 💕
            </motion.h1>

            <motion.img
              src={img}
              alt="happy"
              className="w-64"
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            />
          </motion.div>
        )}

        {/* 🎞️ Slideshow */}
        {showImage && imageList.length > 0 && (
          <motion.div
            className="bg-[#F8C8DC] w-full h-screen flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <motion.img
              key={index}
              src={imageList[index]}
              className="w-80 rounded-xl shadow-xl"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Home;
