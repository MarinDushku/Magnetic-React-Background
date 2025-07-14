// Predefined themes for MagneticParticleBackground

export const themes = {
  // Default blue gradient theme
  cosmic: {
    particles: {
      colors: [
        'rgba(255, 255, 255, 0.8)',
        'rgba(255, 255, 255, 0.8)', 
        'rgba(255, 255, 255, 0.8)',
        'rgba(255, 255, 255, 0.8)'
      ],
      glowIntensity: 2,
    },
    background: {
      gradient: {
        colors: ['#667eea', '#764ba2'],
        direction: '135deg'
      }
    }
  },

  // Dark space theme
  darkSpace: {
    particles: {
      colors: [
        'rgba(100, 200, 255, 0.9)', 
        'rgba(255, 100, 200, 0.8)', 
        'rgba(200, 255, 100, 0.7)',
        'rgba(255, 200, 100, 0.6)'
      ],
      glowIntensity: 3,
    },
    background: {
      gradient: {
        colors: ['#0c0c0c', '#1a1a2e', '#16213e'],
        direction: '45deg'
      }
    }
  },

  // Sunset theme
  sunset: {
    particles: {
      colors: [
        'rgba(255, 207, 84, 0.9)', 
        'rgba(255, 158, 101, 0.8)', 
        'rgba(255, 99, 132, 0.7)',
        'rgba(255, 154, 158, 0.6)'
      ],
      glowIntensity: 2.5,
    },
    background: {
      gradient: {
        colors: ['#ff9a9e', '#fecfef', '#fecfef'],
        direction: '180deg'
      }
    }
  },

  // Ocean theme
  ocean: {
    particles: {
      colors: [
        'rgba(72, 202, 228, 0.8)', 
        'rgba(123, 213, 85, 0.7)', 
        'rgba(255, 255, 255, 0.6)',
        'rgba(100, 181, 246, 0.7)'
      ],
      glowIntensity: 1.5,
    },
    background: {
      gradient: {
        colors: ['#74b9ff', '#0984e3', '#74b9ff'],
        direction: '135deg'
      }
    }
  },

  // Forest theme
  forest: {
    particles: {
      colors: [
        'rgba(163, 230, 53, 0.8)', 
        'rgba(74, 222, 128, 0.7)', 
        'rgba(34, 197, 94, 0.6)',
        'rgba(139, 195, 74, 0.7)'
      ],
      glowIntensity: 2,
    },
    background: {
      gradient: {
        colors: ['#134e5e', '#71b280'],
        direction: '45deg'
      }
    }
  },

  // Neon cyberpunk theme
  cyberpunk: {
    particles: {
      colors: [
        'rgba(255, 0, 255, 0.9)', 
        'rgba(0, 255, 255, 0.8)', 
        'rgba(255, 255, 0, 0.7)',
        'rgba(255, 64, 129, 0.8)'
      ],
      glowIntensity: 4,
    },
    background: {
      gradient: {
        colors: ['#0f0f0f', '#1a0033', '#330066'],
        direction: '135deg'
      }
    },
    physics: {
      magneticStrength: 1.5,
      clickRepelStrength: 300,
    }
  },

  // Minimal white theme
  minimal: {
    particles: {
      colors: [
        'rgba(100, 100, 100, 0.6)',
        'rgba(120, 120, 120, 0.5)',
        'rgba(80, 80, 80, 0.7)',
        'rgba(140, 140, 140, 0.4)'
      ],
      glowIntensity: 0.5,
    },
    background: {
      gradient: {
        colors: ['#f8f9fa', '#e9ecef'],
        direction: '180deg'
      }
    },
    physics: {
      magneticStrength: 0.7,
      naturalFlowSpeed: 0.5,
    }
  },

  // Fire theme
  fire: {
    particles: {
      colors: [
        'rgba(255, 69, 0, 0.9)', 
        'rgba(255, 140, 0, 0.8)', 
        'rgba(255, 215, 0, 0.7)',
        'rgba(255, 87, 34, 0.8)'
      ],
      glowIntensity: 3,
    },
    background: {
      gradient: {
        colors: ['#ff416c', '#ff4b2b'],
        direction: '45deg'
      }
    },
    physics: {
      magneticStrength: 1.3,
      clickRepelStrength: 250,
    }
  },

  // Aurora theme
  aurora: {
    particles: {
      colors: [
        'rgba(64, 224, 208, 0.8)', 
        'rgba(147, 112, 219, 0.7)', 
        'rgba(255, 182, 193, 0.6)',
        'rgba(144, 238, 144, 0.8)'
      ],
      glowIntensity: 2.5,
    },
    background: {
      gradient: {
        colors: ['#0c1445', '#2d1b69', '#0c1445'],
        direction: '45deg'
      }
    }
  }
};

// Performance presets
export const performancePresets = {
  high: {
    particles: {
      count: [20, 30, 40, 50]
    },
    performance: {
      maxFPS: 60
    }
  },
  
  medium: {
    particles: {
      count: [15, 25, 35, 45]
    },
    performance: {
      maxFPS: 30
    }
  },
  
  low: {
    particles: {
      count: [10, 15, 20, 25]
    },
    performance: {
      maxFPS: 24
    },
    effects: {
      particleGlow: false,
      trails: false
    }
  }
};

// Physics presets
export const physicsPresets = {
  gentle: {
    physics: {
      magneticStrength: 0.6,
      magneticRange: 200,
      clickRepelStrength: 150,
      naturalFlowSpeed: 0.7
    }
  },
  
  normal: {
    physics: {
      magneticStrength: 1.0,
      magneticRange: 250,
      clickRepelStrength: 200,
      naturalFlowSpeed: 1.0
    }
  },
  
  intense: {
    physics: {
      magneticStrength: 1.5,
      magneticRange: 300,
      clickRepelStrength: 300,
      naturalFlowSpeed: 1.3
    }
  }
};