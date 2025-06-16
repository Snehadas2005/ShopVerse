class UniversalEffects {
    constructor() {
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.particles = null;
        this.animationEnabled = false;
        this.isInitialized = false;
        this.initAttempted = false;

        this.config = {
            particleCount: 50,
            particleSize: 0.1,
            particleOpacity: 0.6,
            animationSpeed: 0.001,
            scrollSensitivity: 2
        };
    }

    waitForThreeJS() {
        return new Promise((resolve) => {
            if (typeof THREE !== 'undefined') {
                resolve();
                return;
            }

            const checkInterval = setInterval(() => {
                if (typeof THREE !== 'undefined') {
                    clearInterval(checkInterval);
                    resolve();
                }
            }, 100);

            setTimeout(() => {
                clearInterval(checkInterval);
                resolve();
            }, 5000);
        });
    }

    async initThreeJS() {
        if (this.initAttempted) {
            return this.isInitialized;
        }

        this.initAttempted = true;

        await this.waitForThreeJS();

        if (typeof THREE === 'undefined') {
            return false;
        }

        if (this.isInitialized) {
            return true;
        }

        try {
            this.scene = new THREE.Scene();
            this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
            this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

            this.renderer.setSize(window.innerWidth, window.innerHeight);
            this.renderer.setClearColor(0x000000, 0);
            this.renderer.domElement.style.position = 'fixed';
            this.renderer.domElement.style.top = '0';
            this.renderer.domElement.style.left = '0';
            this.renderer.domElement.style.zIndex = '-1';
            this.renderer.domElement.style.pointerEvents = 'none';

            document.body.appendChild(this.renderer.domElement);

            this.createParticles();

            this.camera.position.z = 5;
            this.isInitialized = true;

            return true;
        } catch (error) {
            return false;
        }
    }

    createParticles() {
        const particleCount = this.config.particleCount;
        const positions = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);

        for (let i = 0; i < particleCount * 3; i += 3) {
            positions[i] = (Math.random() - 0.5) * 20;
            positions[i + 1] = (Math.random() - 0.5) * 20;
            positions[i + 2] = (Math.random() - 0.5) * 20;

            colors[i] = Math.random() * 0.5 + 0.5;
            colors[i + 1] = Math.random() * 0.3;
            colors[i + 2] = Math.random() * 0.3 + 0.2;
        }

        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

        const material = new THREE.PointsMaterial({
            size: this.config.particleSize,
            vertexColors: true,
            transparent: true,
            opacity: this.config.particleOpacity
        });

        this.particles = new THREE.Points(geometry, material);
        this.scene.add(this.particles);
    }

    animate() {
        if (!this.animationEnabled || !this.renderer || !this.isInitialized) return;

        requestAnimationFrame(() => this.animate());

        if (this.particles) {
            this.particles.rotation.x += this.config.animationSpeed;
            this.particles.rotation.y += this.config.animationSpeed * 2;

            const scrollPercent = window.pageYOffset / (document.documentElement.scrollHeight - window.innerHeight || 1);
            this.particles.position.y = scrollPercent * this.config.scrollSensitivity;
        }

        this.renderer.render(this.scene, this.camera);
    }

    startAnimation() {
        if (!this.animationEnabled && this.isInitialized) {
            this.animationEnabled = true;
            this.animate();
        }
    }

    stopAnimation() {
        this.animationEnabled = false;
    }

    handleResize() {
        if (this.camera && this.renderer) {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
        }
    }

    initScrollAnimations(selectors = []) {
        const defaultSelectors = [
            '.product-container',
            '.cart-item-container',
            '.payment-summary',
            '.order-container',
            '.tracking-container',
            '.empty-cart-container',
            '.empty-orders-container',
            '.product-image-container',
            '.product-details',
            '.product-actions',
            '.page-title'
        ];

        const allSelectors = [...defaultSelectors, ...selectors];
        const animatedElements = document.querySelectorAll(allSelectors.join(', '));

        if (animatedElements.length === 0) return;

        animatedElements.forEach((element, index) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(50px) scale(0.9)';
            element.style.transition = `all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${index * 0.1}s`;
        });

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0) scale(1)';
                        entry.target.style.boxShadow = '0 10px 30px rgba(255, 192, 203, 0.3)';

                        this.startAnimation();
                    }
                });
            },
            {
                threshold: 0.1,
                rootMargin: '50px'
            }
        );

        animatedElements.forEach((element) => {
            observer.observe(element);
        });
    }

    addHoverEffects(selectors = []) {
        const defaultSelectors = [
            '.product-container',
            '.cart-item-container',
            '.payment-summary',
            '.order-container',
            '.tracking-container',
            '.product-image-container',
            '.product-details'
        ];

        const allSelectors = [...defaultSelectors, ...selectors];
        const hoverElements = document.querySelectorAll(allSelectors.join(', '));

        hoverElements.forEach((element) => {
            if (element.classList.contains('empty-cart-container')) {
                return;
            }

            element.addEventListener('mouseenter', () => {
                element.style.transform = 'translateY(-10px) scale(1.02)';
                element.style.boxShadow = '0 20px 40px rgba(255, 192, 203, 0.4)';
                element.style.transition = 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            });

            element.addEventListener('mouseleave', () => {
                element.style.transform = 'translateY(0) scale(1)';
                element.style.boxShadow = '0 10px 30px rgba(255, 192, 203, 0.2)';
            });
            element.addEventListener('mouseenter', () => {
                element.style.transform = 'translateY(-10px) scale(1.02)';
                element.style.boxShadow = '0 20px 40px rgba(255, 192, 203, 0.4)';
                element.style.transition = 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)';

                Array.from(element.children).forEach((child) => {
                    child.style.transform = 'none';
                });
            });
        });

    }

    addButtonEffects(selectors = []) {
        const defaultSelectors = [
            '.add-to-cart-button',
            '.place-order-button',
            '.continue-shopping-btn',
            '.track-order-btn',
            '.reorder-btn',
            '.update-quantity-link',
            '.save-quantity-link',
            '.delete-quantity-link',
            '.buy-again-button',
            '.track-package-button',
            '.start-shopping-btn'
        ];

        const allSelectors = [...defaultSelectors, ...selectors];
        const buttons = document.querySelectorAll(allSelectors.join(', '));

        buttons.forEach((button) => {
            button.addEventListener('mouseenter', () => {
                button.style.transform = 'translateY(-3px) scale(1.02)';
                button.style.transition = 'all 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            });

            button.addEventListener('mouseleave', () => {
                button.style.transform = 'translateY(0) scale(1)';
            });

            button.addEventListener('mousedown', () => {
                button.style.transform = 'translateY(0) scale(0.98)';
            });

            button.addEventListener('mouseup', () => {
                button.style.transform = 'translateY(-3px) scale(1.02)';
            });
        });
    }

    initPageTitleAnimation() {
        const pageTitles = document.querySelectorAll('.page-title, h1, .main-title');

        pageTitles.forEach((title, index) => {
            title.style.opacity = '0';
            title.style.transform = 'translateY(-20px)';
            title.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';

            setTimeout(() => {
                title.style.opacity = '1';
                title.style.transform = 'translateY(0)';
            }, 300 + index * 100);
        });
    }

    async initAll(customSelectors = {}) {
        const success = await this.initThreeJS();

        this.initScrollAnimations(customSelectors.scroll || []);
        this.addHoverEffects(customSelectors.hover || []);
        this.addButtonEffects(customSelectors.buttons || []);
        this.initPageTitleAnimation();

        if (success) {
            setTimeout(() => {
                this.startAnimation();
            }, 100);
        }

        return success;
    }

    cleanup() {
        this.stopAnimation();

        if (this.renderer && this.renderer.domElement && this.renderer.domElement.parentNode) {
            this.renderer.domElement.parentNode.removeChild(this.renderer.domElement);
        }

        if (this.scene && this.particles) {
            this.scene.remove(this.particles);
            if (this.particles.geometry) this.particles.geometry.dispose();
            if (this.particles.material) this.particles.material.dispose();
        }

        this.particles = null;
        this.isInitialized = false;
        this.initAttempted = false;
    }
}

window.UniversalEffects = new UniversalEffects();

window.addEventListener('beforeunload', () => {
    window.UniversalEffects.cleanup();
});

window.addEventListener('resize', () => {
    window.UniversalEffects.handleResize();
});

export { UniversalEffects };
