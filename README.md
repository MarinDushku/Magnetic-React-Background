# Magnetic Particle Background

A beautiful, interactive React component that creates magnetic particle animations following your cursor with realistic physics. Perfect for modern websites, portfolios, and creative projects.

## ✨ Features

- **🧲 Magnetic Physics**: Particles form chains and follow your cursor like real magnets
- **🎨 Customizable Themes**: 9 built-in themes + full customization options
- **📝 Logo Mode**: Transform particles into text/logo shapes while maintaining magnetic effects
- **🎛️ Live Customizer**: Built-in visual customizer with real-time preview
- **⚡ Smooth Performance**: Optimized for 60fps with performance presets
- **📱 Responsive**: Works on all screen sizes and devices
- **🎯 Interactive**: Mouse movement, clicks, and off-screen detection
- **🔧 Easy Integration**: Works with React, vanilla JS, and any website builder

## 🚀 Quick Start

### For React Projects

```bash
npm install magnetic-particle-background
```

```jsx
import React from 'react';
import MagneticParticleBackground from 'magnetic-particle-background';

function App() {
  return (
    <div>
      <MagneticParticleBackground />
      <div>Your content here</div>
    </div>
  );
}
```

### For Any Website (HTML/JS)

1. Download `magnetic-background.js` and `magnetic-background.css`
2. Add to your HTML:

```html
<link rel="stylesheet" href="magnetic-background.css">
<script src="magnetic-background.js"></script>
<script>
  MagneticBackground.init({
    particles: {
      colors: ['rgba(255, 255, 255, 0.8)']
    }
  });
</script>
```

### With Theme

```jsx
import MagneticParticleBackground from 'magnetic-particle-background';
import { themes } from 'magnetic-particle-background/themes';

function App() {
  return (
    <div>
      <MagneticParticleBackground config={themes.cyberpunk} />
      <div>Your content here</div>
    </div>
  );
}
```

## 🎨 Built-in Themes

| Theme | Description |
|-------|-------------|
| `cosmic` | Default blue gradient with white particles |
| `darkSpace` | Dark space with colorful glowing particles |
| `sunset` | Warm sunset colors |
| `ocean` | Cool blue and green ocean vibes |
| `forest` | Natural green tones |
| `cyberpunk` | Neon colors with intense effects |
| `minimal` | Clean, subtle design |
| `fire` | Fiery red and orange |
| `aurora` | Northern lights inspired |

## ⚙️ Configuration Options

### Complete Configuration Object

```jsx
const config = {
  // Particle settings
  particles: {
    count: [15, 25, 35, 45], // particles per layer
    colors: [
      'rgba(255, 255, 255, 0.8)', // Layer 1 color
      'rgba(255, 255, 255, 0.8)', // Layer 2 color
      'rgba(255, 255, 255, 0.8)', // Layer 3 color
      'rgba(255, 255, 255, 0.8)'  // Layer 4 color
    ],
    sizes: [8, 6, 4, 3], // particle sizes per layer
    glowIntensity: 2, // glow effect multiplier
  },
  
  // Background settings
  background: {
    gradient: {
      colors: ['#667eea', '#764ba2'],
      direction: '135deg'
    },
    opacity: 1
  },
  
  // Physics settings
  physics: {
    magneticStrength: 1.0, // overall magnetic strength
    magneticRange: 250, // magnetic influence range
    chainDistance: 120, // distance for particle chaining
    velocityImpact: 0.4, // how velocity affects magnetism (0-1)
    clickRepelStrength: 200, // strength of click repulsion
    naturalFlowSpeed: 1.0, // speed of natural particle movement
  },
  
  // Visual effects
  effects: {
    ripples: true, // show click ripples
    trails: true, // mouse trail following
    particleGlow: true, // particle glow effect
    smoothTransitions: true, // smooth movement transitions
  },
  
  // Performance settings
  performance: {
    maxFPS: 60,
    reducedMotion: false, // respect prefers-reduced-motion
  },
  
  // Logo mode (optional)
  logo: {
    enabled: false, // enable logo mode
    text: 'BRAND', // text to display (letters A-Z)
    fontSize: 120, // size of the text
    fontFamily: 'Arial, sans-serif', // font style
    fontWeight: 'bold' // font weight
  }
};

<MagneticParticleBackground config={config} />
```

### Performance Presets

```jsx
import { performancePresets } from 'magnetic-particle-background/themes';

// High performance (60fps, more particles)
<MagneticParticleBackground config={performancePresets.high} />

// Medium performance (30fps, balanced)
<MagneticParticleBackground config={performancePresets.medium} />

// Low performance (24fps, fewer particles, no glow)
<MagneticParticleBackground config={performancePresets.low} />
```

### Physics Presets

```jsx
import { physicsPresets } from 'magnetic-particle-background/themes';

// Gentle magnetism
<MagneticParticleBackground config={physicsPresets.gentle} />

// Normal magnetism (default)
<MagneticParticleBackground config={physicsPresets.normal} />

// Intense magnetism
<MagneticParticleBackground config={physicsPresets.intense} />
```

## 📝 Logo Mode

Transform particles into text shapes while maintaining magnetic interactivity:

```jsx
const logoConfig = {
  logo: {
    enabled: true,
    text: 'HELLO',
    fontSize: 120
  }
};

<MagneticParticleBackground config={logoConfig} />
```

### Logo Mode Features:
- **Text Formation**: Particles in layers 3 & 4 form your text
- **Free Particles**: Layers 1 & 2 remain free-flowing
- **Magnetic Return**: Logo particles return to text when released
- **Interactive**: Mouse still attracts all particles
- **Customizable**: Font size, family, and weight options

## 🎛️ Live Customizer

Use the built-in visual customizer to design your perfect background:

```jsx
import BackgroundCustomizer from 'magnetic-particle-background/customizer';

function CustomizerPage() {
  return <BackgroundCustomizer />;
}
```

### Customizer Features:
- **Real-time Preview**: See changes instantly
- **Theme Presets**: Start with built-in themes
- **Individual Layer Colors**: Customize each particle layer
- **Logo Mode Toggle**: Enable/disable and configure text
- **Code Generation**: Export your configuration
- **Download Config**: Get ready-to-use code for any platform

## 🎮 Interactive Controls

- **Mouse Movement**: Attracts particles in magnetic chains
- **Click**: Creates repulsion waves that push particles away
- **Mouse Off-screen**: Releases all particles to natural flow
- **Fast Movement**: Reduces magnetic strength based on velocity

## 📱 Responsive Design

The component automatically adapts to:
- Different screen sizes
- Device pixel ratios
- Window resizing
- Mobile touch events

## 🔧 Advanced Customization

### Custom Colors

```jsx
const customConfig = {
  particles: {
    colors: [
      'rgba(255, 100, 100, 0.8)', // Red particles
      'rgba(100, 255, 100, 0.7)', // Green particles
      'rgba(100, 100, 255, 0.6)', // Blue particles
    ]
  }
};
```

### Custom Background

```jsx
const customConfig = {
  background: {
    gradient: {
      colors: ['#your-color-1', '#your-color-2', '#your-color-3'],
      direction: '45deg' // or '90deg', '180deg', etc.
    }
  }
};
```

### Multiple Themes

```jsx
import { themes } from 'magnetic-particle-background/themes';

// Combine multiple presets
const customConfig = {
  ...themes.darkSpace,
  ...physicsPresets.intense,
  particles: {
    ...themes.darkSpace.particles,
    glowIntensity: 5 // Override specific values
  }
};
```

## 🚀 Performance Tips

1. **Use performance presets** for different devices
2. **Reduce particle count** on mobile devices
3. **Disable glow effects** for better performance
4. **Lower FPS** for battery-powered devices
5. **Use `reducedMotion: true`** to respect accessibility preferences

## 🎯 Use Cases

- **Website Backgrounds**: Add interactivity to any website
- **Portfolio Sites**: Showcase creativity and technical skills
- **Landing Pages**: Create engaging first impressions
- **Brand Logos**: Interactive logo displays with logo mode
- **Product Launches**: Attention-grabbing promotional pages
- **Agency Websites**: Demonstrate modern web capabilities
- **WordPress/Squarespace**: Easy integration with website builders
- **Presentations**: Dynamic backgrounds for slides
- **Creative Projects**: Art installations and exhibits

## 🛠️ Development

### Local Development

```bash
git clone https://github.com/MarinDushku/Magnetic-React-Background
cd Magnetic-React-Background
npm install
npm start
```

### Building

```bash
npm run build
```

## 📄 License

MIT License - feel free to use in personal and commercial projects.

## 🤝 Contributing

Contributions welcome! 

## 📞 Support

- 🐛 [Report Issues](https://github.com/MarinDushku/Magnetic-React-Background/issues)
- 💬 [Discussions](https://github.com/MarinDushku/Magnetic-React-Background/discussions)

---

Made with ❤️ for the React community
