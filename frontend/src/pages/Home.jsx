import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Home = () => {
  const navigate = useNavigate();
  const [hoveredCard, setHoveredCard] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Simplified effect to just handle page load
  useEffect(() => {
    // Trigger entrance animation after a short delay
    setTimeout(() => {
      setIsLoaded(true);
    }, 300);
  }, []);

  // Animation variants - simplified
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.2
      }
    }
  };

  const titleVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 90,
        damping: 15
      }
    }
  };

  const itemVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 70,
        damping: 12
      }
    }
  };

  // Reduced number of floating elements
  const generateFloatingElements = (count) => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 15 + 8,
      rotation: Math.random() * 360,
      duration: Math.random() * 8 + 12,
      delay: Math.random() * 2,
      shape: Math.random() > 0.5 ? 'circle' : 'square'
    }));
  };

  // Reduced the floating element count from 15 to 6
  const floatingElements = generateFloatingElements(6);

  // Card data
  const cards = [
    {
      id: 'home-visit',
      title: 'Home Visit',
      description: 'Request permission for a home visit with easy form submission and quick approval process',
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
        />
      ),
      gradientFrom: 'from-indigo-400',
      gradientTo: 'to-indigo-600',
      buttonFrom: 'from-indigo-500',
      buttonTo: 'to-indigo-600',
      route: '/home-form'
    },
    {
      id: 'outing-request',
      title: 'Outing Request',
      description: 'Request permission for an outing with quick approval process and real-time status updates',
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
        />
      ),
      gradientFrom: 'from-purple-400',
      gradientTo: 'to-purple-600',
      buttonFrom: 'from-purple-500',
      buttonTo: 'to-purple-600',
      route: '/outing-form'
    },
    {
      id: 'are-you-in',
      title: 'Are You In?',
      description: 'Mark your entry into the campus and update your status in real-time',
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 13l4 4L19 7"
        />
      ),
      gradientFrom: 'from-green-400',
      gradientTo: 'to-green-600',
      buttonFrom: 'from-green-500',
      buttonTo: 'to-green-600',
      route: '/mark-entry'
    }
  ];

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-4 md:p-6 overflow-hidden">
      {/* Reduced floating decorative elements */}
      {floatingElements.map((element) => {
        let shape;
        if (element.shape === 'circle') {
          shape = <div className="w-full h-full rounded-full bg-gradient-to-br from-indigo-200 to-purple-200 opacity-10" />;
        } else {
          shape = <div className="w-full h-full rounded-md bg-gradient-to-br from-purple-200 to-pink-200 opacity-10" />;
        }

        return (
          <motion.div
            key={element.id}
            className="absolute pointer-events-none"
            style={{
              width: element.size,
              height: element.size,
              left: `${element.x}%`,
              top: `${element.y}%`,
              rotate: element.rotation,
              zIndex: 0
            }}
            animate={{
              y: [0, -15, 0],
              rotate: [element.rotation, element.rotation + 5, element.rotation],
              opacity: [0.2, 0.4, 0.2]
            }}
            transition={{
              duration: element.duration,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
              delay: element.delay
            }}
          >
            {shape}
          </motion.div>
        );
      })}

      {/* Simplified radial gradient background effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0) 70%)',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ duration: 1.5 }}
      />

      {/* Simplified wave background - only one path */}
      <svg
        className="absolute bottom-0 w-full pointer-events-none opacity-20"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
      >
        <motion.path
          d="M0,160L48,165.3C96,171,192,181,288,165.3C384,149,480,107,576,112C672,117,768,171,864,181.3C960,192,1056,160,1152,138.7C1248,117,1344,107,1392,101.3L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          fill="url(#gradient1)"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 0.4 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
        <defs>
          <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#c4b5fd" />
            <stop offset="100%" stopColor="#a5b4fc" />
          </linearGradient>
        </defs>
      </svg>

      {/* Main content */}
      <motion.div
        className="w-full max-w-5xl text-center z-10 mb-8 md:mb-12"
        variants={titleVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Simplified Heading */}
        <motion.div
          className="relative mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="absolute inset-0 blur-lg opacity-40 bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 rounded-full"
            animate={{ 
              scale: [1, 1.03, 1],
            }}
            transition={{ 
              duration: 4,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
          
          <h1 className="relative text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
            Outpass Management System
          </h1>
        </motion.div>
        
        {/* Animated Underline */}
        <motion.div 
          className="h-1 w-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mx-auto mb-6"
          animate={{ width: "180px" }}
          transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
        />

        <motion.p
          className="text-gray-600 mb-8 text-lg md:text-xl mt-4 max-w-2xl mx-auto leading-relaxed px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          Manage your outings and home visits with an elegant and efficient approval system
        </motion.p>
      </motion.div>

      {/* Cards Container - Fixed for better responsiveness */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 z-10 w-full max-w-5xl px-4"
        variants={containerVariants}
        initial="hidden"
        animate={isLoaded ? "visible" : "hidden"}
      >
        {cards.map((card) => (
          <motion.div
            key={card.id}
            className="w-full p-6 bg-white bg-opacity-80 backdrop-blur-sm rounded-xl shadow-lg border border-gray-100 relative overflow-hidden cursor-pointer"
            variants={itemVariants}
            whileHover={{ 
              scale: 1.02, 
              boxShadow: "0 10px 20px rgba(0, 0, 0, 0.08)",
              y: -3
            }}
            onClick={() => navigate(card.route)}
            onHoverStart={() => setHoveredCard(card.id)}
            onHoverEnd={() => setHoveredCard(null)}
          >
            {/* Card Background Effect */}
            <motion.div
              className={`absolute inset-0 bg-gradient-to-br ${card.gradientFrom} ${card.gradientTo} opacity-5 rounded-xl`}
              animate={{ 
                opacity: hoveredCard === card.id ? 0.1 : 0.05,
                scale: hoveredCard === card.id ? 1.05 : 1
              }}
              transition={{ duration: 0.3 }}
            />

            {/* Icon Container */}
            <motion.div
              className={`h-20 w-20 mx-auto mb-5 rounded-full bg-gradient-to-br ${card.gradientFrom} ${card.gradientTo} flex items-center justify-center shadow-md`}
              whileHover={{ rotate: 180 }}
              transition={{ duration: 0.4 }}
            >
              <motion.svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {card.icon}
              </motion.svg>
            </motion.div>

            {/* Card Content */}
            <h2 className="text-xl font-bold text-center mb-3 text-gray-800">
              {card.title}
            </h2>
            <p className="text-center text-gray-600 mb-5 text-sm">
              {card.description}
            </p>
            <motion.button
              className={`w-full py-2.5 rounded-lg bg-gradient-to-r ${card.buttonFrom} ${card.buttonTo} text-white font-medium shadow-md hover:shadow-lg transition-all duration-200`}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Get Started
            </motion.button>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Home;