import { motion, useScroll, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import { FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";
import profile from "./assets/deepak.jpeg";
import {AnimatePresence } from "framer-motion";
import { FaBars, FaTimes } from "react-icons/fa";

/* ================= MAIN ================= */

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress);

  return (
    <div className="bg-black text-white overflow-x-hidden">
      <ScrollProgress scaleX={scaleX} />
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Work />
      <Contact />
    </div>
  );
}

 
/* ================= NAVBAR ================= */

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [hidden, setHidden] = useState(false);

  // Hide navbar on scroll down
  useEffect(() => {
    let lastScroll = 0;
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      if (currentScroll > lastScroll && currentScroll > 100) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      lastScroll = currentScroll;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { name: "About", link: "#about" },
    { name: "Skills", link: "#services" },
    { name: "Work", link: "#work" },
    { name: "Contact", link: "#contact" },
  ];

  return (
    <>
      {/* MAIN NAVBAR */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: hidden ? -100 : 0 }}
        transition={{ duration: 0.4 }}
        className="fixed w-full bg-black px-6 md:px-12 py-5 flex justify-between items-center z-50"
      >
        {/* Logo */}
        <h1 className="text-2xl font-extrabold tracking-widest">
          DEEPAK
        </h1>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-10">
          {menuItems.map((item, index) => (
            <motion.a
              key={index}
              href={item.link}
              whileHover={{ y: -2 }}
              className="relative group text-white font-medium"
            >
              {item.name}
              <span className="absolute left-0 -bottom-2 w-0 h-[2px] bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300 group-hover:w-full"></span>
            </motion.a>
          ))}
        </div>

        {/* Mobile Hamburger */}
        <div
          className="md:hidden text-2xl cursor-pointer"
          onClick={() => setIsOpen(true)}
        >
          <FaBars />
        </div>
      </motion.nav>

      {/* MOBILE SIDE DRAWER */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.8 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black z-40"
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.4 }}
              className="fixed top-0 right-0 h-full w-80 bg-black z-50 flex flex-col p-10"
            >
              {/* Close Button */}
              <div className="flex justify-end mb-16">
                <FaTimes
                  className="text-2xl cursor-pointer"
                  onClick={() => setIsOpen(false)}
                />
              </div>

              {/* Menu Items */}
              <div className="flex flex-col space-y-10 text-2xl font-semibold">
                {menuItems.map((item, index) => (
                  <motion.a
                    key={index}
                    href={item.link}
                    onClick={() => setIsOpen(false)}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ x: 10 }}
                    className="relative group"
                  >
                    {item.name}
                    <span className="absolute left-0 -bottom-2 w-0 h-[2px] bg-purple-500 transition-all duration-300 group-hover:w-full"></span>
                  </motion.a>
                ))}
              </div>

           
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}


/* ================= HERO ================= */

function Hero() {
  return (
    <section className="h-screen flex flex-col justify-center items-center text-center relative overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        className="absolute inset-0 w-full h-full object-cover opacity-20"
        src="https://www.w3schools.com/howto/rain.mp4"
      />

      <motion.h1
        initial={{ opacity: 0, y: 80 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-6xl md:text-8xl font-extrabold z-10"
      >
        Deepak Kumar <br />
        <span className="text-purple-500">Video Editor</span>
      </motion.h1>

      <p className="mt-6 text-gray-400 max-w-xl z-10">
        Creative detail-oriented Video Editor & Animator. Passionate about
        creating eye-catching & impactful content.
      </p>

      <a
        href="#work"
        className="mt-8 px-10 py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full font-semibold z-10"
      >
        View My Work
      </a>
    </section>
  );
}

/* ================= ABOUT ================= */

function About() {
  return (
    <section
      id="about"
      className="relative py-32 px-6 md:px-16 bg-black overflow-hidden"
    >
      {/* Background Glow Effects */}
      <div className="absolute -left-40 top-20 w-[400px] h-[400px] bg-purple-600/20 blur-[120px] rounded-full"></div>
      <div className="absolute right-0 bottom-0 w-[400px] h-[400px] bg-pink-600/20 blur-[120px] rounded-full"></div>

      <div className="grid md:grid-cols-2 gap-20 items-center max-w-7xl mx-auto relative z-10">
        
        {/* Profile Image with Floating Animation */}
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="relative"
        >
          <motion.img
            src={profile}
            alt="Deepak Kumar"
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 6, repeat: Infinity }}
            className="rounded-3xl shadow-2xl border border-white/10"
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-purple-500/20 to-transparent"></div>
        </motion.div>

        {/* Text Section */}
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-5xl md:text-6xl font-extrabold mb-8">
            About <span className="text-purple-500">Me</span>
          </h2>

          <p className="text-gray-400 text-lg leading-relaxed mb-8">
            I am a creative and detail-oriented Video Editor & Animator with a
            passion for crafting visually stunning and engaging content.
            Strong time management skills allow me to handle multiple projects
            efficiently while delivering premium-quality output.
          </p>

          {/* Glass Info Card */}
          <div className="bg-white/5 backdrop-blur-xl p-8 rounded-3xl border border-white/10 space-y-4">

  <div className="flex items-center gap-3 text-purple-400">
    <span>📞</span>
    <span className="break-words">+91 6370075592</span>
  </div>

  
  <div className="flex items-start gap-3 text-purple-400">

    {/* Icon */}
    <span className="text-lg shrink-0 mt-1">✉️</span>

    {/* Email Wrapper */}
    <a 
      href="mailto:deepakkumarpanigrahi555@gmail.com"
      className="text-sm sm:text-base leading-relaxed break-normal"
    >
      <span className="block">
        deepakkumarpanigrahi555@gmail
      </span>
      <span className="block">
        .com
      </span>
    </a>

</div>

  <div className="flex items-center gap-3 text-purple-400">
    <span>🌍</span>
    <span>English | Hindi | Odia</span>
  </div>

</div>

          {/* Animated Stats */}
          <div className="grid grid-cols-3 gap-8 mt-10 text-center">
            {[
              { number: "3+", label: "Years Experience" },
              { number: "100+", label: "Projects Completed" },
              { number: "50+", label: "Happy Clients" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2 }}
              >
                <h3 className="text-3xl font-bold text-purple-500">
                  {item.number}
                </h3>
                <p className="text-gray-400 text-sm">{item.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ================= SKILLS ================= */

function Services() {
  const skills = [
    "Faceless Video Editing",
    "AI Powered Editing",
    "Basic Animation",
    "Audio Editing & Post Production",
    "Adobe Premiere Pro",
    "After Effects",
    "DaVinci Resolve",
    "Blender",
  ];

  return (
    <section id="services" className="py-32 px-6 md:px-16 bg-black relative overflow-hidden">
      
      {/* Glow Background */}
      <div className="absolute top-0 left-1/2 w-[500px] h-[500px] bg-purple-600/20 blur-[120px] rounded-full -translate-x-1/2"></div>

      <motion.h2
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-5xl md:text-6xl font-extrabold text-center mb-20"
      >
        Skills & <span className="text-purple-500">Expertise</span>
      </motion.h2>

      <div className="grid md:grid-cols-4 gap-8 max-w-7xl mx-auto">
        {skills.map((skill, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ scale: 1.08 }}
            className="relative bg-white/5 backdrop-blur-xl p-8 rounded-3xl border border-white/10 hover:border-purple-500 transition duration-300"
          >
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 opacity-0 hover:opacity-100 transition"></div>
            <p className="relative z-10 text-lg font-medium">{skill}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}


/* ================= WORK SECTION ================= */

function Work() {
  return (
    <section id="work" className="py-32 px-6 md:px-16 bg-black text-center relative overflow-hidden">

      {/* Background Glow */}
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-pink-600/20 blur-[120px] rounded-full"></div>

      <motion.h2
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-5xl md:text-6xl font-extrabold mb-20"
      >
        Featured <span className="text-purple-500">Work</span>
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        whileHover={{ scale: 1.03 }}
        className="max-w-4xl mx-auto bg-white/5 backdrop-blur-xl p-12 rounded-3xl border border-white/10 hover:border-purple-500 transition"
      >
        <p className="text-gray-400 mb-8 text-lg">
          Watch my latest cinematic edits, faceless videos and creative reels.
        </p>

        <a
          href="https://youtube.com/@deepakkumarpanigrahi555?si=ZYiZcgfVKGZ1eIao"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center space-x-4 px-10 py-4 bg-gradient-to-r from-red-600 to-pink-600 rounded-full font-semibold text-lg shadow-lg hover:shadow-red-500/40 transition"
        >
          <FaYoutube size={22} />
          <span>Explore My YouTube</span>
        </a>
      </motion.div>
    </section>
  );
}


/* ================= CONTACT ================= */

function Contact() {
  const socials = [
    { icon: <FaInstagram />, link: "https://www.instagram.com/panigrahi8358@" },
    { icon: <FaLinkedin />, link: "https://www.linkedin.com/in/deepak-kumar-panigrahi-07a759389?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" },
    { icon: <FaYoutube />, link: "https://youtube.com/@deepakkumarpanigrahi555?si=ZYiZcgfVKGZ1eIao" },
  ];

  return (
    <section id="contact" className="py-32 px-6 md:px-16 bg-black text-center relative overflow-hidden">

      {/* Glow */}
      <div className="absolute left-1/2 top-0 w-[400px] h-[400px] bg-purple-600/20 blur-[120px] rounded-full -translate-x-1/2"></div>

      <motion.h2
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-5xl md:text-6xl font-extrabold mb-16"
      >
        Let’s <span className="text-purple-500">Work Together</span>
      </motion.h2>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="flex justify-center gap-10"
      >
        {socials.map((social, i) => (
          <motion.a
            key={i}
            href={social.link}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.2 }}
            className="w-20 h-20 flex items-center justify-center rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 text-3xl hover:border-purple-500 transition"
          >
            {social.icon}
          </motion.a>
        ))}
      </motion.div>

      <p className="mt-12 text-gray-500">
        Available for Freelance & Full-Time Projects
      </p>
    </section>
  );
}


/* ================= SCROLL PROGRESS ================= */

function ScrollProgress({ scaleX }) {
  return (
    <motion.div
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-pink-500 origin-left z-50"
    />
  );
}
