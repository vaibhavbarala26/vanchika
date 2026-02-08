import { useState , useRef, use } from 'react'
import reactLogo from './assets/react.svg'
import { useNavigate } from 'react-router'
import viteLogo from '/vite.svg'
import img from "./h4.gif"
import sanjihappy from "./h7.gif"
import sanjisad from "./h8.gif"
import './App.css'
import { motion, useInView } from "framer-motion";
function App() {
  const [issad , setisSad] = useState(false);
const hearts = Array.from({ length: 20 });
const noBtnRef = useRef(null);
const navigate = useNavigate()
const [accepted , setaccepted] = useState(false)
const dodge = () => {
  const btn = noBtnRef.current;
  if (!btn) return;
  setisSad(true);
  const x = Math.random() * 160;
  const y = Math.random() * 100;

  btn.style.pointerEvents = "none";
  btn.style.transform = `translate(${x}px, ${y}px)`;

  setTimeout(() => {
    btn.style.pointerEvents = "auto";
    setisSad(false)
  }, 600);
};

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const text = isInView ? "Hello, Vanchika!" : "";
  const text2 = isInView ? "Will you be my valentine?":""
  return (
    <>
      <div className='bg-[#F8C8DC] w-full h-screen flex flex-col items-center justify-center gap-4'>
        <div className='flex flex-row'>
          <h1 className='text-4xl text-[#4A2C2A]' ref={ref}>
            {
              text.split("").map((char, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {char}
                </motion.span>
              ))
            }
          </h1>
          <motion.img
          src={img}
            alt="love"
            className='w-12 h-12'
            initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: text.length * 0.1 + 2, duration: 1 }}
      />
       <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {hearts.map((_, i) => {
        const startX = Math.random() * 90 + 5; // 5% → 95%

        return (
          <motion.span
            key={i}
            className="absolute"
            style={{
              left: `${startX}%`,
              fontSize: `${14 + Math.random() * 20}px`,
              color: "#E63973",
            }}
            initial={{
              opacity: 0,
              y: "100%",
            }}
            animate={{
              opacity: [0, 1, 1, 0],
              y: "-10%",
              x: `${Math.random() * 30 - 15}px`, // small sideways drift
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
        );
      })}
    </div>

        </div>
        <div className='bg-white w-96 h-96 rounded-full flex items-center justify-center'>
          <div className='flex flex-col items-center justify-center gap-4'>
            <h2 className='text-2xl text-[#4A2C2A]'>
              {text2.split('').map((letter, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.2, delay: index * 0.1 }}
        >
          {letter}
        </motion.span>
      ))}
            </h2>
            <motion.img
          src={!issad ? sanjihappy : sanjisad}
            alt="love"
            className='w-24 h-24'
            initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: text.length * 0.1 + 2, duration: 1 }}
      />
      <div className="mt-6 grid grid-cols-2 gap-8 w-full max-w-sm relative">
  
  {/* YES SLOT */}
  <div className="flex justify-center">
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="bg-[#E63973] text-white px-6 py-2 rounded-full text-lg shadow-md"
      onClick={()=>{
        (setaccepted(true))
        navigate("/home?accepted=yes")
      }}
    >
      YES 💕
    </motion.button>
  </div>

  {/* NO SLOT */}
  <div className="flex justify-center relative h-12">
    <motion.button
  ref={noBtnRef}
  className="bg-gray-300 text-black px-6 py-2 rounded-full text-lg absolute select-none"
  
  // 🖱 Desktop
  onMouseMove={() => dodge()}
  onMouseEnter={() => dodge()}

  // 📱 Mobile
  onTouchStart={(e) => {
    e.preventDefault();
    dodge();
  }}
  onTouchMove={(e) => {
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
    </>
  )
}

export default App
