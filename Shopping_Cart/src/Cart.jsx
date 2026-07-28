import { useState, useEffect } from 'react';
import './App.css';

const INITIAL_PRODUCTS = [
    {
        id: 1,
        name: 'Wireless Headphones',
        category: 'Electronics',
        price: 79.99,
        tags: ['Bluetooth', 'Noise Cancelling'],
        description: 'High-quality wireless headphones with noise cancellation',
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=80'
    },
    {
        id: 2,
        name: 'Smart Watch',
        category: 'Electronics',
        price: 199.99,
        tags: ['Fitness', 'GPS'],
        description: 'Feature-rich smartwatch with fitness tracking',
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=80'
    },
    {
        id: 3,
        name: 'Running Shoes',
        category: 'Sports',
        price: 89.99,
        tags: ['Comfort', 'Breathable'],
        description: 'Comfortable running shoes for daily training',
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&auto=format&fit=crop&q=80'
    },
    {
        id: 4,
        name: 'Yoga Mat',
        category: 'Sports',
        price: 29.99,
        tags: ['Non-slip', 'Eco-friendly'],
        description: 'Non-slip yoga mat for all types of exercises',
        image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500&auto=format&fit=crop&q=80'
    },
    {
        id: 5,
        name: 'Coffee Maker',
        category: 'Home',
        price: 59.99,
        tags: ['Programmable', '12 Cup'],
        description: 'Programmable coffee maker with thermal carafe',
        image: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=500&auto=format&fit=crop&q=80'
    },
    {
        id: 6,
        name: 'Blender',
        category: 'Home',
        price: 49.99,
        tags: ['Powerful', 'Multi-speed'],
        description: 'Powerful blender for smoothies and more',
        image: 'https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=500&auto=format&fit=crop&q=80'
    },
    {
        id: 7,
        name: 'Backpack',
        category: 'Accessories',
        price: 45.99,
        tags: ['Durable', 'Laptop'],
        description: 'Durable backpack with laptop compartment',
        image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&auto=format&fit=crop&q=80'
    },
    {
        id: 8,
        name: 'Sunglasses',
        category: 'Accessories',
        price: 39.99,
        tags: ['UV Protection', 'Polarized'],
        description: 'Stylish sunglasses with UV protection',
        image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500&auto=format&fit=crop&q=80'
    }
];

const LOCAL_STORAGE_KEY = 'shopping_cart_items';

const Cart = () => {
    // Local storage cart state initialization
    const [cart, setCart] = useState(() => {
        try {
            const savedCart = localStorage.getItem(LOCAL_STORAGE_KEY);
            return savedCart ? JSON.parse(savedCart) : [];
        } catch (error) {
            console.error('Failed to load cart from localStorage:', error);
            return [];
        }
    });

    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All Products');
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [addedNotification, setAddedNotification] = useState(null);

    // Persist cart to localStorage whenever state changes
    useEffect(() => {
        try {
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(cart));
        } catch (error) {
            console.error('Failed to save cart to localStorage:', error);
        }
    }, [cart]);

    const categories = ['All Products', 'Electronics', 'Sports', 'Home', 'Accessories'];

    // Filter products dynamically
    const filteredProducts = INITIAL_PRODUCTS.filter(product => {
        const matchesCategory = selectedCategory === 'All Products' || product.category === selectedCategory;
        const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                              product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                              product.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
        return matchesCategory && matchesSearch;
    });

    // Cart Handlers
    const addToCart = (product) => {
        setCart(prevCart => {
            const existingItem = prevCart.find(item => item.id === product.id);
            if (existingItem) {
                return prevCart.map(item =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prevCart, { ...product, quantity: 1 }];
        });

        // Trigger notification
        setAddedNotification(product.name);
        setTimeout(() => {
            setAddedNotification(null);
        }, 2200);
    };

    const updateQuantity = (productId, delta) => {
        setCart(prevCart => {
            return prevCart.map(item => {
                if (item.id === productId) {
                    const newQty = item.quantity + delta;
                    return newQty > 0 ? { ...item, quantity: newQty } : null;
                }
                return item;
            }).filter(Boolean);
        });
    };

    const removeFromCart = (productId) => {
        setCart(prevCart => prevCart.filter(item => item.id !== productId));
    };

    const clearCart = () => {
        setCart([]);
    };

    // Calculate item counts and totals
    const totalItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <div className="products-container">
            {/* Added Toast Notification */}
            {addedNotification && (
                <div className="toast-notification">
                    <span>✓ Added <strong>{addedNotification}</strong> to cart</span>
                </div>
            )}

            {/* Sidebar */}
            <div className="sidebar">
                <div className="sidebar-section">
                    <h3>Search</h3>
                    <div className="search-input-wrapper">
                        <input
                            type="text"
                            className="search-input"
                            placeholder="Search products..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        {searchQuery && (
                            <button className="search-clear-btn" onClick={() => setSearchQuery('')} aria-label="Clear search">×</button>
                        )}
                    </div>
                </div>

                <div className="sidebar-section">
                    <h3>Categories</h3>
                    <ul className="category-list">
                        {categories.map(cat => (
                            <li
                                key={cat}
                                className={selectedCategory === cat ? 'active' : ''}
                                onClick={() => setSelectedCategory(cat)}
                            >
                                {cat}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Main Content */}
            <div className="products-main">
                <div className="products-header">
                    <div>
                        <h1>Our Products</h1>
                        <p>Showing {filteredProducts.length} of {INITIAL_PRODUCTS.length} products</p>
                    </div>
                    <button className="cart-button" onClick={() => setIsCartOpen(true)} aria-label="View Shopping Cart">
                        <span className="cart-icon">🛒</span>
                        <span className="cart-text">Cart</span>
                        <span className="cart-count">{totalItemsCount}</span>
                    </button>
                </div>

                {filteredProducts.length === 0 ? (
                    <div className="no-products">
                        <h3>No products found</h3>
                        <p>Try adjusting your search query or selected category.</p>
                        <button className="btn-reset-filter" onClick={() => { setSearchQuery(''); setSelectedCategory('All Products'); }}>
                            Reset Filters
                        </button>
                    </div>
                ) : (
                    <div className="products-grid">
                        {filteredProducts.map(product => (
                            <div className="product-card" key={product.id}>
                                <div className="product-image">
                                    <img src={product.image} alt={product.name} loading="lazy" />
                                </div>
                                <div className="product-details">
                                    <p className="product-category">{product.category}</p>
                                    <h3 className="product-name">{product.name}</h3>
                                    <div className="product-tags">
                                        {product.tags.map((tag, idx) => (
                                            <span className="tag" key={idx}>{tag}</span>
                                        ))}
                                    </div>
                                    <p className="product-description">{product.description}</p>
                                    <div className="product-footer">
                                        <span className="product-price">${product.price.toFixed(2)}</span>
                                        <button
                                            className="btn-add-to-cart"
                                            onClick={() => addToCart(product)}
                                        >
                                            Add to Cart
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Cart Drawer & Overlay */}
            {isCartOpen && (
                <div className="cart-overlay" onClick={() => setIsCartOpen(false)}>
                    <div className="cart-drawer" onClick={(e) => e.stopPropagation()}>
                        <div className="cart-drawer-header">
                            <h2>Your Cart ({totalItemsCount})</h2>
                            <button className="cart-drawer-close" onClick={() => setIsCartOpen(false)} aria-label="Close cart">✕</button>
                        </div>

                        <div className="cart-drawer-body">
                            {cart.length === 0 ? (
                                <div className="empty-cart-view">
                                    <span className="empty-cart-icon">🛒</span>
                                    <p>Your cart is empty.</p>
                                    <button className="btn-continue-shopping" onClick={() => setIsCartOpen(false)}>
                                        Browse Products
                                    </button>
                                </div>
                            ) : (
                                <ul className="cart-items-list">
                                    {cart.map(item => (
                                        <li key={item.id} className="cart-drawer-item">
                                            <img src={item.image} alt={item.name} className="cart-item-img" />
                                            <div className="cart-item-info">
                                                <h4>{item.name}</h4>
                                                <p className="cart-item-price">${item.price.toFixed(2)} each</p>
                                                <div className="cart-item-controls">
                                                    <div className="quantity-selector">
                                                        <button onClick={() => updateQuantity(item.id, -1)} aria-label="Decrease quantity">−</button>
                                                        <span>{item.quantity}</span>
                                                        <button onClick={() => updateQuantity(item.id, 1)} aria-label="Increase quantity">+</button>
                                                    </div>
                                                    <button
                                                        className="cart-item-remove"
                                                        onClick={() => removeFromCart(item.id)}
                                                    >
                                                        Remove
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="cart-item-subtotal">
                                                ${(item.price * item.quantity).toFixed(2)}
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>

                        {cart.length > 0 && (
                            <div className="cart-drawer-footer">
                                <div className="cart-total-row">
                                    <span>Total:</span>
                                    <span className="cart-total-amount">${totalPrice.toFixed(2)}</span>
                                </div>
                                <div className="cart-drawer-actions">
                                    <button className="btn-clear-cart" onClick={clearCart}>
                                        Clear Cart
                                    </button>
                                    <button className="btn-checkout" onClick={() => alert('Order placed successfully!')}>
                                        Checkout
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;
