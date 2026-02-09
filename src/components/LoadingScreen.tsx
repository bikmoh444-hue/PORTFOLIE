import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const PremiumLoadingScreen = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [loadingPhase, setLoadingPhase] = useState(0);

  const loadingMessages = [
    "INITIALIZING SYSTEMS",
    "LOADING ASSETS",
    "PREPARING INTERFACE",
    "ALMOST THERE"
  ];

  useEffect(() => {
    // Progress animation
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 0.8;
      });
    }, 30);

    // Phase changes
    const phaseInterval = setInterval(() => {
      setLoadingPhase((prev) => (prev + 1) % loadingMessages.length);
    }, 1500);

    // Complete loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 6000);

    return () => {
      clearTimeout(timer);
      clearInterval(progressInterval);
      clearInterval(phaseInterval);
    };
  }, []);

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
          style={{
            background: "radial-gradient(circle at 50% 50%, #0f172a 0%, #020617 100%)",
          }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          {/* Animated Background Grid */}
          <div className="absolute inset-0 opacity-20">
            <div 
              className="absolute inset-0"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px)
                `,
                backgroundSize: '50px 50px',
                animation: 'gridMove 20s linear infinite'
              }}
            />
          </div>

          {/* Floating Orbs */}
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full blur-3xl"
              style={{
                width: `${150 + i * 50}px`,
                height: `${150 + i * 50}px`,
                background: i % 2 === 0 
                  ? 'radial-gradient(circle, rgba(59, 130, 246, 0.4) 0%, transparent 70%)'
                  : 'radial-gradient(circle, rgba(139, 92, 246, 0.3) 0%, transparent 70%)',
                left: `${20 + i * 15}%`,
                top: `${10 + i * 12}%`,
              }}
              animate={{
                x: [0, 100, 0],
                y: [0, -100, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 8 + i * 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}

          <div className="relative z-10 flex flex-col items-center gap-12">
            
            {/* Logo with Rotating Rings */}
            <div className="relative">
              {/* Outer Rotating Ring */}
              <motion.div
                className="absolute inset-0 w-56 h-56 rounded-full border-2 border-blue-500/30"
                style={{ borderStyle: 'dashed' }}
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              />
              
              {/* Middle Ring */}
              <motion.div
                className="absolute inset-4 rounded-full border border-purple-500/40"
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              />

              {/* Pulsing Glow */}
              <motion.div
                className="absolute inset-8 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-xl"
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0.8, 0.5]
                }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />

              {/* Logo Container */}
              <motion.div
                className="relative w-56 h-56 flex items-center justify-center"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, type: "spring" }}
              >
                <motion.div
                  className="w-40 h-40 rounded-2xl bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-blue-800/20 flex items-center justify-center shadow-2xl shadow-blue-500/50 backdrop-blur-sm border border-blue-500/30"
                  animate={{ 
                    boxShadow: [
                      "0 0 20px rgba(59, 130, 246, 0.3)",
                      "0 0 40px rgba(139, 92, 246, 0.5)",
                      "0 0 20px rgba(59, 130, 246, 0.3)"
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <img
                    src="https://i.ibb.co/1G4PnVNq/logo-portfolio.png"
                    alt="BIKTA Logo"
                    className="w-32 h-32 object-contain"
                  />
                </motion.div>
              </motion.div>

              {/* Corner Accents */}
              {[0, 90, 180, 270].map((rotation, i) => (
                <motion.div
                  key={i}
                  className="absolute w-8 h-8 border-t-2 border-l-2 border-blue-400"
                  style={{
                    top: rotation === 0 || rotation === 90 ? '-12px' : 'auto',
                    bottom: rotation === 180 || rotation === 270 ? '-12px' : 'auto',
                    left: rotation === 0 || rotation === 270 ? '-12px' : 'auto',
                    right: rotation === 90 || rotation === 180 ? '-12px' : 'auto',
                    transform: `rotate(${rotation}deg)`,
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                />
              ))}
            </div>

            {/* Loading Text with Glitch */}
            <div className="flex flex-col items-center gap-6">
              <motion.div
                className="font-mono text-2xl font-bold tracking-wider"
                key={loadingPhase}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
                  {loadingMessages[loadingPhase]}
                </span>
              </motion.div>

              {/* Animated Dots */}
              <div className="flex gap-2">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
                    animate={{ 
                      scale: [1, 1.5, 1],
                      opacity: [0.5, 1, 0.5]
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      delay: i * 0.2,
                    }}
                  />
                ))}
              </div>

              {/* Progress Percentage */}
              <motion.div
                className="font-mono text-5xl font-bold"
                animate={{ 
                  textShadow: [
                    "0 0 10px rgba(59, 130, 246, 0.5)",
                    "0 0 20px rgba(139, 92, 246, 0.5)",
                    "0 0 10px rgba(59, 130, 246, 0.5)"
                  ]
                }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  {Math.floor(progress)}%
                </span>
              </motion.div>

              {/* Premium Progress Bar */}
              <div className="w-96 relative">
                {/* Background Track */}
                <div className="h-2 rounded-full bg-slate-800 overflow-hidden border border-slate-700">
                  {/* Animated Glow */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/30 to-transparent"
                    animate={{ x: ['-100%', '200%'] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  />
                  
                  {/* Progress Fill */}
                  <motion.div
                    className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-blue-600 relative"
                    style={{ width: `${progress}%` }}
                    initial={{ width: 0 }}
                  >
                    {/* Shine Effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                      animate={{ x: ['-100%', '200%'] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                  </motion.div>
                </div>

                {/* Progress Markers */}
                <div className="flex justify-between mt-2 text-xs font-mono text-slate-500">
                  <span>0%</span>
                  <span>50%</span>
                  <span>100%</span>
                </div>
              </div>

              {/* Status Indicator */}
              <div className="flex items-center gap-3 font-mono text-sm text-slate-400">
                <motion.div
                  className="w-2 h-2 rounded-full bg-green-400"
                  animate={{ 
                    boxShadow: [
                      "0 0 5px rgba(74, 222, 128, 0.5)",
                      "0 0 20px rgba(74, 222, 128, 0.8)",
                      "0 0 5px rgba(74, 222, 128, 0.5)"
                    ]
                  }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
                <span>SYSTEM ONLINE</span>
              </div>
            </div>

          </div>

          <style >{`
            @keyframes gridMove {
              0% { transform: translate(0, 0); }
              100% { transform: translate(50px, 50px); }
            }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PremiumLoadingScreen;