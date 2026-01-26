// ============================================
// VELVET PETALS - JAVASCRIPT FILE
// ============================================

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Product Data
const products = [
    { 
        id: 1, 
        name: 'Midnight Rose Bouquet', 
        price: 699, 
        icon: 'rose'
    },
    { 
        id: 2, 
        name: 'Neon Orchid Pot', 
        price: 899, 
        icon: 'orchid'
    },
    { 
        id: 3, 
        name: 'Velvet Lily Box', 
        price: 549, 
        icon: 'lily'
    },
    { 
        id: 4, 
        name: 'Golden Tulip Set', 
        price: 649, 
        icon: 'tulip'
    },
    { 
        id: 5, 
        name: 'Aurora Mixed Blooms', 
        price: 799, 
        icon: 'mixed'
    }
];

// Cart State (stored in memory)
let cart = [];

// Initialize Products on page load
function initProducts() {
    const grid = document.getElementById('productsGrid');
    
    grid.innerHTML = products.map(product => `
        <div class="product-card" data-product-id="${product.id}">
            <div class="product-image">
                <div class="flower-icon ${product.icon}">
                    <div class="petal"></div>
                    <div class="petal"></div>
                    <div class="petal"></div>
                    <div class="petal"></div>
                    <div class="petal"></div>
                    <div class="center"></div>
                </div>
            </div>
            <div class="product-info">
                <div class="product-name">${product.name}</div>
                <div class="product-price">₹${product.price}</div>
                <button class="add-to-cart-btn" onclick="addToCart(${product.id})">
                    Add to Cart
                </button>
            </div>
        </div>
    `).join('');
}

// Add to Cart Function
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    
    if (!product) {
        console.error('Product not found');
        return;
    }
    
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCart();
    showToast('Luxury added to cart 🌙');
}

// Update Cart Display
function updateCart() {
    const cartItemsDiv = document.getElementById('cartItems');
    const cartBadge = document.getElementById('cartBadge');
    const cartTotal = document.getElementById('cartTotal');

    // Update badge count
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartBadge.textContent = totalItems;
    cartBadge.style.display = totalItems > 0 ? 'flex' : 'none';

    // Update cart items display
    if (cart.length === 0) {
        cartItemsDiv.innerHTML = `
            <div class="empty-cart">
                <div class="empty-cart-icon">
                    <div class="flower-icon empty">
                        <div class="petal"></div>
                        <div class="petal"></div>
                        <div class="petal"></div>
                        <div class="petal"></div>
                        <div class="petal"></div>
                        <div class="center"></div>
                    </div>
                </div>
                <p>Your cart is empty.</p>
                <p>Let it bloom ✨</p>
            </div>
        `;
        cartTotal.textContent = '0';
        return;
    }

    cartItemsDiv.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div class="cart-item-header">
                <span class="cart-item-name">${item.name}</span>
                <span class="cart-item-price">₹${item.price}</span>
            </div>
            <div class="cart-item-controls">
                <div class="quantity-controls">
                    <button class="qty-btn" onclick="decreaseQuantity(${item.id})">-</button>
                    <span class="quantity-display">${item.quantity}</span>
                    <button class="qty-btn" onclick="increaseQuantity(${item.id})">+</button>
                </div>
                <button class="remove-btn" onclick="removeFromCart(${item.id})">Remove</button>
            </div>
        </div>
    `).join('');

    // Update total price
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = total;
}

// Increase Quantity
function increaseQuantity(productId) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity++;
        updateCart();
    }
}

// Decrease Quantity
function decreaseQuantity(productId) {
    const item = cart.find(item => item.id === productId);
    if (item && item.quantity > 1) {
        item.quantity--;
        updateCart();
    }
}

// Remove from Cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
    showToast('Item removed from cart');
}

// Toggle Cart Panel
function toggleCart() {
    const cartPanel = document.getElementById('cartPanel');
    cartPanel.classList.toggle('active');
}

// Show Toast Notification
function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initProducts();
    updateCart();
});

// Close cart when clicking outside
document.addEventListener('click', function(event) {
    const cartPanel = document.getElementById('cartPanel');
    const cartIcon = document.querySelector('.cart-icon');
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    
    if (cartPanel.classList.contains('active')) {
        if (!cartPanel.contains(event.target) && 
            !cartIcon.contains(event.target) && 
            !mobileBtn.contains(event.target)) {
            cartPanel.classList.remove('active');
        }
    }
});