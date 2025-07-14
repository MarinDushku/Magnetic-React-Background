import React, { useRef, useEffect } from 'react';

const MagneticParticleBackground = ({ config = {} }) => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0, lastX: 0, lastY: 0, velocity: 0, lastTime: Date.now() });
  const mouseTrail = useRef([]);
  const ripplesRef = useRef([]);
  const layers = useRef([]);

  const defaultConfig = {
    particles: {
      count: [15, 25, 35, 45],
      colors: ['rgba(255, 255, 255, 0.8)'],
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
    }
  };

  const finalConfig = {
    ...defaultConfig,
    ...config,
    particles: { ...defaultConfig.particles, ...config.particles },
    background: { ...defaultConfig.background, ...config.background },
    physics: { ...defaultConfig.physics, ...config.physics },
    effects: { ...defaultConfig.effects, ...config.effects },
    performance: { ...defaultConfig.performance, ...config.performance }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    const resizeCanvas = () => {
      const container = canvas.parentElement;
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      initializeLayers();
    };

    const letterPatterns = {
      'A': [
        [0,1],[1,1],[2,1],[3,1],[4,1],
        [0,2],[4,2],
        [0,3],[1,3],[2,3],[3,3],[4,3],
        [0,4],[4,4],
        [0,5],[4,5],
      ],
      'B': [
        [0,1],[0,2],[0,3],[0,4],[0,5],
        [1,1],[2,1],[3,1],
        [1,3],[2,3],
        [1,5],[2,5],[3,5],
        [4,1],[4,2],
        [4,4],[4,5],
      ],
      'C': [
        [1,1],[2,1],[3,1],[4,1],
        [0,2],[0,3],[0,4],
        [1,5],[2,5],[3,5],[4,5],
      ],
      'D': [
        [0,1],[0,2],[0,3],[0,4],[0,5],
        [1,1],[2,1],[3,1],
        [1,5],[2,5],[3,5],
        [4,2],[4,3],[4,4],
      ],
      'E': [
        [0,1],[0,2],[0,3],[0,4],[0,5],
        [1,1],[2,1],[3,1],[4,1],
        [1,3],[2,3],[3,3],
        [1,5],[2,5],[3,5],[4,5],
      ],
      'F': [
        [0,1],[0,2],[0,3],[0,4],[0,5],
        [1,1],[2,1],[3,1],[4,1],
        [1,3],[2,3],[3,3],
      ],
      'G': [
        [1,1],[2,1],[3,1],[4,1],
        [0,2],[0,3],[0,4],
        [1,5],[2,5],[3,5],[4,5],
        [4,3],[4,4],
        [3,3],
      ],
      'H': [
        [0,1],[0,2],[0,3],[0,4],[0,5],
        [4,1],[4,2],[4,3],[4,4],[4,5],
        [1,3],[2,3],[3,3],
      ],
      'I': [
        [1,1],[2,1],[3,1],
        [2,2],[2,3],[2,4],
        [1,5],[2,5],[3,5],
      ],
      'J': [
        [2,1],[3,1],[4,1],
        [3,2],[3,3],[3,4],
        [0,4],[0,5],
        [1,5],[2,5],
      ],
      'K': [
        [0,1],[0,2],[0,3],[0,4],[0,5],
        [4,1],
        [3,2],
        [2,3],
        [3,4],
        [4,5],
      ],
      'L': [
        [0,1],[0,2],[0,3],[0,4],[0,5],
        [1,5],[2,5],[3,5],[4,5],
      ],
      'M': [
        [0,1],[0,2],[0,3],[0,4],[0,5],
        [4,1],[4,2],[4,3],[4,4],[4,5],
        [1,1],[2,2],[3,1],
      ],
      'N': [
        [0,1],[0,2],[0,3],[0,4],[0,5],
        [4,1],[4,2],[4,3],[4,4],[4,5],
        [1,2],[2,3],[3,4],
      ],
      'O': [
        [1,1],[2,1],[3,1],
        [0,2],[0,3],[0,4],
        [4,2],[4,3],[4,4],
        [1,5],[2,5],[3,5],
      ],
      'P': [
        [0,1],[0,2],[0,3],[0,4],[0,5],
        [1,1],[2,1],[3,1],
        [4,1],[4,2],
        [1,3],[2,3],[3,3],
      ],
      'Q': [
        [1,1],[2,1],[3,1],
        [0,2],[0,3],[0,4],
        [4,2],[4,3],[4,4],
        [1,5],[2,5],[3,5],
        [3,4],[4,5],
      ],
      'R': [
        [0,1],[0,2],[0,3],[0,4],[0,5],
        [1,1],[2,1],[3,1],
        [4,1],[4,2],
        [1,3],[2,3],[3,3],
        [4,4],[4,5],
      ],
      'S': [
        [1,1],[2,1],[3,1],[4,1],
        [0,2],
        [1,3],[2,3],[3,3],
        [4,4],
        [0,5],[1,5],[2,5],[3,5],
      ],
      'T': [
        [0,1],[1,1],[2,1],[3,1],[4,1],
        [2,2],[2,3],[2,4],[2,5],
      ],
      'U': [
        [0,1],[0,2],[0,3],[0,4],
        [4,1],[4,2],[4,3],[4,4],
        [1,5],[2,5],[3,5],
      ],
      'V': [
        [0,1],[0,2],[0,3],
        [4,1],[4,2],[4,3],
        [1,4],[3,4],
        [2,5],
      ],
      'W': [
        [0,1],[0,2],[0,3],[0,4],[0,5],
        [4,1],[4,2],[4,3],[4,4],[4,5],
        [2,3],[2,4],
        [1,5],[3,5],
      ],
      'X': [
        [0,1],[4,1],
        [1,2],[3,2],
        [2,3],
        [1,4],[3,4],
        [0,5],[4,5],
      ],
      'Y': [
        [0,1],[0,2],
        [4,1],[4,2],
        [1,3],[3,3],
        [2,3],[2,4],[2,5],
      ],
      'Z': [
        [0,1],[1,1],[2,1],[3,1],[4,1],
        [3,2],
        [2,3],
        [1,4],
        [0,5],[1,5],[2,5],[3,5],[4,5],
      ]
    };

    const generateTextPositions = (text, fontSize) => {
      if (!text || !canvas) return [];
      
      const positions = [];
      const letters = text.split('');
      const letterWidth = fontSize * 0.6; // Width per letter
      const letterHeight = fontSize * 0.8; // Height per letter
      const letterSpacing = fontSize * 0.1; // Space between letters
      const totalWidth = letters.length * letterWidth + (letters.length - 1) * letterSpacing;
      
      // Center the text
      const startX = (canvas.width - totalWidth) / 2;
      const startY = (canvas.height - letterHeight) / 2;
      
      letters.forEach((letter, letterIndex) => {
        const pattern = letterPatterns[letter.toUpperCase()];
        if (pattern) {
          const letterX = startX + letterIndex * (letterWidth + letterSpacing);
          
          pattern.forEach(([col, row]) => {
            const x = letterX + (col * letterWidth / 5);
            const y = startY + (row * letterHeight / 6);
            
            positions.push({ x, y });
          });
        }
      });
      
      console.log(`Generated ${positions.length} fixed positions for text "${text}"`);
      return positions;
    };

    const initializeLayers = () => {
      layers.current = finalConfig.particles.count.map((count, layerIndex) => {
        const particles = [];
        const speed = 0.5 + layerIndex * 0.5;
        const depth = 0.5 + layerIndex * 0.3;
        const pathTypes = ['spiral', 'sine', 'figure8', 'circle'];
        const pathType = pathTypes[layerIndex % pathTypes.length];
        const size = finalConfig.particles.sizes[layerIndex] || 4;
        const opacity = 0.3 + layerIndex * 0.1;

        // Check if this layer should be in logo mode
        const isLogoLayer = finalConfig.logo?.enabled && (layerIndex === 2 || layerIndex === 3);
        let textPositions = [];
        
        if (isLogoLayer && finalConfig.logo?.text) {
          textPositions = generateTextPositions(
            finalConfig.logo.text,
            finalConfig.logo.fontSize || 120
          );
        }

        for (let i = 0; i < count; i++) {
          let baseX, baseY, logoPosition = null;
          
          if (isLogoLayer && textPositions.length > 0) {
            if (i < textPositions.length) {
              logoPosition = textPositions[i];
            } else {
              const positionIndex = i % textPositions.length;
              logoPosition = textPositions[positionIndex];
            }
            baseX = logoPosition.x + (Math.random() - 0.5) * 6;
            baseY = logoPosition.y + (Math.random() - 0.5) * 6;
          } else {
            baseX = Math.random() * canvas.width;
            baseY = Math.random() * canvas.height;
          }

          particles.push({
            id: `${layerIndex}-${i}`,
            baseX: baseX,
            baseY: baseY,
            originalX: baseX,
            originalY: baseY,
            x: 0,
            y: 0,
            phase: (i / count) * Math.PI * 2,
            speed: speed + (Math.random() - 0.5) * 0.3 * finalConfig.physics.naturalFlowSpeed,
            depth: depth,
            pathType: pathType,
            isLogoParticle: isLogoLayer,
            logoPosition: logoPosition,
            style: { 
              opacity: opacity, 
              size: size,
              color: finalConfig.particles.colors[layerIndex % finalConfig.particles.colors.length] || finalConfig.particles.colors[0]
            },
            offsetX: 0,
            offsetY: 0,
            targetOffsetX: 0,
            targetOffsetY: 0,
            magnetized: false,
            magneticStrength: 0
          });
        }
        return particles;
      });
    };

    const updateParticles = (time) => {
      layers.current.forEach(layer => {
        layer.forEach(particle => {
          const particleX = particle.baseX + (particle.offsetX || 0);
          const particleY = particle.baseY + (particle.offsetY || 0);
          
          const mouseOffscreen = mouseRef.current.x < 0 || mouseRef.current.x > canvas.width || 
                                mouseRef.current.y < 0 || mouseRef.current.y > canvas.height;
          
          const mouseDistance = Math.sqrt(
            Math.pow(mouseRef.current.x - particleX, 2) + 
            Math.pow(mouseRef.current.y - particleY, 2)
          );
          
          const maxInfluence = finalConfig.physics.magneticRange;
          const influence = mouseOffscreen ? 0 : Math.max(0, 1 - mouseDistance / maxInfluence);

          let pathX = 0, pathY = 0;
          
          if (particle.isLogoParticle) {
            if (influence < 0.3) {
              particle.targetX = particle.originalX;
              particle.targetY = particle.originalY;
            }
          } else {
            if (influence < 0.3) {
              const t = time * 0.001 * particle.speed;
              
              switch (particle.pathType) {
                case 'spiral':
                  const radius = 50 + Math.sin(t * 0.5) * 20;
                  pathX = Math.cos(t + particle.phase) * radius;
                  pathY = Math.sin(t + particle.phase) * radius;
                  break;
                case 'sine':
                  pathX = Math.sin(t + particle.phase) * 100;
                  pathY = Math.cos(t * 0.5 + particle.phase) * 50;
                  break;
                case 'figure8':
                  pathX = Math.sin(t + particle.phase) * 80;
                  pathY = Math.sin((t + particle.phase) * 2) * 40;
                  break;
                case 'circle':
                  pathX = Math.cos(t + particle.phase) * 60;
                  pathY = Math.sin(t + particle.phase) * 60;
                  break;
                default:
                  pathX = 0;
                  pathY = 0;
              }
              
              const pathInfluence = 1 - influence;
              particle.targetX = particle.baseX + pathX * pathInfluence;
              particle.targetY = particle.baseY + pathY * pathInfluence;
            }
          }
          
          const maxVelocity = 1500;
          const velocityFactor = Math.max(finalConfig.physics.velocityImpact, 1 - (mouseRef.current.velocity / maxVelocity));
          
          // Particle repulsion
          let repulsionX = 0, repulsionY = 0;
          if (!particle.magnetized) {
            layers.current.forEach(otherLayer => {
              otherLayer.forEach(otherParticle => {
                if (otherParticle.id !== particle.id && !otherParticle.magnetized) {
                  const dx = particleX - (otherParticle.baseX + (otherParticle.offsetX || 0));
                  const dy = particleY - (otherParticle.baseY + (otherParticle.offsetY || 0));
                  const distance = Math.sqrt(dx * dx + dy * dy);
                  const minDistance = (particle.style.size + otherParticle.style.size) * 2;
                  
                  if (distance < minDistance && distance > 0) {
                    const repelForce = (minDistance - distance) / minDistance * 10;
                    repulsionX += (dx / distance) * repelForce;
                    repulsionY += (dy / distance) * repelForce;
                  }
                }
              });
            });
          }

          // Magnetic chain logic
          let closestMagnetX = mouseRef.current.x;
          let closestMagnetY = mouseRef.current.y;
          let closestDistance = mouseDistance;
          let magneticStrength = finalConfig.physics.magneticStrength;

          if (finalConfig.effects.trails && !mouseOffscreen) {
            mouseTrail.current.forEach((trailPoint, index) => {
              const trailDistance = Math.sqrt(
                Math.pow(particleX - trailPoint.x, 2) + Math.pow(particleY - trailPoint.y, 2)
              );
              if (trailDistance < closestDistance) {
                closestMagnetX = trailPoint.x;
                closestMagnetY = trailPoint.y;
                closestDistance = trailDistance;
                magneticStrength = finalConfig.physics.magneticStrength * (1.0 - (index / mouseTrail.current.length) * 0.3);
              }
            });
          }

          layers.current.forEach(otherLayer => {
            otherLayer.forEach(otherParticle => {
              if (otherParticle.id !== particle.id && otherParticle.magnetized) {
                const otherX = otherParticle.baseX + (otherParticle.offsetX || 0);
                const otherY = otherParticle.baseY + (otherParticle.offsetY || 0);
                const distanceToOther = Math.sqrt(
                  Math.pow(particleX - otherX, 2) + Math.pow(particleY - otherY, 2)
                );
                
                if (distanceToOther < closestDistance) {
                  closestMagnetX = otherX;
                  closestMagnetY = otherY;
                  closestDistance = distanceToOther;
                  magneticStrength = otherParticle.magneticStrength * 0.7;
                }
              }
            });
          });

          const chainDistance = finalConfig.physics.chainDistance;
          const wasMagnetized = particle.magnetized;
          particle.magnetized = closestDistance < chainDistance && magneticStrength > 0.15;
          particle.magneticStrength = magneticStrength;
          
          if (wasMagnetized && !particle.magnetized) {
            particle.baseX = particle.baseX + (particle.offsetX || 0);
            particle.baseY = particle.baseY + (particle.offsetY || 0);
            particle.offsetX = 0;
            particle.offsetY = 0;
          }
          
          if (particle.magnetized) {
            const angle = Math.atan2(
              closestMagnetY - particleY,
              closestMagnetX - particleX
            );
            
            const baseDistance = particle.style.size * 2.2;
            const layerOffset = particle.depth * 5;
            const idOffset = (parseInt(particle.id.split('-')[1]) % 8) * 3;
            const connectionDistance = baseDistance + layerOffset + idOffset;
            
            particle.targetX = closestMagnetX - Math.cos(angle) * connectionDistance;
            particle.targetY = closestMagnetY - Math.sin(angle) * connectionDistance;
          }

          // Click ripple repulsion
          let clickRepulsionX = 0, clickRepulsionY = 0;
          if (finalConfig.effects.ripples) {
            ripplesRef.current.forEach(ripple => {
              const rippleProgress = (Date.now() - ripple.startTime) / ripple.duration;
              if (rippleProgress < 1) {
                const rippleRadius = ripple.maxRadius * rippleProgress;
                const dx = particleX - ripple.x;
                const dy = particleY - ripple.y;
                const rippleDistance = Math.sqrt(dx * dx + dy * dy);
                
                if (rippleDistance < rippleRadius && rippleDistance > 0) {
                  const repelStrength = (1 - rippleProgress) * finalConfig.physics.clickRepelStrength;
                  clickRepulsionX += (dx / rippleDistance) * repelStrength;
                  clickRepulsionY += (dy / rippleDistance) * repelStrength;
                }
              }
            });
          }

          if (particle.targetX !== undefined) {
            particle.targetX += repulsionX + clickRepulsionX;
            particle.targetY += repulsionY + clickRepulsionY;
          }
          
          let moveSpeed = 0.25;
          
          if (particle.magnetized) {
            moveSpeed = 0.35 + (velocityFactor * 0.15);
          } else {
            moveSpeed = 0.12 + (velocityFactor * 0.08);
          }
          
          if (particle.targetX !== undefined) {
            particle.offsetX += (particle.targetX - particleX) * moveSpeed;
            particle.offsetY += (particle.targetY - particleY) * moveSpeed;
          }
          
          particle.x = particle.baseX + (particle.offsetX || 0);
          particle.y = particle.baseY + (particle.offsetY || 0);
        });
      });
    };

    const drawParticles = (ctx) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      layers.current.forEach(layer => {
        layer.forEach(particle => {
          ctx.globalAlpha = particle.style.opacity;
          ctx.fillStyle = particle.style.color;
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.style.size, 0, Math.PI * 2);
          ctx.fill();
          
          if (finalConfig.effects.particleGlow) {
            ctx.shadowColor = particle.style.color;
            ctx.shadowBlur = particle.style.size * finalConfig.particles.glowIntensity;
            ctx.fill();
            ctx.shadowBlur = 0;
          }
        });
      });
      
      if (finalConfig.effects.ripples) {
        drawRipples(ctx);
      }
    };

    const drawRipples = (ctx) => {
      ripplesRef.current = ripplesRef.current.filter(ripple => {
        const progress = (Date.now() - ripple.startTime) / ripple.duration;
        if (progress >= 1) return false;
        
        const radius = ripple.maxRadius * progress;
        const opacity = (1 - progress) * 0.3;
        
        ctx.globalAlpha = opacity;
        ctx.strokeStyle = finalConfig.particles.colors[0];
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(ripple.x, ripple.y, radius, 0, Math.PI * 2);
        ctx.stroke();
        
        return true;
      });
    };

    const animate = (time) => {
      updateParticles(time);
      drawParticles(ctx);
      animationRef.current = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e) => {
      const now = Date.now();
      const deltaTime = now - mouseRef.current.lastTime;
      
      if (deltaTime > 0) {
        const rect = canvas.getBoundingClientRect();
        const canvasX = e.clientX - rect.left;
        const canvasY = e.clientY - rect.top;
        
        const deltaX = canvasX - mouseRef.current.lastX;
        const deltaY = canvasY - mouseRef.current.lastY;
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        const velocity = distance / deltaTime * 1000;
        
        if (finalConfig.effects.trails) {
          mouseTrail.current.unshift({ x: canvasX, y: canvasY, time: now });
          
          const maxTrailLength = Math.min(15, Math.max(8, Math.floor(velocity / 60)));
          if (mouseTrail.current.length > maxTrailLength) {
            mouseTrail.current = mouseTrail.current.slice(0, maxTrailLength);
          }
          
          const trailAge = 300;
          mouseTrail.current = mouseTrail.current.filter(point => now - point.time < trailAge);
        }
        
        mouseRef.current = {
          x: canvasX,
          y: canvasY,
          lastX: mouseRef.current.x,
          lastY: mouseRef.current.y,
          velocity: velocity * 0.1 + mouseRef.current.velocity * 0.9,
          lastTime: now
        };
      }
    };

    const handleClick = (e) => {
      if (finalConfig.effects.ripples) {
        const rect = canvas.getBoundingClientRect();
        const canvasX = e.clientX - rect.left;
        const canvasY = e.clientY - rect.top;
        
        ripplesRef.current.push({
          x: canvasX,
          y: canvasY,
          maxRadius: 100,
          duration: 1000,
          startTime: Date.now()
        });
      }
    };

    resizeCanvas();
    animate(0);
    
    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [finalConfig]);

  const backgroundStyle = finalConfig.background.gradient ? 
    `linear-gradient(${finalConfig.background.gradient.direction}, ${finalConfig.background.gradient.colors.join(', ')})` :
    finalConfig.background.color || 'transparent';

  return (
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      background: backgroundStyle,
      opacity: finalConfig.background.opacity,
      zIndex: 1
    }}>
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'all'
        }}
      />
    </div>
  );
};

export default MagneticParticleBackground;