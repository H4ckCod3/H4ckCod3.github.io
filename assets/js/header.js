// Efecto de nieve realista solo en el hero
(function() {
    'use strict';
    
    // Configuración
    const config = {
        snowflakeCount: 50, // Más copos para mejor visibilidad
        minSize: 1,
        maxSize: 2.5, // Más pequeños
        minSpeed: 0.2,
        maxSpeed: 0.8, // Más lentos
        windStrength: 0.2,
        blinkSpeed: 0.02 // Velocidad del parpadeo
    };
    
    // Crear canvas
    const canvas = document.createElement('canvas');
    canvas.id = 'snow-canvas';
    canvas.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 0;
    `;
    document.body.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    let snowflakes = [];
    let animationId;
    let heroElement = null;
    let heroRect = { top: 0, left: 0, width: 0, height: 0 };
    let previousHeroRect = { top: 0, left: 0, width: 0, height: 0 };
    
    // Obtener posición y tamaño del hero
    function updateHeroRect() {
        heroElement = document.querySelector('.hero');
        if (heroElement) {
            const rect = heroElement.getBoundingClientRect();
            // Guardar posición anterior
            previousHeroRect = { ...heroRect };
            // Usar getBoundingClientRect que ya da coordenadas relativas a la ventana (perfecto para canvas fixed)
            heroRect = {
                top: rect.top,
                left: rect.left,
                width: rect.width,
                height: rect.height
            };
        }
    }
    
    // Ajustar posiciones de las estrellas cuando el hero se mueve
    // Ya no es necesario porque usamos coordenadas relativas
    function adjustSnowflakesForHeroMovement() {
        // No hacer nada - las coordenadas relativas se mantienen automáticamente
        // Solo necesitamos actualizar si el hero cambia de tamaño
        if (previousHeroRect.width > 0 && 
            (previousHeroRect.width !== heroRect.width || previousHeroRect.height !== heroRect.height)) {
            // Si el hero cambió de tamaño, ajustar las posiciones relativas proporcionalmente
            const scaleX = heroRect.width / previousHeroRect.width;
            const scaleY = heroRect.height / previousHeroRect.height;
            
            snowflakes.forEach(snowflake => {
                snowflake.relativeX *= scaleX;
                snowflake.relativeY *= scaleY;
            });
        }
    }
    
    // Ajustar tamaño del canvas
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        updateHeroRect();
    }
    
    // Clase Snowflake - Usa coordenadas relativas al hero
    class Snowflake {
        constructor() {
            this.reset();
            this.blinkPhase = Math.random() * Math.PI * 2; // Fase inicial aleatoria para el parpadeo
        }
        
        reset(startFromTop = true) {
            // Usar coordenadas relativas al hero (0,0 es la esquina superior izquierda del hero)
            this.relativeX = Math.random() * heroRect.width;
            if (startFromTop) {
                this.relativeY = -10; // Empezar desde arriba del hero
            } else {
                // Distribuir por todo el hero (para inicialización)
                this.relativeY = Math.random() * heroRect.height;
            }
            this.size = Math.random() * (config.maxSize - config.minSize) + config.minSize;
            this.speed = Math.random() * (config.maxSpeed - config.minSpeed) + config.minSpeed;
            this.wind = (Math.random() - 0.5) * config.windStrength;
            this.baseOpacity = Math.random() * 0.4 + 0.3; // Opacidad base más baja
            this.blinkPhase = Math.random() * Math.PI * 2; // Nueva fase aleatoria
            this.rotation = Math.random() * Math.PI * 2;
            this.rotationSpeed = (Math.random() - 0.5) * 0.05;
        }
        
        // Obtener coordenadas absolutas desde las relativas
        getAbsoluteX() {
            return heroRect.left + this.relativeX;
        }
        
        getAbsoluteY() {
            return heroRect.top + this.relativeY;
        }
        
        update() {
            // Actualizar siempre usando coordenadas relativas
            this.relativeY += this.speed;
            this.relativeX += this.wind + Math.sin(this.relativeY * 0.01) * 0.3;
            this.rotation += this.rotationSpeed;
            
            // Efecto de parpadeo (apagarse y encenderse)
            this.blinkPhase += config.blinkSpeed;
            const blinkFactor = (Math.sin(this.blinkPhase) + 1) / 2; // Valor entre 0 y 1
            this.opacity = this.baseOpacity * (0.3 + blinkFactor * 0.7); // Varía entre 30% y 100% de la opacidad base
            
            // Si sale por abajo del hero, reiniciar desde arriba
            if (this.relativeY > heroRect.height + 10) {
                this.relativeY = -10;
                this.relativeX = Math.random() * heroRect.width;
            }
            
            // Si sale por los lados del hero, ajustar posición (wrap around)
            if (this.relativeX < -20) {
                this.relativeX = heroRect.width + 10;
            } else if (this.relativeX > heroRect.width + 20) {
                this.relativeX = -10;
            }
        }
        
        draw() {
            // Solo dibujar si está dentro del área del hero
            if (this.relativeY < -5 || this.relativeY > heroRect.height + 5) {
                return;
            }
            if (this.relativeX < -5 || this.relativeX > heroRect.width + 5) {
                return;
            }
            
            // Calcular coordenadas absolutas para dibujar
            const x = this.getAbsoluteX();
            const y = this.getAbsoluteY();
            
            ctx.save();
            ctx.translate(x, y);
            ctx.rotate(this.rotation);
            ctx.globalAlpha = this.opacity;
            
            // Dibujar copo de nieve con forma más realista
            ctx.beginPath();
            ctx.strokeStyle = '#ffffff';
            ctx.lineWidth = 0.5; // Línea más fina para copos pequeños
            
            // Forma de estrella de 6 puntas
            for (let i = 0; i < 6; i++) {
                ctx.moveTo(0, 0);
                ctx.lineTo(this.size, 0);
                ctx.moveTo(0, 0);
                ctx.lineTo(this.size * 0.5, this.size * 0.3);
                ctx.moveTo(0, 0);
                ctx.lineTo(this.size * 0.5, -this.size * 0.3);
                
                ctx.rotate(Math.PI / 3);
            }
            
            ctx.stroke();
            ctx.restore();
        }
    }
    
    // Inicializar copos de nieve
    function initSnowflakes() {
        updateHeroRect();
        snowflakes = [];
        for (let i = 0; i < config.snowflakeCount; i++) {
            const flake = new Snowflake();
            // Distribuir los copos iniciales por todo el hero (empezar desde el medio)
            flake.reset(false); // false = distribuir por todo el hero, no solo arriba
            snowflakes.push(flake);
        }
    }
    
    // Animación
    function animate() {
        // Actualizar posición del hero una vez por frame
        updateHeroRect();
        
        // Ajustar posiciones de las estrellas si el hero se movió (por scroll)
        adjustSnowflakesForHeroMovement();
        
        // Actualizar todas las estrellas siempre (incluso si no son visibles)
        snowflakes.forEach(snowflake => {
            snowflake.update();
        });
        
        // Limpiar todo el canvas primero
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Solo dibujar si el hero es visible
        if (heroRect.width > 0 && heroRect.height > 0) {
            // Usar clip para asegurar que solo se dibuje dentro del hero
            ctx.save();
            ctx.beginPath();
            ctx.rect(heroRect.left, heroRect.top, heroRect.width, heroRect.height);
            ctx.clip();
            
            // Dibujar todas las estrellas
            snowflakes.forEach(snowflake => {
                snowflake.draw();
            });
            
            ctx.restore();
        }
        
        animationId = requestAnimationFrame(animate);
    }
    
    // Inicializar
    function init() {
        resizeCanvas();
        // Esperar un poco para que el hero esté renderizado
        setTimeout(() => {
            initSnowflakes();
            animate();
        }, 100);
    }
    
    // Event listeners
    window.addEventListener('resize', () => {
        resizeCanvas();
    });
    
    window.addEventListener('scroll', () => {
        updateHeroRect();
    });
    
    // Iniciar cuando el DOM esté listo
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
    // Limpiar al desmontar (si es necesario)
    window.addEventListener('beforeunload', () => {
        if (animationId) {
            cancelAnimationFrame(animationId);
        }
    });
})();

