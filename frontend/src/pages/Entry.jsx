import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useAnimation } from 'framer-motion';

const Entry = () => {
  const navigate = useNavigate();
  const controls = useAnimation();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    const sequence = async () => {
      await controls.start('visible');
      setIsLoaded(true);
    };
    sequence();

    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [controls]);

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.3 } },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100, damping: 15 } },
  };

  const floatingVariants = {
    animate: { y: [-5, 5, -5], transition: { duration: 3, repeat: Infinity, ease: 'easeInOut' } },
  };

  const generateParticles = (count) =>
    Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 8 + 3,
      duration: Math.random() * 10 + 5,
    }));

  const particles = generateParticles(15);

  const features = [
    {
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      ),
      title: "Quick Processing",
      desc: "Get your outpass approved within minutes",
      color: "indigo",
    },
    {
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      ),
      title: "Easy Tracking",
      desc: "Track your outpass status in real-time",
      color: "purple",
    },
    {
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      ),
      title: "Secure System",
      desc: "Authenticated and authorized access only",
      color: "blue",
    },
  ];

  const calculateParallax = (factor = 1) => {
    const x = (mousePosition.x - window.innerWidth / 2) / factor;
    const y = (mousePosition.y - window.innerHeight / 2) / factor;
    return { x, y };
  };

  return (
    <div className="relative overflow-hidden flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-indigo-900 to-black text-white font-poppins">
      {/* Background Gradient */}
      <motion.div
        className="absolute inset-0 opacity-20"
        style={{ background: 'radial-gradient(circle at center, rgba(99, 102, 241, 0.5) 0%, transparent 70%)' }}
        animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Particles */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full bg-indigo-200 bg-opacity-20"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            animation: `float ${particle.duration}s infinite ease-in-out`,
          }}
        />
      ))}

      {/* Geometric Shape */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-24 h-24 border-2 border-indigo-400 border-opacity-20 rounded-full"
        style={{ x: calculateParallax(30).x, y: calculateParallax(30).y }}
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
      />

      {/* Main Content */}
      <motion.div
        className="z-10 text-center p-6 max-w-5xl w-full"
        variants={containerVariants}
        initial="hidden"
        animate={controls}
      >
        {/* Logo */}
        <motion.div className="mb-8 relative" variants={itemVariants} whileHover={{ scale: 1.05 }}>
          <div className="h-24 w-24 mx-auto rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg">
            <motion.svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              animate={{ rotate: 360 }}
              transition={{ duration: 2, ease: 'easeInOut', delay: 0.5 }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </motion.svg>
          </div>
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full bg-indigo-300"
              style={{ top: '50%', left: '50%', transformOrigin: '40px 0px' }}
              animate={{ rotate: 360 / 6 * i + 360, scale: [0, 1, 0], opacity: [0, 1, 0] }}
              transition={{ duration: 2, delay: i * 0.2, repeat: Infinity }}
            />
          ))}
        </motion.div>

        {/* Headline */}
        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 drop-shadow-md tracking-tight"
          variants={itemVariants}
        >
          Outpass Management
        </motion.h1>
        <motion.div
          className="w-20 h-1 bg-indigo-400 rounded-full mx-auto mb-6"
          initial={{ width: 0 }}
          animate={{ width: 80 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
        />

        {/* Subtitle */}
        <motion.p
          className="text-lg md:text-xl text-gray-200 mb-10 max-w-2xl mx-auto"
          variants={itemVariants}
          animate={floatingVariants.animate}
        >
          Streamline your outpass requests with ease and efficiency.
        </motion.p>

        {/* Features Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full"
          variants={containerVariants}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className={`p-5 rounded-lg bg-gray-800 bg-opacity-70 backdrop-blur-md border border-gray-700 shadow-md hover:bg-opacity-90 transition-all`}
              variants={itemVariants}
              whileHover={{ scale: 1.03, y: -5 }}
            >
              <div className="w-10 h-10 mx-auto mb-3 rounded-full bg-white flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-5 w-5 text-${feature.color}-600`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {feature.icon}
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-gray-300 text-sm">{feature.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Get Started Button - Bold and Animated */}
        <motion.button
          className="mt-12 px-8 py-4 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300"
          variants={itemVariants}
          whileHover={{ scale: 1.1, y: -5, boxShadow: '0 0 20px rgba(139, 92, 246, 0.8)' }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/entry')}
          aria-label="Get Started with Outpass Management"
        >
          Get Started
        </motion.button>
      </motion.div>

      {/* Floating Text */}
      <motion.div
        className="absolute bottom-4 text-sm text-gray-400"
        animate={{ y: [0, -5, 0], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      >
        Scroll down to explore more
      </motion.div>
    </div>
  );
};

export default Entry;

// CSS for Particles
const styles = `
  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-15px); }
  }
  .font-poppins {
    font-family: 'Poppins', sans-serif;
  }
`;
const styleSheet = document.createElement('style');
styleSheet.textContent = styles;
document.head.appendChild(styleSheet);