// Cart functionality
let cart = [];
let cartCount = 0;

// Update cart count display
function updateCartCount() {
    const cartCountElements = document.querySelectorAll('.cart-count');
    cartCountElements.forEach(element => {
        element.textContent = cartCount;
    });
}

// Add to cart functionality
document.addEventListener('DOMContentLoaded', function() {
    
    // Product detail page functionality
    if (document.getElementById('add-to-cart')) {
        const addToCartBtn = document.getElementById('add-to-cart');
        const quantityInput = document.getElementById('quantity');
        const decreaseBtn = document.getElementById('decrease-qty');
        const increaseBtn = document.getElementById('increase-qty');
        const sizeSelect = document.getElementById('size');

        // Quantity controls
        if (decreaseBtn) {
            decreaseBtn.addEventListener('click', function() {
                const currentValue = parseInt(quantityInput.value);
                if (currentValue > 1) {
                    quantityInput.value = currentValue - 1;
                }
            });
        }

        if (increaseBtn) {
            increaseBtn.addEventListener('click', function() {
                const currentValue = parseInt(quantityInput.value);
                if (currentValue < 10) {
                    quantityInput.value = currentValue + 1;
                }
            });
        }

        // Add to cart
        addToCartBtn.addEventListener('click', function() {
            const quantity = parseInt(quantityInput.value);
            const productName = document.getElementById('product-title').textContent;
            const productPrice = document.getElementById('product-price').textContent;
            const size = sizeSelect ? sizeSelect.value : 'standard';

            cartCount += quantity;
            updateCartCount();
            saveCartCount();

            // Add to cart array
            cart.push({
                name: productName,
                price: productPrice,
                quantity: quantity,
                size: size
            });

            // Show confirmation
            alert(`${quantity} x ${productName} added to cart!`);
        });

        // Add to wishlist
        const wishlistBtn = document.getElementById('add-to-wishlist');
        if (wishlistBtn) {
            wishlistBtn.addEventListener('click', function() {
                const productName = document.getElementById('product-title').textContent;
                alert(`${productName} added to wishlist!`);
            });
        }
    }

    // Product tabs
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');

    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');

            // Remove active class from all buttons and panels
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanels.forEach(panel => panel.classList.remove('active'));

            // Add active class to clicked button and corresponding panel
            this.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
        });
    });

    // Thumbnail image switching
    const thumbnails = document.querySelectorAll('.thumbnail');
    const mainImage = document.getElementById('main-product-image');

    thumbnails.forEach((thumbnail, index) => {
        thumbnail.addEventListener('click', function() {
            thumbnails.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // In a real implementation, you would change the main image source
            // based on data attributes or a predefined image array
        });
    });

    // Product data (in a real app, this would come from a database or API)
    const products = {
        '1': {
            name: 'Hydrating Serum',
            price: '$49.99',
            description: 'Our signature Hydrating Serum is a lightweight, fast-absorbing formula that delivers intense moisture deep into your skin. Powered by hyaluronic acid and botanical extracts, this serum helps plump, smooth, and restore your skin\'s natural radiance.',
            category: 'Serums',
            sku: 'DL-HS-001'
        },
        '2': {
            name: 'Vitamin C Brightening Cream',
            price: '$59.99',
            description: 'A powerful brightening cream infused with vitamin C to illuminate your complexion and reduce the appearance of dark spots. This rich formula provides deep hydration while working to even out skin tone.',
            category: 'Creams',
            sku: 'DL-VC-002'
        },
        '3': {
            name: 'Night Repair Complex',
            price: '$79.99',
            description: 'Our most advanced nighttime treatment, designed to work while you sleep. This potent formula helps repair daily damage, reduce fine lines, and restore your skin\'s youthful glow.',
            category: 'Treatments',
            sku: 'DL-NR-003'
        },
        '4': {
            name: 'Revitalizing Eye Cream',
            price: '$44.99',
            description: 'A targeted treatment for the delicate eye area. This gentle yet effective cream helps reduce the appearance of dark circles, puffiness, and fine lines for a more refreshed look.',
            category: 'Eye Care',
            sku: 'DL-EC-004'
        },
        '5': {
            name: 'Gentle Facial Cleanser',
            price: '$34.99',
            description: 'A mild, pH-balanced cleanser that removes impurities without stripping your skin of essential moisture. Perfect for all skin types, including sensitive skin.',
            category: 'Cleansers',
            sku: 'DL-CL-005'
        },
        '6': {
            name: 'Exfoliating Treatment Mask',
            price: '$54.99',
            description: 'A dual-action mask that gently exfoliates while deeply nourishing. Reveal smoother, brighter skin with this luxurious weekly treatment.',
            category: 'Treatments',
            sku: 'DL-EM-006'
        },
        '7': {
            name: 'Advanced Retinol Treatment',
            price: '$89.99',
            description: 'Our most powerful anti-aging treatment features time-released retinol to minimize the appearance of wrinkles and improve skin texture without irritation.',
            category: 'Treatments',
            sku: 'DL-RT-007'
        },
        '8': {
            name: 'Daily Defense Moisturizer SPF 30',
            price: '$52.99',
            description: 'A lightweight daily moisturizer with broad-spectrum SPF 30 protection. Hydrates and protects your skin from harmful UV rays and environmental stressors.',
            category: 'Moisturizers',
            sku: 'DL-DM-008'
        }
    };

    // Load product details based on URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    if (productId && products[productId]) {
        const product = products[productId];
        
        // Update product details if elements exist
        const titleElement = document.getElementById('product-title');
        const priceElement = document.getElementById('product-price');
        const descElement = document.getElementById('product-full-description');
        const categoryElement = document.getElementById('product-category');
        const skuElement = document.getElementById('product-sku');
        const breadcrumbElement = document.getElementById('product-name-breadcrumb');

        if (titleElement) titleElement.textContent = product.name;
        if (priceElement) priceElement.textContent = product.price;
        if (descElement) descElement.textContent = product.description;
        if (categoryElement) categoryElement.textContent = product.category;
        if (skuElement) skuElement.textContent = product.sku;
        if (breadcrumbElement) breadcrumbElement.textContent = product.name;
        
        // Update page title
        document.title = `${product.name} - DefinedLook`;
    }

    // Filter and sort functionality for products page
    const categoryFilter = document.getElementById('category');
    const sortSelect = document.getElementById('sort');

    if (categoryFilter) {
        categoryFilter.addEventListener('change', function() {
            // In a real implementation, this would filter products
            // by the selected category and update the product grid
        });
    }

    if (sortSelect) {
        sortSelect.addEventListener('change', function() {
            // In a real implementation, this would sort products
            // by the selected criteria and update the product grid
        });
    }

    // Initialize cart count from localStorage (in a real app)
    const savedCartCount = localStorage.getItem('cartCount');
    if (savedCartCount) {
        cartCount = parseInt(savedCartCount);
        updateCartCount();
    }
});

// Save cart count to localStorage when it changes
function saveCartCount() {
    localStorage.setItem('cartCount', cartCount.toString());
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href !== '#search' && href !== '#account' && href !== '#cart') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});
