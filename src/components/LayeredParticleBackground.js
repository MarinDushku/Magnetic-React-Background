import React, { useRef, useEffect, useState } from 'react';

const LayeredParticleBackground = () => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0, lastX: 0, lastY: 0, velocity: 0, lastTime: Date.now() });
  const mouseTrail = useRef([]);
  const ripplesRef = useRef([]);

  const layers = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initializeLayers();
    };

    const initializeLayers = () => {
      layers.current = [
        createLayer(15, 0.5, 1.5, 'spiral', { opacity: 0.3, size: 8 }),
        createLayer(25, 1, 1.0, 'sine', { opacity: 0.4, size: 6 }),
        createLayer(35, 1.5, 0.7, 'figure8', { opacity: 0.5, size: 4 }),
        createLayer(45, 2, 0.5, 'circle', { opacity: 0.6, size: 3 })
      ];
    };

    const createLayer = (count, speed, depth, pathType, style) => {
      const particles = [];
      for (let i = 0; i < count; i++) {
        particles.push({
          id: i,
          baseX: Math.random() * canvas.width,
          baseY: Math.random() * canvas.height,
          x: 0,
          y: 0,
          phase: (i / count) * Math.PI * 2,
          speed: speed + (Math.random() - 0.5) * 0.3,
          depth: depth,
          pathType: pathType,
          style: style,
          offsetX: 0,
          offsetY: 0,
          targetOffsetX: 0,
          targetOffsetY: 0
        });
      }
      return particles;
    };

    const updateParticles = (time) => {
      layers.current.forEach(layer => {
        layer.forEach(particle => {
          // Check magnetic influence first
          const particleX = particle.baseX + (particle.offsetX || 0);
          const particleY = particle.baseY + (particle.offsetY || 0);
          
          // Check if mouse is offscreen
          const canvas = canvasRef.current;
          const mouseOffscreen = mouseRef.current.x < 0 || mouseRef.current.x > canvas.width || 
                                mouseRef.current.y < 0 || mouseRef.current.y > canvas.height;
          
          const mouseDistance = Math.sqrt(
            Math.pow(mouseRef.current.x - particleX, 2) + 
            Math.pow(mouseRef.current.y - particleY, 2)
          );
          
          const maxInfluence = 250;
          // No magnetic influence if mouse is offscreen
          const influence = mouseOffscreen ? 0 : Math.max(0, 1 - mouseDistance / maxInfluence);
          
          let pathX = 0, pathY = 0;
          
          // Only follow natural flow if not under strong magnetic influence
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
            
            // Blend path movement with current position when influence is weak
            const pathInfluence = 1 - influence;
            particle.targetX = particle.baseX + pathX * pathInfluence;
            particle.targetY = particle.baseY + pathY * pathInfluence;
          }
          
          // Gradient velocity-based strength reduction (100% when still, 40% at high speed)
          const maxVelocity = 1500;
          const velocityFactor = Math.max(0.4, 1 - (mouseRef.current.velocity / maxVelocity));
          
          // Calculate distance-based effectiveness (20% reduction per particle radius)
          const particleRadius = particle.style.size;
          const distanceInRadii = Math.floor(mouseDistance / particleRadius);
          const distanceEffectiveness = Math.pow(0.8, distanceInRadii);
          
          // Check for particle-particle repulsion to prevent stacking (only for non-magnetized particles)
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
                    const repelForce = (minDistance - distance) / minDistance * 10; // Reduced force
                    repulsionX += (dx / distance) * repelForce;
                    repulsionY += (dy / distance) * repelForce;
                  }
                }
              });
            });
          }
          
          // Find closest magnetic source (mouse trail or magnetized particle)
          let closestMagnetX = mouseRef.current.x;
          let closestMagnetY = mouseRef.current.y;
          let closestDistance = mouseDistance;
          let magneticStrength = 1.0; // Full strength from mouse
          let trailIndex = -1;
          
          // Check mouse trail positions for magnetic trail effect (only if mouse is onscreen)
          if (!mouseOffscreen) {
            mouseTrail.current.forEach((trailPoint, index) => {
              const trailDistance = Math.sqrt(
                Math.pow(particleX - trailPoint.x, 2) + Math.pow(particleY - trailPoint.y, 2)
              );
              if (trailDistance < closestDistance) {
                closestMagnetX = trailPoint.x;
                closestMagnetY = trailPoint.y;
                closestDistance = trailDistance;
                magneticStrength = 1.0 - (index / mouseTrail.current.length) * 0.3; // Weaker towards tail
                trailIndex = index;
              }
            });
          }
          
          // Check if any other particle is closer and magnetized
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
                  magneticStrength = otherParticle.magneticStrength * 0.7; // Reduced strength through chain
                }
              }
            });
          });
          
          // Determine if particle should be magnetized
          const chainDistance = 120; // Increased distance for stronger magnetic field
          const wasMagnetized = particle.magnetized;
          particle.magnetized = closestDistance < chainDistance && magneticStrength > 0.15;
          particle.magneticStrength = magneticStrength;
          
          // If particle was magnetized but now isn't, update its base position to current position
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
            
            // Create orderly chain formation - each particle gets unique distance
            const baseDistance = particle.style.size * 2.2;
            const layerOffset = particle.depth * 5; // Different layers spread out
            const idOffset = (particle.id % 8) * 3; // Spread particles with same layer
            const connectionDistance = baseDistance + layerOffset + idOffset;
            
            particle.targetX = closestMagnetX - Math.cos(angle) * connectionDistance;
            particle.targetY = closestMagnetY - Math.sin(angle) * connectionDistance;
          }
          
          // Check for click ripple repulsion
          let clickRepulsionX = 0, clickRepulsionY = 0;
          ripplesRef.current.forEach(ripple => {
            const rippleProgress = (Date.now() - ripple.startTime) / ripple.duration;
            if (rippleProgress < 1) {
              const rippleRadius = ripple.maxRadius * rippleProgress;
              const dx = particleX - ripple.x;
              const dy = particleY - ripple.y;
              const rippleDistance = Math.sqrt(dx * dx + dy * dy);
              
              if (rippleDistance < rippleRadius && rippleDistance > 0) {
                const repelStrength = (1 - rippleProgress) * 200; // Much stronger push to get out of magnetic range
                clickRepulsionX += (dx / rippleDistance) * repelStrength;
                clickRepulsionY += (dy / rippleDistance) * repelStrength;
              }
            }
          });
          
          // Apply particle repulsion
          if (particle.targetX !== undefined) {
            particle.targetX += repulsionX + clickRepulsionX;
            particle.targetY += repulsionY + clickRepulsionY;
          }
          
          // Move towards target position with velocity-based speed
          let moveSpeed = 0.25; // Reduced base speed for smoother movement
          
          if (particle.magnetized) {
            // Smooth but responsive movement when magnetized
            moveSpeed = 0.35 + (velocityFactor * 0.15);
          } else {
            // Smooth speed for natural flow
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
          ctx.fillStyle = 'rgba(255, 255, 255, 1)';
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.style.size, 0, Math.PI * 2);
          ctx.fill();
          
          ctx.shadowColor = 'rgba(255, 255, 255, 0.5)';
          ctx.shadowBlur = particle.style.size * 2;
          ctx.fill();
          ctx.shadowBlur = 0;
        });
      });
      
      drawRipples(ctx);
    };

    const drawRipples = (ctx) => {
      ripplesRef.current = ripplesRef.current.filter(ripple => {
        const progress = (Date.now() - ripple.startTime) / ripple.duration;
        if (progress >= 1) return false;
        
        const radius = ripple.maxRadius * progress;
        const opacity = (1 - progress) * 0.3;
        
        ctx.globalAlpha = opacity;
        ctx.strokeStyle = 'rgba(255, 255, 255, 1)';
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
        const deltaX = e.clientX - mouseRef.current.lastX;
        const deltaY = e.clientY - mouseRef.current.lastY;
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        const velocity = distance / deltaTime * 1000; // pixels per second
        
        // Add current position to trail
        mouseTrail.current.unshift({ x: e.clientX, y: e.clientY, time: now });
        
        // Keep trail length based on velocity (longer trail when moving fast)
        const maxTrailLength = Math.min(15, Math.max(8, Math.floor(velocity / 60)));
        if (mouseTrail.current.length > maxTrailLength) {
          mouseTrail.current = mouseTrail.current.slice(0, maxTrailLength);
        }
        
        // Remove trail points that are too old for smoother following
        const trailAge = 300; // milliseconds
        mouseTrail.current = mouseTrail.current.filter(point => now - point.time < trailAge);
        
        mouseRef.current = {
          x: e.clientX,
          y: e.clientY,
          lastX: mouseRef.current.x,
          lastY: mouseRef.current.y,
          velocity: velocity * 0.1 + mouseRef.current.velocity * 0.9, // smooth velocity
          lastTime: now
        };
      }
    };

    const handleClick = (e) => {
      ripplesRef.current.push({
        x: e.clientX,
        y: e.clientY,
        maxRadius: 100,
        duration: 1000,
        startTime: Date.now()
      });
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
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 1,
        pointerEvents: 'all'
      }}
    />
  );
};

export default LayeredParticleBackground;