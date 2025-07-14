# 🧲 Magnetic Particle Background - Integration Guide

This guide shows you how to add the magnetic particle background to your website in different ways.

## 🚀 Quick Start Options

### Option 1: React Project (Recommended)

If you're using React, this is the easiest way:

1. **Install the package:**
```bash
npm install magnetic-particle-background
```

2. **Import and use:**
```jsx
import MagneticParticleBackground from 'magnetic-particle-background';

function App() {
  return (
    <div>
      <MagneticParticleBackground config={yourConfig} />
      <div>Your website content here</div>
    </div>
  );
}
```

3. **Use your downloaded config:**
```jsx
// Copy the config from your downloaded file
const config = {
  particles: {
    colors: ['#ff0000', '#00ff00', '#0000ff', '#ffff00'],
    // ... rest of your config
  }
};

<MagneticParticleBackground config={config} />
```

---

### Option 2: Vanilla JavaScript (Any Website)

For non-React websites, we'll provide a standalone JavaScript file:

1. **Download these files:**
   - `magnetic-background.min.js` 
   - `magnetic-background.css`

2. **Add to your HTML:**
```html
<!DOCTYPE html>
<html>
<head>
    <link rel="stylesheet" href="magnetic-background.css">
</head>
<body>
    <!-- Your website content -->
    <div id="content">
        <h1>Your Website</h1>
        <p>Your content goes here</p>
    </div>

    <!-- Add this at the end of body -->
    <script src="magnetic-background.min.js"></script>
    <script>
        // Your downloaded config goes here
        const config = {
            particles: {
                colors: [
                    'rgba(255, 0, 0, 0.8)',
                    'rgba(0, 255, 0, 0.8)', 
                    'rgba(0, 0, 255, 0.8)',
                    'rgba(255, 255, 0, 0.8)'
                ],
                count: [15, 25, 35, 45],
                glowIntensity: 2
            },
            background: {
                gradient: {
                    colors: ['#667eea', '#764ba2'],
                    direction: '135deg'
                }
            },
            logo: {
                enabled: true,
                text: 'BRAND',
                fontSize: 120
            }
            // ... rest of your config
        };

        // Initialize the background
        MagneticBackground.init(config);
    </script>
</body>
</html>
```

---

### Option 3: WordPress/Squarespace/Wix

For website builders:

1. **Upload the files** to your website's file manager
2. **Add this to your header:**
```html
<link rel="stylesheet" href="/path/to/magnetic-background.css">
```

3. **Add this before closing `</body>` tag:**
```html
<script src="/path/to/magnetic-background.min.js"></script>
<script>
    MagneticBackground.init({
        // Your config here
    });
</script>
```

---

## 📁 File Structure

When you download, you'll get:

```
magnetic-background-package/
├── README.md                    # This guide
├── examples/
│   ├── react-example.jsx       # React usage example
│   ├── vanilla-example.html    # Vanilla JS example
│   └── wordpress-example.txt   # WordPress instructions
├── dist/
│   ├── magnetic-background.min.js  # Standalone JavaScript
│   ├── magnetic-background.css     # Required CSS
│   └── magnetic-background.d.ts    # TypeScript definitions
└── your-config.js              # Your customized configuration
```

---

## 🎨 Using Your Custom Configuration

Your downloaded `magnetic-background-config.js` contains your exact settings:

```javascript
// This is what gets downloaded
const config = {
  particles: {
    count: [15, 25, 35, 45],
    colors: [
      'rgba(255, 0, 0, 0.8)',    // Layer 1: Red
      'rgba(0, 255, 0, 0.8)',    // Layer 2: Green  
      'rgba(0, 0, 255, 0.8)',    // Layer 3: Blue (logo)
      'rgba(255, 255, 0, 0.8)'   // Layer 4: Yellow (logo)
    ],
    sizes: [8, 6, 4, 3],
    glowIntensity: 2
  },
  background: {
    gradient: {
      colors: ['#667eea', '#764ba2'],
      direction: '135deg'
    }
  },
  logo: {
    enabled: true,
    text: 'BRAND',
    fontSize: 120,
    fontFamily: 'Arial, sans-serif'
  }
};
```

Just copy this config object and use it in any of the integration methods above!

---

## 🔧 Advanced Customization

### Performance Settings

```javascript
const config = {
  // ... your settings
  performance: {
    maxFPS: 30,        // Lower for better performance
    reducedMotion: true // Respect accessibility preferences
  }
};
```

### Responsive Design

```javascript
// Adjust particle count based on screen size
const isMobile = window.innerWidth < 768;
const config = {
  particles: {
    count: isMobile ? [8, 12, 16, 20] : [15, 25, 35, 45]
  }
};
```

### Multiple Backgrounds

```javascript
// Different backgrounds on different pages
const configs = {
  homepage: { /* config 1 */ },
  about: { /* config 2 */ },
  contact: { /* config 3 */ }
};

const currentPage = window.location.pathname;
MagneticBackground.init(configs[currentPage] || configs.homepage);
```

---

## 🎯 Common Use Cases

### 1. **Logo/Brand Display**
```javascript
const brandConfig = {
  logo: {
    enabled: true,
    text: 'ACME',
    fontSize: 140
  },
  particles: {
    colors: ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4']
  }
};
```

### 2. **Subtle Background Effect**
```javascript
const subtleConfig = {
  particles: {
    colors: ['rgba(0,0,0,0.1)', 'rgba(0,0,0,0.05)', 'rgba(0,0,0,0.08)', 'rgba(0,0,0,0.03)'],
    glowIntensity: 0
  },
  logo: { enabled: false }
};
```

### 3. **High-Energy Landing Page**
```javascript
const energyConfig = {
  particles: {
    colors: ['rgba(255,0,255,0.9)', 'rgba(0,255,255,0.8)', 'rgba(255,255,0,0.9)', 'rgba(255,64,129,0.8)'],
    glowIntensity: 4,
    count: [25, 35, 45, 55]
  }
};
```

---

## 🐛 Troubleshooting

### Background not showing?
- Check browser console for errors
- Ensure CSS file is loaded
- Verify config object is valid JSON

### Performance issues?
- Reduce particle counts
- Lower `maxFPS` setting
- Disable glow effects

### Logo not forming correctly?
- Use only A-Z characters
- Keep text under 10 characters
- Increase font size for better formation

---

## 📞 Support

- 📧 Email: support@magneticbackground.com
- 🐛 Issues: [GitHub Issues](https://github.com/username/magnetic-background/issues)
- 📖 Docs: [Full Documentation](https://magneticbackground.com/docs)

---

**Made with ❤️ for the web community**