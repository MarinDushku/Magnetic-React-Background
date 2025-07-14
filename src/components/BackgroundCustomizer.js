import React, { useState, useEffect } from 'react';
import MagneticParticleBackground from './MagneticParticleBackground';
import { themes, performancePresets, physicsPresets } from '../themes/presets';

const BackgroundCustomizer = () => {
  const [customConfig, setCustomConfig] = useState({
    particles: {
      count: [15, 25, 35, 45],
      colors: [
        'rgba(255, 255, 255, 0.8)',
        'rgba(255, 255, 255, 0.8)',
        'rgba(255, 255, 255, 0.8)',
        'rgba(255, 255, 255, 0.8)'
      ],
      sizes: [8, 6, 4, 3],
      glowIntensity: 2,
    },
    background: {
      gradient: {
        colors: ['#667eea', '#764ba2'],
        direction: '135deg'
      },
      opacity: 1
    },
    physics: {
      magneticStrength: 1.0,
      magneticRange: 250,
      chainDistance: 120,
      velocityImpact: 0.4,
      clickRepelStrength: 200,
      naturalFlowSpeed: 1.0,
    },
    effects: {
      ripples: true,
      trails: true,
      particleGlow: true,
      smoothTransitions: true,
    },
    performance: {
      maxFPS: 60,
      reducedMotion: false,
    },
    logo: {
      enabled: false,
      text: 'LOGO',
      fontSize: 120,
      fontFamily: 'Arial, sans-serif',
      fontWeight: 'bold'
    }
  });

  const [selectedTheme, setSelectedTheme] = useState('custom');
  const [showCode, setShowCode] = useState(false);

  const updateConfig = (section, key, value) => {
    setCustomConfig(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value
      }
    }));
    setSelectedTheme('custom');
  };

  const updateNestedConfig = (section, subsection, key, value) => {
    setCustomConfig(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [subsection]: {
          ...prev[section][subsection],
          [key]: value
        }
      }
    }));
    setSelectedTheme('custom');
  };

  const applyTheme = (themeName) => {
    if (themeName === 'custom') return;
    
    setCustomConfig(prev => ({
      ...prev,
      ...themes[themeName]
    }));
    setSelectedTheme(themeName);
  };

  const generateCodeString = () => {
    return `import MagneticParticleBackground from 'magnetic-particle-background';

const config = ${JSON.stringify(customConfig, null, 2)};

function App() {
  return (
    <div>
      <MagneticParticleBackground config={config} />
      <div>Your content here</div>
    </div>
  );
}`;
  };

  const downloadConfig = () => {
    const configString = generateCodeString();
    const instructionsString = `
/*
🧲 MAGNETIC PARTICLE BACKGROUND - INSTALLATION GUIDE

1. FOR REACT PROJECTS:
   - Install: npm install magnetic-particle-background
   - Use the code below in your React component

2. FOR ANY WEBSITE (HTML/JavaScript):
   - Download magnetic-background.js and magnetic-background.css from our website
   - Add to your HTML:
     <link rel="stylesheet" href="magnetic-background.css">
     <script src="magnetic-background.js"></script>
   - Use: MagneticBackground.init(config);

3. FOR WORDPRESS/SQUARESPACE/WIX:
   - Upload the files to your media library
   - Add the CSS link to your header
   - Add the JS script before </body> with your config

📖 Full documentation: https://magneticbackground.com/docs
💬 Support: https://magneticbackground.com/support

Generated configuration:
*/

${configString}

/*
FOR VANILLA JAVASCRIPT WEBSITES:
Replace the React code above with this:

<script>
const config = ${JSON.stringify(customConfig, null, 2)};
MagneticBackground.init(config);
</script>
*/`;

    const blob = new Blob([instructionsString], { type: 'text/javascript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'magnetic-background-config.js';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      {/* Live Preview */}
      <div style={{ 
        flex: 1, 
        position: 'relative',
        background: `linear-gradient(${customConfig.background?.gradient?.direction || '135deg'}, ${(customConfig.background?.gradient?.colors || ['#667eea', '#764ba2']).join(', ')})`,
        overflow: 'hidden'
      }}>
        <MagneticParticleBackground config={customConfig} />
        
      </div>

      {/* Customization Panel */}
      <div style={{
        width: '400px',
        background: '#1a1a1a',
        color: 'white',
        overflowY: 'auto',
        padding: '20px',
        borderLeft: '1px solid #333'
      }}>
        <div style={{ marginBottom: '20px' }}>
          <h2 style={{ marginBottom: '15px', color: '#fff' }}>Customize Background</h2>
          
          {/* Theme Presets */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
              Theme Presets:
            </label>
            <select 
              value={selectedTheme} 
              onChange={(e) => applyTheme(e.target.value)}
              style={{ 
                width: '100%', 
                padding: '8px', 
                background: '#333', 
                color: 'white', 
                border: '1px solid #555',
                borderRadius: '4px'
              }}
            >
              <option value="custom">Custom</option>
              {Object.keys(themes).map(theme => (
                <option key={theme} value={theme}>
                  {theme.charAt(0).toUpperCase() + theme.slice(1)}
                </option>
              ))}
            </select>
          </div>

          {/* Background Colors */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
              Background Colors:
            </label>
            <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
              <input
                type="color"
                value={customConfig.background?.gradient?.colors?.[0] || '#667eea'}
                onChange={(e) => updateNestedConfig('background', 'gradient', 'colors', [e.target.value, customConfig.background?.gradient?.colors?.[1] || '#764ba2'])}
                style={{ width: '50px', height: '30px' }}
              />
              <input
                type="color"
                value={customConfig.background?.gradient?.colors?.[1] || '#764ba2'}
                onChange={(e) => updateNestedConfig('background', 'gradient', 'colors', [customConfig.background?.gradient?.colors?.[0] || '#667eea', e.target.value])}
                style={{ width: '50px', height: '30px' }}
              />
            </div>
            <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px' }}>
              Gradient Direction:
            </label>
            <select
              value={customConfig.background?.gradient?.direction || '135deg'}
              onChange={(e) => updateNestedConfig('background', 'gradient', 'direction', e.target.value)}
              style={{ 
                width: '100%', 
                padding: '5px', 
                background: '#333', 
                color: 'white', 
                border: '1px solid #555',
                borderRadius: '4px'
              }}
            >
              <option value="45deg">45° (Diagonal)</option>
              <option value="90deg">90° (Vertical)</option>
              <option value="135deg">135° (Diagonal)</option>
              <option value="180deg">180° (Horizontal)</option>
            </select>
          </div>

          {/* Particle Settings */}
          <div style={{ marginBottom: '20px' }}>
            <h3 style={{ marginBottom: '10px', color: '#fff' }}>Particles</h3>
            
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: 'bold' }}>
              Layer Colors:
            </label>
            
            {/* Layer Color Controls */}
            {[1, 2, 3, 4].map((layerNum, index) => {
              const currentColor = customConfig.particles?.colors?.[index] || 'rgba(255, 255, 255, 0.8)';
              const rgba = currentColor.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
              const hexColor = rgba ? 
                '#' + [rgba[1], rgba[2], rgba[3]].map(x => parseInt(x).toString(16).padStart(2, '0')).join('') 
                : '#ffffff';
              
              return (
                <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                  <label style={{ 
                    minWidth: '80px', 
                    fontSize: '13px', 
                    color: customConfig.logo?.enabled && (index === 2 || index === 3) ? '#4CAF50' : '#ccc'
                  }}>
                    Layer {layerNum}:
                    {customConfig.logo?.enabled && (index === 2 || index === 3) && (
                      <span style={{ fontSize: '11px', fontStyle: 'italic' }}> (logo)</span>
                    )}
                  </label>
                  <input
                    type="color"
                    value={hexColor}
                    onChange={(e) => {
                      const hex = e.target.value;
                      const r = parseInt(hex.slice(1, 3), 16);
                      const g = parseInt(hex.slice(3, 5), 16);
                      const b = parseInt(hex.slice(5, 7), 16);
                      
                      const newColors = [...(customConfig.particles?.colors || [
                        'rgba(255, 255, 255, 0.8)',
                        'rgba(255, 255, 255, 0.8)',
                        'rgba(255, 255, 255, 0.8)',
                        'rgba(255, 255, 255, 0.8)'
                      ])];
                      newColors[index] = `rgba(${r}, ${g}, ${b}, 0.8)`;
                      updateConfig('particles', 'colors', newColors);
                    }}
                    style={{ width: '35px', height: '25px', marginLeft: '10px', cursor: 'pointer' }}
                  />
                </div>
              );
            })}

            <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px' }}>
              Glow Intensity: {customConfig.particles?.glowIntensity || 2}
            </label>
            <input
              type="range"
              min="0"
              max="5"
              step="0.1"
              value={customConfig.particles?.glowIntensity || 2}
              onChange={(e) => updateConfig('particles', 'glowIntensity', parseFloat(e.target.value))}
              style={{ width: '100%', marginBottom: '10px' }}
            />

            <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px' }}>
              Particle Count (per layer):
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5px' }}>
              {(customConfig.particles.count || [15, 25, 35, 45]).map((count, index) => (
                <input
                  key={index}
                  type="number"
                  min="5"
                  max="100"
                  value={count || 15}
                  onChange={(e) => {
                    const newCounts = [...(customConfig.particles.count || [15, 25, 35, 45])];
                    newCounts[index] = parseInt(e.target.value) || 15;
                    updateConfig('particles', 'count', newCounts);
                  }}
                  style={{ 
                    padding: '5px', 
                    background: '#333', 
                    color: 'white', 
                    border: '1px solid #555',
                    borderRadius: '4px'
                  }}
                />
              ))}
            </div>
          </div>

          {/* Logo Mode */}
          <div style={{ marginBottom: '20px' }}>
            <h3 style={{ marginBottom: '10px', color: '#fff' }}>Logo Mode</h3>
            
            <label style={{ display: 'block', marginBottom: '12px', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={customConfig.logo?.enabled || false}
                onChange={(e) => updateConfig('logo', 'enabled', e.target.checked)}
                style={{ marginRight: '8px' }}
              />
              Enable Logo Mode
            </label>

            {customConfig.logo?.enabled && (
              <>
                <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px' }}>
                  Logo Text:
                </label>
                <input
                  type="text"
                  value={customConfig.logo?.text || 'LOGO'}
                  onChange={(e) => updateConfig('logo', 'text', e.target.value.toUpperCase())}
                  placeholder="Enter your text"
                  maxLength="10"
                  style={{
                    width: '100%',
                    padding: '8px',
                    background: '#333',
                    color: 'white',
                    border: '1px solid #555',
                    borderRadius: '4px',
                    marginBottom: '10px'
                  }}
                />

                <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px' }}>
                  Font Size: {customConfig.logo?.fontSize || 120}px
                </label>
                <input
                  type="range"
                  min="60"
                  max="200"
                  step="10"
                  value={customConfig.logo?.fontSize || 120}
                  onChange={(e) => updateConfig('logo', 'fontSize', parseInt(e.target.value))}
                  style={{ width: '100%', marginBottom: '10px' }}
                />

                <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px' }}>
                  Font Style:
                </label>
                <select
                  value={customConfig.logo?.fontFamily || 'Arial, sans-serif'}
                  onChange={(e) => updateConfig('logo', 'fontFamily', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '5px',
                    background: '#333',
                    color: 'white',
                    border: '1px solid #555',
                    borderRadius: '4px',
                    marginBottom: '10px'
                  }}
                >
                  <option value="Arial, sans-serif">Arial</option>
                  <option value="'Times New Roman', serif">Times New Roman</option>
                  <option value="'Courier New', monospace">Courier New</option>
                  <option value="Impact, sans-serif">Impact</option>
                  <option value="'Comic Sans MS', cursive">Comic Sans</option>
                </select>

                <div style={{ 
                  fontSize: '12px', 
                  color: '#888', 
                  fontStyle: 'italic',
                  lineHeight: '1.4'
                }}>
                  In logo mode, layers 3 & 4 will form your text while layers 1 & 2 stay free-flowing. Text particles return to position when not magnetized.
                </div>
              </>
            )}
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <button
              onClick={() => setShowCode(!showCode)}
              style={{
                padding: '12px',
                background: '#007acc',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: 'bold'
              }}
            >
              {showCode ? 'Hide Code' : 'Show Code'}
            </button>
            
            <button
              onClick={downloadConfig}
              style={{
                padding: '12px',
                background: '#28a745',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: 'bold'
              }}
            >
              Download Config
            </button>
          </div>

          {/* Code Display */}
          {showCode && (
            <div style={{ 
              marginTop: '20px', 
              padding: '15px', 
              background: '#000', 
              borderRadius: '6px',
              border: '1px solid #333'
            }}>
              <h4 style={{ marginBottom: '10px', color: '#fff' }}>Generated Code:</h4>
              <pre style={{ 
                fontSize: '11px', 
                overflow: 'auto', 
                maxHeight: '300px',
                margin: 0,
                color: '#a0a0a0',
                lineHeight: '1.4'
              }}>
                {generateCodeString()}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BackgroundCustomizer;