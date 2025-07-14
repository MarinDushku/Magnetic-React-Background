import React, { useState } from 'react';
import MagneticParticleBackground from '../components/MagneticParticleBackground';
import { themes, performancePresets, physicsPresets } from '../themes/presets';

const Examples = () => {
  const [currentTheme, setCurrentTheme] = useState('cosmic');
  const [currentPerformance, setCurrentPerformance] = useState('medium');
  const [currentPhysics, setCurrentPhysics] = useState('normal');

  // Combine selected presets
  const currentConfig = {
    ...themes[currentTheme],
    ...performancePresets[currentPerformance],
    ...physicsPresets[currentPhysics]
  };

  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      {/* The magnetic particle background */}
      <MagneticParticleBackground config={currentConfig} />
      
      {/* Control panel */}
      <div style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        background: 'rgba(0, 0, 0, 0.8)',
        color: 'white',
        padding: '20px',
        borderRadius: '10px',
        zIndex: 1000,
        minWidth: '250px'
      }}>
        <h3 style={{ marginBottom: '15px' }}>Background Customization</h3>
        
        {/* Theme Selection */}
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Theme:</label>
          <select 
            value={currentTheme} 
            onChange={(e) => setCurrentTheme(e.target.value)}
            style={{ width: '100%', padding: '5px' }}
          >
            {Object.keys(themes).map(theme => (
              <option key={theme} value={theme}>
                {theme.charAt(0).toUpperCase() + theme.slice(1)}
              </option>
            ))}
          </select>
        </div>

        {/* Performance Selection */}
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Performance:</label>
          <select 
            value={currentPerformance} 
            onChange={(e) => setCurrentPerformance(e.target.value)}
            style={{ width: '100%', padding: '5px' }}
          >
            {Object.keys(performancePresets).map(preset => (
              <option key={preset} value={preset}>
                {preset.charAt(0).toUpperCase() + preset.slice(1)}
              </option>
            ))}
          </select>
        </div>

        {/* Physics Selection */}
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Physics:</label>
          <select 
            value={currentPhysics} 
            onChange={(e) => setCurrentPhysics(e.target.value)}
            style={{ width: '100%', padding: '5px' }}
          >
            {Object.keys(physicsPresets).map(preset => (
              <option key={preset} value={preset}>
                {preset.charAt(0).toUpperCase() + preset.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div style={{ fontSize: '12px', opacity: '0.8', lineHeight: '1.4' }}>
          <strong>Controls:</strong><br />
          • Move mouse to attract particles<br />
          • Click to repel particles<br />
          • Move mouse off-screen to release
        </div>
      </div>

      {/* Content overlay */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        padding: '100px 50px',
        textAlign: 'center',
        color: 'white'
      }}>
        <h1 style={{ fontSize: '4rem', marginBottom: '2rem', textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
          Magnetic Particle Background
        </h1>
        <p style={{ fontSize: '1.5rem', maxWidth: '800px', margin: '0 auto', textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}>
          An interactive, customizable background animation featuring magnetic particle chains that follow your cursor with realistic physics.
        </p>
      </div>
    </div>
  );
};

export default Examples;