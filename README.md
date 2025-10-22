# 💸 Bro Reconsider

**Financial regrets made visual** 💀

A stunning, world-class web app that makes you reconsider your spending decisions by showing you what else you could buy instead. Built with React, Framer Motion, and Tailwind CSS.

![React](https://img.shields.io/badge/React-18-61dafb?style=for-the-badge&logo=react)
![Vite](https://img.shields.io/badge/Vite-5-646cff?style=for-the-badge&logo=vite)
![TailwindCSS](https://img.shields.io/badge/Tailwind-3-38bdf8?style=for-the-badge&logo=tailwindcss)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-11-ff0055?style=for-the-badge&logo=framer)

## ✨ Features

### 🎨 World-Class Design
- **Animated Background**: Mesmerizing gradient orbs that float and pulse
- **Premium Glassmorphism**: Beautiful frosted glass effects with backdrop blur
- **Smooth Animations**: Powered by Framer Motion for buttery-smooth 60fps animations
- **Responsive Design**: Looks stunning on all devices from mobile to 4K displays
- **Custom Scrollbar**: Even the scrollbar is beautiful

### 🚀 Interactive Elements
- **Floating Particles**: 30+ animated particles creating a dynamic atmosphere
- **Hover Effects**: Cards lift, glow, and shimmer when you hover
- **Emoji Animations**: Emojis wiggle and rotate for extra personality
- **Confetti Celebration**: 500 pieces of confetti when you get results
- **Keyboard Support**: Press Enter to submit (because we respect power users)

### 💫 User Experience
- **Loading States**: Beautiful animated spinner while fetching data
- **Error Handling**: Graceful error messages with smooth animations
- **Empty States**: Positive feedback when you're actually spending wisely
- **Real-time Validation**: Button only enables when form is complete
- **Smooth Scrolling**: Buttery smooth navigation throughout

### 🎯 Smart Features
- Fetches data from JSONBlob API
- Filters items cheaper than your spending amount
- Sorts by price (cheapest first for maximum guilt)
- Shows exactly how many times you could buy each item
- Beautiful calculation cards with gradient accents

## 🛠️ Tech Stack

- **React 18** - Modern React with Hooks
- **Vite** - Lightning-fast build tool
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Production-ready animation library
- **React Confetti** - Celebration effects

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

## 🎨 Customization

### Update the Data Source
Edit the `DATA_URL` constant in `src/App.jsx`:
```javascript
const DATA_URL = "your-jsonblob-url-here";
```

### Expected Data Format
```json
{
  "items": [
    {
      "emoji": "🍕",
      "title": "Pizza",
      "subtitle": "Delicious pepperoni pizza",
      "price": 500
    }
  ]
}
```

## 🎭 Design Highlights

- **Font Stack**: Inter (primary), JetBrains Mono (code), Playfair Display (display)
- **Color Palette**: Purple, Pink, Blue gradients with dark slate background
- **Animations**: Custom easing curves for natural motion
- **Glass Effect**: Multi-layer backdrop blur with gradient borders
- **Particle System**: Dynamic floating particles with randomized timing

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: 1024px - 1280px
- **Large Desktop**: > 1280px

## 🌟 Performance

- **Lazy Loading**: Code splitting for optimal load times
- **GPU Acceleration**: Transform and opacity animations only
- **Optimized Re-renders**: Smart use of React hooks
- **Smooth 60fps**: All animations run at 60 frames per second

## 🤝 Contributing

Feel free to submit PRs to make this even more amazing!

## 📄 License

MIT License - feel free to use this for your own projects!

## 💰 Credits

Made by a broke genius 💀

---

**Pro tip**: Enter your monthly coffee budget and see what you could've bought instead. Prepare to cry. 😭
