import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Confetti from 'react-confetti'
import './App.css'

// Viral-worthy relatable list (Mumbai vibes but universally fun)
const GENERIC_LIST = {
  items: [
    { emoji: "☕", title: "Cutting Chai", subtitle: "The only therapy that works", price: 10 },
    { emoji: "🥟", title: "Vada Pav", subtitle: "Mumbai's answer to fine dining", price: 20 },
    { emoji: "🍲", title: "Plate of Pav Bhaji", subtitle: "Butter? Yes. More butter? Also yes.", price: 80 },
    { emoji: "💦", title: "Gola (Ice Lolly)", subtitle: "Brain freeze worth ₹30", price: 30 },
    { emoji: "🌊", title: "Pani Puri (6 pieces)", subtitle: "Spicy water in a crispy ball. Peak engineering.", price: 30 },
    { emoji: "🍪", title: "Samosa", subtitle: "Triangle of happiness", price: 15 },
    { emoji: "🚂", title: "Local Train Ride", subtitle: "Churchgate to Borivali - An experience™", price: 15 },
    { emoji: "🍿", title: "PVR Samosa", subtitle: "Costs more than your ticket lol", price: 150 },
    { emoji: "🎬", title: "Movie Ticket", subtitle: "Tuesday show because you're smart", price: 200 },
    { emoji: "🍕", title: "Domino's Pizza", subtitle: "30 min or free (they always make it)", price: 400 },
    { emoji: "🍔", title: "McD McAloo Tikki Meal", subtitle: "Childhood in a box", price: 180 },
    { emoji: "🌯", title: "Frankie from That Cart", subtitle: "You know which one", price: 60 },
    { emoji: "🍜", title: "Maggi at 2 AM", subtitle: "From that one tapri near college", price: 40 },
    { emoji: "🥤", title: "Frooti", subtitle: "Mango drink that hit different", price: 20 },
    { emoji: "🚖", title: "Auto Ride", subtitle: "Bandra to Juhu (meter? what meter?)", price: 100 },
    { emoji: "🚕", title: "Ola/Uber", subtitle: "Andheri to BKC without 2x surge", price: 250 },
    { emoji: "📱", title: "Mobile Recharge", subtitle: "1.5GB/day because you doom scroll", price: 299 },
    { emoji: "🎧", title: "Spotify Premium", subtitle: "Skip ads like you skip responsibilities", price: 119 },
    { emoji: "🎮", title: "PlayStation Plus", subtitle: "One month of gaming excuses", price: 499 },
    { emoji: "🍺", title: "Beer at Social", subtitle: "Happy hour is 4-7 btw", price: 200 },
    { emoji: "☕", title: "Starbucks", subtitle: "Overpriced but Instagram-worthy", price: 350 },
    { emoji: "🍦", title: "Naturals Ice Cream", subtitle: "Sitaphal supremacy", price: 120 },
    { emoji: "🌮", title: "Taco Bell Box", subtitle: "7 layers of regret", price: 300 },
    { emoji: "🍛", title: "Unlimited Thali", subtitle: "Eat till you can't move challenge", price: 400 },
    { emoji: "💇", title: "Salon Haircut", subtitle: "Looking fresh for the week", price: 600 },
    { emoji: "👕", title: "Zara Sale T-shirt", subtitle: "Still expensive but 'discounted'", price: 1200 },
    { emoji: "⛽", title: "Petrol (3 Liters)", subtitle: "*cries in 100+ per liter*", price: 330 },
    { emoji: "🏋️", title: "Gym Membership", subtitle: "Will go tomorrow for sure", price: 1500 },
    { emoji: "🎪", title: "Imagica Entry", subtitle: "Worth it for the Nitro ride alone", price: 1500 },
    { emoji: "🎸", title: "Concert Ticket", subtitle: "Back row but vibes are vibing", price: 2000 },
    { emoji: "💸", title: "Swiggy One Month", subtitle: "Free delivery on midnight cravings", price: 149 },
  ]
}

function App() {
  const [screen, setScreen] = useState('landing') // landing, customize, main
  const [listType, setListType] = useState('') // custom, generic
  const [customList, setCustomList] = useState([])
  const [editingList, setEditingList] = useState([{ emoji: "💰", title: "", subtitle: "", price: 100 }])
  
  const [amount, setAmount] = useState('')
  const [activity, setActivity] = useState('')
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [error, setError] = useState('')

  // Load custom list from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('reconsider_custom_list')
    if (saved) {
      try {
        setCustomList(JSON.parse(saved))
      } catch (e) {
        console.error('Failed to load custom list:', e)
      }
    }
  }, [])

  const handleStartCustom = () => {
    // Track GA event
    if (window.gtag) {
      window.gtag('event', 'select_list_type', {
        list_type: 'custom',
        has_existing_list: customList.length > 0
      })
    }
    
    if (customList.length > 0) {
      setListType('custom')
      setScreen('main')
    } else {
      setScreen('customize')
    }
  }

  const handleStartGeneric = () => {
    // Track GA event
    if (window.gtag) {
      window.gtag('event', 'select_list_type', {
        list_type: 'generic'
      })
    }
    
    setListType('generic')
    setScreen('main')
  }

  const handleAddItem = () => {
    // Track GA event
    if (window.gtag) {
      window.gtag('event', 'add_custom_item', {
        current_count: editingList.length
      })
    }
    
    setEditingList([...editingList, { emoji: "💰", title: "", subtitle: "", price: 100 }])
  }

  const handleRemoveItem = (index) => {
    if (editingList.length > 1) {
      setEditingList(editingList.filter((_, i) => i !== index))
    }
  }

  const handleUpdateItem = (index, field, value) => {
    const updated = [...editingList]
    updated[index][field] = value
    setEditingList(updated)
  }

  const handleSaveCustomList = () => {
    const validItems = editingList.filter(item => item.title.trim() && item.price > 0)
    if (validItems.length === 0) {
      setError('Please add at least one valid item!')
      return
    }
    
    // Track GA event
    if (window.gtag) {
      window.gtag('event', 'save_custom_list', {
        item_count: validItems.length,
        avg_price: Math.round(validItems.reduce((sum, item) => sum + item.price, 0) / validItems.length)
      })
    }
    
    localStorage.setItem('reconsider_custom_list', JSON.stringify(validItems))
    setCustomList(validItems)
    setListType('custom')
    setScreen('main')
    setError('')
  }

  const handleResetList = () => {
    if (confirm('Are you sure you want to reset your custom list?')) {
      // Track GA event
      if (window.gtag) {
        window.gtag('event', 'reset_custom_list', {
          items_deleted: customList.length
        })
      }
      
      localStorage.removeItem('reconsider_custom_list')
      setCustomList([])
      setScreen('landing')
    }
  }

  const handleReconsider = async () => {
    if (!amount || !activity) return

    setLoading(true)
    setShowResults(false)
    setError('')

    try {
      // Simulate loading for better UX
      await new Promise(resolve => setTimeout(resolve, 500))
      
      const currentList = listType === 'custom' ? { items: customList } : GENERIC_LIST
      const filteredResults = currentList.items
        .filter(item => item.price < parseInt(amount))
        .sort((a, b) => a.price - b.price)

      // Track GA event
      if (window.gtag) {
        window.gtag('event', 'reconsider_calculation', {
          list_type: listType,
          amount: parseInt(amount),
          activity: activity,
          results_count: filteredResults.length,
          has_results: filteredResults.length > 0
        })
      }

      setResults(filteredResults)
      setLoading(false)
      setShowResults(true)
      setShowConfetti(true)
      setTimeout(() => setShowConfetti(false), 3000)
      
      // Track results view after a delay (user actually sees results)
      setTimeout(() => {
        if (window.gtag && filteredResults.length > 0) {
          window.gtag('event', 'view_results', {
            list_type: listType,
            result_count: filteredResults.length,
            amount_range: parseInt(amount) < 100 ? 'under_100' : 
                         parseInt(amount) < 500 ? '100_500' :
                         parseInt(amount) < 1000 ? '500_1000' : 'over_1000'
          })
        }
      }, 1000)
    } catch (error) {
      console.error('Error processing:', error)
      setError('Oops! Something went wrong. Please try again.')
      setLoading(false)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && amount && activity && !loading) {
      handleReconsider()
    }
  }

  const handleBackToLanding = () => {
    // Track GA event
    if (window.gtag) {
      window.gtag('event', 'back_to_landing', {
        from_screen: screen
      })
    }
    
    setScreen('landing')
    setAmount('')
    setActivity('')
    setResults([])
    setShowResults(false)
    setError('')
  }

  // Landing Screen
  if (screen === 'landing') {
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

        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-6">
          {/* Hero Section */}
          <motion.div 
            initial={{ opacity: 0, y: -80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-16"
          >
            <motion.div
              className="relative inline-block"
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
                  Bro, Reconsider 💸
                </motion.span>
              </h1>
            </motion.div>
            
            <motion.p 
              className="text-xl sm:text-2xl md:text-3xl text-white/90 font-light tracking-wide max-w-3xl mx-auto leading-relaxed px-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              That thing you're about to buy? Yeah, let's talk about it. 💀
            </motion.p>
          </motion.div>

          {/* Options */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="w-full max-w-4xl grid md:grid-cols-2 gap-6 mb-12"
          >
            {/* My Reconsider */}
            <motion.button
              onClick={handleStartCustom}
              whileHover={{ scale: 1.02, y: -5 }}
              whileTap={{ scale: 0.98 }}
              className="relative group"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-pink-500/30 via-purple-500/30 to-blue-500/30 rounded-2xl blur-lg opacity-75 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative bg-white/[0.03] backdrop-blur-3xl rounded-2xl p-10 border border-white/10 hover:border-white/20 transition-all">
                <div className="text-6xl mb-4">✨</div>
                <h3 className="text-2xl font-bold text-white mb-3">My Reconsider</h3>
                <p className="text-white/70 text-base mb-4">
                  {customList.length > 0 
                    ? `Use your custom list (${customList.length} items)`
                    : 'Create your own comparison list'}
                </p>
                <div className="inline-block px-4 py-2 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 rounded-lg text-white text-sm font-semibold">
                  {customList.length > 0 ? 'Start →' : 'Customize →'}
                </div>
              </div>
            </motion.button>

            {/* Explore Generic List */}
            <motion.button
              onClick={handleStartGeneric}
              whileHover={{ scale: 1.02, y: -5 }}
              whileTap={{ scale: 0.98 }}
              className="relative group"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-orange-500/30 via-yellow-500/30 to-pink-500/30 rounded-2xl blur-lg opacity-75 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative bg-white/[0.03] backdrop-blur-3xl rounded-2xl p-10 border border-white/10 hover:border-white/20 transition-all">
                <div className="text-6xl mb-4">🔥</div>
                <h3 className="text-2xl font-bold text-white mb-3">The Usual Stuff</h3>
                <p className="text-white/70 text-base mb-4">
                  Chai, vada pav, auto rides & other things you actually spend on
                </p>
                <div className="inline-block px-4 py-2 bg-gradient-to-r from-orange-500 via-yellow-500 to-pink-500 rounded-lg text-white text-sm font-semibold">
                  Let's Go →
                </div>
              </div>
            </motion.button>
          </motion.div>
        </div>
      </div>
    )
  }

  // Customize Screen
  if (screen === 'customize') {
    return (
      <div className="min-h-screen relative overflow-hidden">
        {/* Enhanced Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950"></div>
          <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.3),transparent_50%)]"></div>
          
          <motion.div 
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-6">
          <motion.div
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h2 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent mb-4">
              Customize Your List
            </h2>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              Add things you actually spend money on. Be honest! 🤑
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-3xl mb-6"
          >
            <div className="bg-white/[0.03] backdrop-blur-3xl rounded-2xl p-6 border border-white/10">
              <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
                {editingList.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="bg-white/[0.05] rounded-xl p-4 border border-white/10"
                  >
                    <div className="grid grid-cols-12 gap-3 items-center">
                      <input
                        type="text"
                        value={item.emoji}
                        onChange={(e) => handleUpdateItem(index, 'emoji', e.target.value)}
                        placeholder="😊"
                        className="col-span-2 text-center text-3xl bg-white/[0.08] border border-white/20 rounded-lg py-2 focus:outline-none focus:ring-2 focus:ring-purple-400/50"
                        maxLength={2}
                      />
                      <input
                        type="text"
                        value={item.title}
                        onChange={(e) => handleUpdateItem(index, 'title', e.target.value)}
                        placeholder="Item name"
                        className="col-span-4 px-3 py-2 bg-white/[0.08] border border-white/20 text-white placeholder-white/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400/50"
                      />
                      <input
                        type="text"
                        value={item.subtitle}
                        onChange={(e) => handleUpdateItem(index, 'subtitle', e.target.value)}
                        placeholder="Description"
                        className="col-span-4 px-3 py-2 bg-white/[0.08] border border-white/20 text-white placeholder-white/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400/50"
                      />
                      <div className="col-span-2 flex items-center gap-2">
                        <span className="text-white/70 text-sm">₹</span>
                        <input
                          type="number"
                          value={item.price}
                          onChange={(e) => handleUpdateItem(index, 'price', parseInt(e.target.value) || 0)}
                          className="w-full px-2 py-2 bg-white/[0.08] border border-white/20 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400/50 text-sm"
                          min="1"
                        />
                      </div>
                      {editingList.length > 1 && (
                        <button
                          onClick={() => handleRemoveItem(index)}
                          className="col-span-12 md:col-span-1 text-red-400 hover:text-red-300 transition-colors text-xl"
                        >
                          🗑️
                        </button>
                      )}
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="5000"
                      value={item.price}
                      onChange={(e) => handleUpdateItem(index, 'price', parseInt(e.target.value))}
                      className="w-full mt-3 accent-purple-500"
                    />
                  </motion.div>
                ))}
              </div>

              <motion.button
                onClick={handleAddItem}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full mt-4 py-3 bg-white/[0.08] hover:bg-white/[0.12] border border-white/20 rounded-xl text-white font-semibold transition-all"
              >
                + Add Another Item
              </motion.button>
            </div>
          </motion.div>

          <div className="flex gap-4 w-full max-w-3xl">
            <motion.button
              onClick={() => setScreen('landing')}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 py-4 bg-white/[0.05] border border-white/20 rounded-xl text-white font-semibold"
            >
              ← Back
            </motion.button>
            <motion.button
              onClick={handleSaveCustomList}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 py-4 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 rounded-xl text-white font-bold shadow-xl"
            >
              Save & Continue →
            </motion.button>
          </div>

          {error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-4 text-red-400 text-center"
            >
              {error}
            </motion.p>
          )}
        </div>
      </div>
    )
  }

  // Main App Screen
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
        {/* Back Button */}
        <motion.button
          onClick={handleBackToLanding}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="fixed top-6 left-6 px-4 py-2 bg-white/[0.05] hover:bg-white/[0.1] backdrop-blur-xl rounded-xl border border-white/10 text-white font-semibold transition-all"
        >
          ← Back
        </motion.button>

        {listType === 'custom' && customList.length > 0 && (
          <motion.button
            onClick={handleResetList}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="fixed top-6 right-6 px-4 py-2 bg-red-500/10 hover:bg-red-500/20 backdrop-blur-xl rounded-xl border border-red-500/30 text-red-400 font-semibold transition-all"
          >
            Reset List 🗑️
          </motion.button>
        )}

        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: -80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-black bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent mb-4">
            {listType === 'custom' ? '✨ Your Reconsider' : '💸 Reconsider'}
          </h1>
          <p className="text-white/70 text-base">
            {listType === 'custom' ? `Using your custom list (${customList.length} items)` : 'What else could you buy? (spoiler: a LOT)'}
          </p>
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
                    bruh... you could've bought:
                  </span>
                </h2>
                <motion.p
                  className="text-lg text-white/70 font-light"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  instead of ₹{amount} on <span className="text-purple-400 font-semibold">{activity}</span> 😭
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
                <div className="text-6xl mb-5">👑</div>
                <h3 className="text-2xl font-bold text-white mb-3">
                  Okay fine, you win this time
                </h3>
                <p className="text-lg text-white/70">
                  ₹{amount} on <span className="text-purple-400 font-semibold">{activity}</span>? That's actually reasonable. 
                  We tried finding cheaper stuff to guilt-trip you but... nope. Go ahead, king/queen. 👑
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
            className="mt-16 text-center space-y-2"
          >
            <p className="text-white/60 text-lg font-light tracking-wide">
              made with ❤️ and questionable life choices
            </p>
            <motion.button
              onClick={() => {
                // Track GA event
                if (window.gtag) {
                  window.gtag('event', 'share', {
                    method: 'web_share_api',
                    content_type: 'app_share'
                  })
                }
                
                if (navigator.share) {
                  navigator.share({
                    title: 'Reconsider - See what you could\'ve bought',
                    text: 'This app just roasted my spending habits 😭',
                    url: 'https://reconsider.vercel.app/',
                  }).catch(() => {
                    // User cancelled, no action needed
                  })
                } else {
                  // Fallback: copy to clipboard
                  navigator.clipboard.writeText('https://reconsider.vercel.app/')
                  alert('Link copied to clipboard! 📋')
                }
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block px-6 py-2 bg-white/[0.05] hover:bg-white/[0.1] border border-white/20 rounded-full text-white/80 text-sm transition-all"
            >
              Share this with friends who need it 😏
            </motion.button>
          </motion.footer>
      </div>
    </div>
  )
}

export default App