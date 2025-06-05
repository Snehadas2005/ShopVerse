import {cart, addToCart, calculateCartQuantity} from '../data/cart.js';
import { products } from '../data/products.js';

let productsHTML = '';

products.forEach((product) => {
    productsHTML += `
        <div class="product-container product-animate" data-product-id="${product.id}">
            <div class="product-image-container">
                <img class="product-image"
                src="${product.image}">
            </div>

            <div class="product-name limit-text-to-2-lines">
                ${product.name}
            </div>

            <div class="product-rating-container">
                <img class="product-rating-stars"
                src="images/ratings/rating-${product.rating.stars * 10}.png">
                <div class="product-rating-count link-primary">
                    ${product.rating.count}
                </div>
            </div>

            <div class="product-price">
                ₹${product.priceCount}
            </div>

            <div class="product-quantity-container">
                <select class="js-quantity-selector-${product.id}">
                    <option selected value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                </select>
            </div>

            <div class="product-spacer"></div>

            <div class="added-to-cart js-added-to-cart-${product.id}">
                <img src="images/icons/checkmark.png">
                Added
            </div>

            <button class="add-to-cart-button button-primary js-add-to-cart"
            data-product-id="${product.id}">
                Add to Cart
            </button>
        </div>
    `;
});

document.querySelector('.js-products-grid').innerHTML = productsHTML;

let scene, camera, renderer, particles;
let animationEnabled = false;

function initThreeJS() {
    if (typeof THREE === 'undefined') {
        console.error('Three.js not loaded. Make sure to include the CDN script.');
        return;
    }

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0); 
    renderer.domElement.style.position = 'fixed';
    renderer.domElement.style.top = '0';
    renderer.domElement.style.left = '0';
    renderer.domElement.style.zIndex = '-1';
    renderer.domElement.style.pointerEvents = 'none';
    
    document.body.appendChild(renderer.domElement);

    const particleCount = 50;
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
        size: 0.1,
        vertexColors: true,
        transparent: true,
        opacity: 0.6
    });
    
    particles = new THREE.Points(geometry, material);
    scene.add(particles);
    
    camera.position.z = 5;
    
    console.log('Three.js initialized successfully!');
}

function animateThreeJS() {
    if (!animationEnabled || !renderer) return;
    
    requestAnimationFrame(animateThreeJS);
    
    if (particles) {
        particles.rotation.x += 0.001;
        particles.rotation.y += 0.002;
        
        const scrollPercent = window.pageYOffset / (document.documentElement.scrollHeight - window.innerHeight);
        particles.position.y = scrollPercent * 2;
    }
    
    renderer.render(scene, camera);
}

function initScrollAnimation() {
    const productContainers = document.querySelectorAll('.product-animate');
    
    productContainers.forEach((container, index) => {
        container.style.opacity = '0';
        container.style.transform = 'translateY(50px) scale(0.9)';
        container.style.transition = `all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${index * 0.1}s`;
    });
    
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0) scale(1)';
                    
                    entry.target.style.boxShadow = '0 10px 30px rgba(255, 192, 203, 0.3)';
                    
                    if (!animationEnabled) {
                        animationEnabled = true;
                        animateThreeJS();
                        console.log('Three.js animation started!');
                    }
                }
            });
        },
        { 
            threshold: 0.1,
            rootMargin: '50px'
        }
    );
    
    productContainers.forEach((container) => {
        observer.observe(container);
    });
}

function addEnhancedHoverEffects() {
    const productContainers = document.querySelectorAll('.product-container');
    
    productContainers.forEach((container) => {
        container.addEventListener('mouseenter', () => {
            container.style.transform = 'translateY(-10px) scale(1.02)';
            container.style.boxShadow = '0 20px 40px rgba(255, 192, 203, 0.4)';
            container.style.transition = 'all 0.3s ease';
        });
        
        container.addEventListener('mouseleave', () => {
            container.style.transform = 'translateY(0) scale(1)';
            container.style.boxShadow = '0 10px 30px rgba(255, 192, 203, 0.2)';
        });
    });
}

function initHeaderScroll() {
    const header = document.querySelector('.shopverse-header');
    let lastScrollY = window.scrollY;
    
    function handleScroll() {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScrollY = currentScrollY;
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true });
}

function updateCartQuantity() {
    const cartQuantity = calculateCartQuantity();
    document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
}

updateCartQuantity();

const addedMessageTimeouts = {};

document.querySelectorAll('.js-add-to-cart').forEach((button) => {
    button.addEventListener('click', () => {
        const productId = button.dataset.productId;

        const quantitySelector = document.querySelector(`.js-quantity-selector-${productId}`);
        const selectedQuantity = parseInt(quantitySelector.value);
        
        addToCart(productId, selectedQuantity);
        updateCartQuantity();
        
        const addedMessage = document.querySelector(
            `.js-added-to-cart-${productId}`
        );
        
        if (addedMessage) {
            addedMessage.classList.add('added-to-cart-visible');

            if (addedMessageTimeouts[productId]) {
                clearTimeout(addedMessageTimeouts[productId]);
            }

            addedMessageTimeouts[productId] = setTimeout(() => {
                addedMessage.classList.remove('added-to-cart-visible');
                delete addedMessageTimeouts[productId];
            }, 2000);
        }
        
        button.style.transform = 'scale(0.95)';
        setTimeout(() => {
            button.style.transform = 'scale(1)';
        }, 150);
    });
});

function handleResize() {
    if (camera && renderer) {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }
}

window.addEventListener('resize', handleResize);

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing...');
    initThreeJS();
    initScrollAnimation();
    addEnhancedHoverEffects();
    initHeaderScroll(); 
});

window.addEventListener('beforeunload', () => {
    if (renderer && renderer.domElement && renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
    }
});