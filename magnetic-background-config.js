import MagneticParticleBackground from 'magnetic-particle-background';

const config = {
  "particles": {
    "count": [
      15,
      25,
      57,
      76
    ],
    "colors": [
      "rgba(181, 64, 64, 0.8)",
      "rgba(113, 79, 156, 0.8)",
      "rgba(45, 174, 131, 0.8)",
      "rgba(192, 195, 34, 0.8)"
    ],
    "sizes": [
      8,
      6,
      4,
      3
    ],
    "glowIntensity": 2
  },
  "background": {
    "gradient": {
      "colors": [
        "#667eea",
        "#764ba2"
      ],
      "direction": "135deg"
    },
    "opacity": 1
  },
  "physics": {
    "magneticStrength": 1,
    "magneticRange": 250,
    "chainDistance": 120,
    "velocityImpact": 0.4,
    "clickRepelStrength": 200,
    "naturalFlowSpeed": 1
  },
  "effects": {
    "ripples": true,
    "trails": true,
    "particleGlow": true,
    "smoothTransitions": true
  },
  "performance": {
    "maxFPS": 60,
    "reducedMotion": false
  },
  "logo": {
    "enabled": true,
    "text": "LOGO",
    "fontSize": 130,
    "fontFamily": "'Times New Roman', serif",
    "fontWeight": "bold"
  }
};

function App() {
  return (
    <div>
      <MagneticParticleBackground config={config} />
      <div>Your content here</div>
    </div>
  );
}