# Bro, Reconsider 💸

**That thing you're about to buy? Yeah, let's talk about it.** 💀

A viral-worthy web app that makes you reconsider your spending by showing what else you could buy. Custom lists + relatable comparisons = financial reality check.

![React](https://img.shields.io/badge/React-18-61dafb?style=for-the-badge&logo=react)
![Vite](https://img.shields.io/badge/Vite-5-646cff?style=for-the-badge&logo=vite)
![TailwindCSS](https://img.shields.io/badge/Tailwind-3-38bdf8?style=for-the-badge&logo=tailwindcss)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-11-ff0055?style=for-the-badge&logo=framer)

## ✨ New Features

### 🎯 Two Modes
1. **My Reconsider** ✨ - Create your own custom comparison list
2. **The Usual Stuff** 🔥 - Pre-loaded with relatable everyday comparisons (Mumbai vibes)

### 🎨 Customization
- Create your own items with emoji, name, description, and price
- Use drag slider or direct input for prices
- Saved to browser's local storage (persists across visits)
- Edit or reset your list anytime
- Add unlimited items

### 🔥 The Usual Stuff List
Pre-loaded with 31 relatable (and funny) items:
- ☕ Cutting Chai - "The only therapy that works" (₹10)
- 🍲 Pav Bhaji - "Butter? Yes. More butter? Also yes." (₹80)
- 🌊 Pani Puri - "Spicy water in a crispy ball. Peak engineering." (₹30)
- 🍿 PVR Samosa - "Costs more than your ticket lol" (₹150) 😂
- 🚖 Auto Ride - "Bandra to Juhu (meter? what meter?)" (₹100) 💀
- 🍜 Maggi at 2 AM - "From that one tapri near college" (₹40)
- ⛽ Petrol - "*cries in 100+ per liter*" (₹330)
- And 24 more relatable items!

## 🚀 Features

### 🎨 World-Class Design
- **Animated Background**: Mesmerizing gradient orbs that float and pulse
- **Premium Glassmorphism**: Beautiful frosted glass effects with backdrop blur
- **Smooth Animations**: Powered by Framer Motion for buttery-smooth 60fps animations
- **Responsive Design**: Looks stunning on all devices from mobile to 4K displays
- **Custom Scrollbar**: Even the scrollbar is beautiful

### 🎮 Interactive Elements
- **3 Different Screens**: Landing, Customize, and Main app
- **Floating Particles**: 25+ animated particles creating a dynamic atmosphere
- **Hover Effects**: Cards lift, glow, and shimmer when you hover
- **Confetti Celebration**: 500 pieces of confetti when you get results
- **Keyboard Support**: Press Enter to submit
- **Local Storage**: Your custom list persists across sessions

### 💫 User Experience
- **Landing Page**: Choose between custom or generic list
- **Customization Interface**: Intuitive item editor with drag sliders
- **Loading States**: Beautiful animated spinner
- **Error Handling**: Graceful error messages with smooth animations
- **Empty States**: Positive feedback when you're spending wisely
- **Back Navigation**: Easy navigation between screens
- **Reset Option**: Clear your custom list when needed

### 🎯 Smart Features
- Compares spending against your custom or generic list
- Filters items cheaper than your entered amount
- Sorts by price (cheapest first for maximum guilt)
- Shows exactly how many times you could buy each item
- Beautiful calculation cards with number formatting

## 🛠️ Tech Stack

- **React 18** - Modern React with Hooks
- **Vite** - Lightning-fast build tool
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Production-ready animation library
- **React Confetti** - Celebration effects
- **Local Storage API** - Persist custom lists

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd reconsider
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

## 🎮 How to Use

### First Time User
1. **Choose Your Path**:
   - Click "My Reconsider" ✨ to create your custom list
   - Click "The Usual Stuff" 🔥 to use the pre-made relatable list

2. **If Customizing**:
   - Add items with emoji, name, description, and price
   - Use the slider or type price directly
   - Click "Save & Continue"

3. **Start Reconsidering**:
   - Enter amount you want to spend
   - Enter what you're spending on
   - Press Enter or click "Reconsider"
   - See what else you could've bought!

### Returning User
- Your custom list is automatically loaded
- Click "My Reconsider" → "Start" to use it
- Click "Reset List" in top-right to start over

## 🔥 Viral-Worthy Highlights

The pre-made list includes genuinely funny and relatable items:

- **Pav Bhaji** (₹80) - "Butter? Yes. More butter? Also yes." - The eternal question 😂
- **Pani Puri** (₹30) - "Spicy water in a crispy ball. Peak engineering." - When you think about it... 🌊
- **Maggi at 2 AM** (₹40) - "From that one tapri near college" - Everyone knows which one 🍜
- **Auto Ride** (₹100) - "Bandra to Juhu (meter? what meter?)" - Classic experience 💀
- **Starbucks** (₹350) - "Overpriced but Instagram-worthy" - The real reason we go ☕
- **Gym Membership** (₹1500) - "Will go tomorrow for sure" - We all say this 🏋️

## 🎨 Customization Examples

### College Student List
```
- Hostel Mess Food (₹50)
- Samosa from canteen (₹10)
- College fest entry (₹100)
- Photocopy of notes (₹5)
```

### Office Worker List
```
- Office lunch (₹200)
- Coffee break (₹100)
- Parking fee (₹50)
- Team dinner contribution (₹500)
```

### Foodie List
```
- Street pani puri (₹30)
- Butter chicken (₹400)
- Biryani (₹300)
- Dessert at fancy place (₹250)
```

## 📱 Responsive Breakpoints

- **Mobile**: < 768px - Single column
- **Tablet**: 768px - 1024px - 2 columns
- **Desktop**: 1024px - 1280px - 3 columns
- **Large Desktop**: > 1280px - 4 columns

## 🌟 Performance

- **Local Storage**: Fast data persistence
- **GPU Acceleration**: Transform and opacity animations only
- **Optimized Re-renders**: Smart use of React hooks
- **Smooth 60fps**: All animations run at 60 frames per second
- **No API calls**: Works offline after first load

## 🎯 Data Format

Your custom list is saved in this format:
```json
[
  {
    "emoji": "☕",
    "title": "Chai",
    "subtitle": "Morning fuel",
    "price": 10
  }
]
```

Stored in: `localStorage.getItem('reconsider_custom_list')`

## 🤝 Contributing

Feel free to submit PRs to add more funny items to the Mumbai list or improve features!

## 📄 License

MIT License - feel free to use this for your own projects!

## 💰 Credits

Made with ❤️ and questionable life choices

---

**Pro tip**: Try entering your monthly food delivery budget and prepare for existential crisis. 😭

**Share this**: Your friends need this reality check too. There's a share button in the app - use it! 🔥
