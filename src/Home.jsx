import { useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import img from "./h2.webp";

function Home() {
  const [searchParams] = useSearchParams();
  const check = searchParams.get("accepted");
const hearts = Array.from({ length: 20 });

  // ✅ Import images correctly
  const images = import.meta.glob("./assets/*.{png,jpg,jpeg,webp}", {
    eager: true,
  });
  const imageList = Object.values(images).map((img) => img.default);

  const [show, setShow] = useState(true);
  const [showImage, setShowImage] = useState(false);
  const [index, setIndex] = useState(0);

  // ⏱️ Timer logic
  useEffect(() => {
    if (check) {
      const timer = setTimeout(() => {
        setShow(false);
        setShowImage(true); // 👉 start slideshow
      }, 12000);

      return () => clearTimeout(timer);
    }
  }, [check]);

  // 🎞️ Auto slideshow
  useEffect(() => {
    if (showImage) {
      const slideTimer = setInterval(() => {
        setIndex((prev) => (prev + 1) % imageList.length);
      }, 3000);

      return () => clearInterval(slideTimer);
    }
  }, [showImage, imageList.length]);

  return (
    <>
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
            Badhiya kiya  Vanchika 💕
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
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          />
        </motion.div>
      )}
    </AnimatePresence>
    </>
  );
}

export default Home;
