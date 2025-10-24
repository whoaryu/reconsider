import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Confetti from 'react-confetti'
import data from './assets/response.json'
import './App.css'

function App() {
  const [amount, setAmount] = useState('')
  const [activity, setActivity] = useState('')
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [error, setError] = useState('')

  const handleReconsider = async () => {
    if (!amount || !activity) return

    setLoading(true)
    setShowResults(false)
    setError('')

    try {
      const apiData = data

      const filteredResults = apiData.items
        .filter(item => item.price < parseInt(amount))
        .sort((a, b) => a.price - b.price)

      setResults(filteredResults)
      setLoading(false)
      setShowResults(true)
      setShowConfetti(true)
      setTimeout(() => setShowConfetti(false), 3000)
    } catch (error) {
      console.error('Error reading data:', error)
      setError('Oops! Something went wrong. Please try again.')
      setLoading(false)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && amount && activity && !loading) {
      handleReconsider()
    }
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Enhanced Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950"></div>
        <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.3),transparent_50%)]"></div>
        
        {/* Smoother animated orbs */}
        <motion.div 
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
            x: [0, 60, 0],
            y: [0, 40, 0]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute top-3/4 right-1/4 w-80 h-80 bg-pink-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.3, 0.4, 0.3],
            x: [0, -50, 0],
            y: [0, -60, 0]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
        />
        <motion.div 
          className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.2, 0.6, 0.2],
            x: [0, 40, 0],
            y: [0, -50, 0]
          }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        />
        
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=60 height=60 viewBox=0 0 60 60 xmlns=http://www.w3.org/2000/svg%3E%3Cg fill=none fill-rule=evenodd%3E%3Cg fill=%23ffffff fill-opacity=0.03%3E%3Cpath d=M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
        
        {/* Refined floating particles */}
        <div className="absolute inset-0">
          {[...Array(25)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -120, 0],
                x: [0, Math.random() * 60 - 30, 0],
                opacity: [0, 1, 0],
                scale: [0, 2, 0]
              }}
              transition={{
                duration: 5 + Math.random() * 5,
                repeat: Infinity,
                delay: Math.random() * 5,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
      </div>

      {showConfetti && <Confetti numberOfPieces={500} recycle={false} gravity={0.3} />}
      
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-6">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: -80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-12"
        >
          <motion.div
            className="relative inline-block"
            animate={showResults ? { 
              scale: [1, 1.05, 1],
              rotate: [0, -2, 2, -2, 0]
            } : {}}
            transition={{ duration: 1, ease: "easeInOut" }}
          >
            <div className="absolute -inset-6 bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-blue-500/20 rounded-full blur-3xl opacity-70"></div>
            
            <h1 className="relative text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black mb-6 tracking-tighter leading-none">
              <motion.span 
                className="block"
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "linear"
                }}
                style={{
                  backgroundImage: 'linear-gradient(90deg, #f472b6, #a78bfa, #60a5fa, #34d399, #f472b6)',
                  backgroundSize: '200% 100%',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}
              >
                Bro💸 
              </motion.span>
              <motion.span 
                className="block"
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "linear",
                  delay: 0.1
                }}
                style={{
                  backgroundImage: 'linear-gradient(90deg, #f472b6, #a78bfa, #60a5fa, #34d399, #f472b6)',
                  backgroundSize: '200% 100%',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}
              >
                Reconsider
              </motion.span>
            </h1>
          </motion.div>
          
          <motion.p 
            className="text-xl sm:text-2xl md:text-3xl text-white/90 font-light tracking-wide max-w-3xl mx-auto leading-relaxed px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <motion.span
              animate={{ 
                opacity: [1, 0.7, 1],
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              Financial regrets made visual
            </motion.span> 💀
          </motion.p>
        </motion.div>

        {/* Input Form - Refined Size */}
        <motion.div 
          initial={{ opacity: 0, y: 60, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-2xl mb-12"
        >
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-pink-500/30 via-purple-500/30 to-blue-500/30 rounded-2xl blur-xl"></div>
            
            <div className="relative bg-white/[0.03] backdrop-blur-3xl rounded-2xl p-8 border border-white/10 shadow-2xl">
              <div className="space-y-6">
                <div className="space-y-3">
                  <label className="block text-white/90 font-semibold text-lg tracking-wide">
                    I want to spend ₹
                  </label>
                  <motion.div 
                    className="relative"
                    whileFocus={{ scale: 1.01 }}
                  >
                    <input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Enter amount"
                      className="w-full px-6 py-4 rounded-xl bg-white/[0.08] border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-4 focus:ring-purple-400/30 focus:border-purple-400/50 transition-all duration-300 text-lg font-medium backdrop-blur-xl"
                    />
                    <motion.div 
                      className="absolute inset-0 rounded-xl bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-blue-500/10 opacity-0 focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"
                    />
                  </motion.div>
                </div>
                
                <div className="space-y-3">
                  <label className="block text-white/90 font-semibold text-lg tracking-wide">
                    on
                  </label>
                  <motion.div 
                    className="relative"
                    whileFocus={{ scale: 1.01 }}
                  >
                    <input
                      type="text"
                      value={activity}
                      onChange={(e) => setActivity(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Enter activity"
                      className="w-full px-6 py-4 rounded-xl bg-white/[0.08] border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-4 focus:ring-purple-400/30 focus:border-purple-400/50 transition-all duration-300 text-lg font-medium backdrop-blur-xl"
                    />
                    <motion.div 
                      className="absolute inset-0 rounded-xl bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-blue-500/10 opacity-0 focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"
                    />
                  </motion.div>
                </div>

                <motion.button
                  whileHover={{ 
                    scale: 1.02,
                    boxShadow: "0 20px 40px rgba(168, 85, 247, 0.4)"
                  }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleReconsider}
                  disabled={loading || !amount || !activity}
                  className="w-full bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white font-bold py-5 px-8 rounded-xl shadow-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-lg relative overflow-hidden group"
                >
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 opacity-0 group-hover:opacity-100"
                    animate={{
                      backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                    style={{
                      backgroundSize: '200% 200%'
                    }}
                  />
                  
                  <span className="relative z-10 flex items-center justify-center space-x-3">
                    {loading ? (
                      <>
                        <motion.div 
                          className="w-5 h-5 border-3 border-white/30 border-t-white rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                        />
                        <span>Reconsidering...</span>
                      </>
                    ) : (
                      <>
                        <span>Reconsider.</span>
                        <motion.span 
                          className="text-2xl"
                          animate={{ 
                            rotate: [0, -10, 10, -10, 0],
                          }}
                          transition={{ 
                            duration: 0.4,
                            repeat: Infinity,
                            repeatDelay: 2.5
                          }}
                        >
                          💸
                        </motion.span>
                      </>
                    )}
                  </span>
                </motion.button>

                <AnimatePresence>
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: 20, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -20, scale: 0.9 }}
                      className="p-5 bg-red-500/10 border border-red-500/30 rounded-xl backdrop-blur-xl"
                    >
                      <p className="text-red-400 text-center font-semibold">
                        ⚠️ {error}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Results - Refined Cards */}
        <AnimatePresence>
          {showResults && results.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -60 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="w-full max-w-7xl"
            >
              <motion.div 
                className="text-center mb-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white/95 mb-3 tracking-tight px-4">
                  <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
                    Here's what you could've bought instead:
                  </span>
                </h2>
                <motion.p
                  className="text-lg text-white/70 font-light"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  Instead of spending ₹{amount} on <span className="text-purple-400 font-semibold">{activity}</span>
                </motion.p>
              </motion.div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {results.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8, y: 30 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ 
                      duration: 0.6, 
                      delay: index * 0.08,
                      ease: [0.22, 1, 0.36, 1]
                    }}
                    whileHover={{ 
                      scale: 1.05,
                      y: -8,
                      transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] }
                    }}
                    className="relative group"
                  >
                    <motion.div 
                      className="absolute -inset-1 bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-blue-500/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100"
                      transition={{ duration: 0.3 }}
                    />
                    
                    <div className="relative bg-white/[0.05] backdrop-blur-2xl rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 cursor-pointer h-full shadow-xl overflow-hidden">
                      <motion.div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100"
                        style={{
                          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)'
                        }}
                        animate={{
                          x: ['-100%', '100%']
                        }}
                        transition={{
                          duration: 1.2,
                          repeat: Infinity,
                          repeatDelay: 1.5
                        }}
                      />
                      
                      <div className="text-center h-full flex flex-col justify-between space-y-4 relative z-10">
                        <motion.div 
                          className="text-5xl"
                          whileHover={{ 
                            scale: 1.2,
                            rotate: [0, -8, 8, 0]
                          }}
                          transition={{ duration: 0.4 }}
                        >
                          {item.emoji}
                        </motion.div>
                        
                        <div className="space-y-3">
                          <h3 className="text-xl font-bold text-white leading-tight">
                            {item.title}
                          </h3>
                          <p className="text-white/75 text-base leading-relaxed">
                            {item.subtitle}
                          </p>
                        </div>
                        
                        <motion.div 
                          className="bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-blue-500/20 rounded-xl p-4 border border-white/10 backdrop-blur-xl"
                          whileHover={{ scale: 1.03 }}
                          transition={{ duration: 0.2 }}
                        >
                          <p className="text-white font-bold text-lg mb-2">
                            You could buy this <span className="text-xl bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">{Math.floor(parseInt(amount) / item.price)}</span> times! 🔥
                          </p>
                          <p className="text-white/70 text-xs font-mono">
                            {Math.floor(parseInt(amount) / item.price)} × ₹{item.price.toLocaleString()} = ₹{(Math.floor(parseInt(amount) / item.price) * item.price).toLocaleString()}
                          </p>
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* No Results */}
        <AnimatePresence>
          {showResults && results.length === 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="w-full max-w-2xl text-center"
            >
              <motion.div 
                className="bg-white/[0.05] backdrop-blur-2xl rounded-2xl p-10 border border-white/10"
                animate={{
                  boxShadow: [
                    '0 0 20px rgba(168, 85, 247, 0.2)',
                    '0 0 30px rgba(168, 85, 247, 0.3)',
                    '0 0 20px rgba(168, 85, 247, 0.2)'
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <div className="text-6xl mb-5">🎉</div>
                <h3 className="text-2xl font-bold text-white mb-3">
                  Wow! You're living large!
                </h3>
                <p className="text-lg text-white/70">
                  Your ₹{amount} budget for <span className="text-purple-400 font-semibold">{activity}</span> is actually pretty reasonable. 
                  Nothing cheaper to guilt trip you with! 😎
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-16 text-center"
        >
          <p className="text-white/60 text-lg font-light tracking-wide">
            Made by a broke genius 💰💀
          </p>
        </motion.footer>
      </div>
    </div>
  )
}

export default App