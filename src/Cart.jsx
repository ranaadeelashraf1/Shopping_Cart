import { useState, useEffect } from 'react';
import './App.css';

const Cart = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState(['All Products']);
    const [selectedCategory, setSelectedCategory] = useState('All Products');
    const [searchText, setSearchText] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    
    // Cart state with localStorage initialization
    const [cartItems, setCartItems] = useState(() => {
        try {
            const saved = localStorage.getItem('shopping_cart_items');
            return saved ? JSON.parse(saved) : [];
        } catch (e) {
            console.error('Error loading cart from localStorage:', e);
            return [];
        }
    });

    const [isCartOpen, setIsCartOpen] = useState(false);
    const [toastMessage, setToastMessage] = useState('');

    // Save cart state to localStorage on update
    useEffect(() => {
        try {
            localStorage.setItem('shopping_cart_items', JSON.stringify(cartItems));
        } catch (e) {
            console.error('Error saving cart to localStorage:', e);
        }
    }, [cartItems]);

    // Show temporary toast message
    const showToast = (msg) => {
        setToastMessage(msg);
        setTimeout(() => {
            setToastMessage('');
        }, 2500);
    };

    // Fetch products from API
    useEffect(() => {
        setLoading(true);
        fetch('https://dummyjson.com/products')
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                return res.json();
            })
            .then((data) => {
                const fetchedProducts = data.products || [];
                setProducts(fetchedProducts);
                
                // Extract unique categories dynamically
                const uniqueCategories = ['All Products', ...new Set(fetchedProducts.map((p) => p.category))];
                setCategories(uniqueCategories);
                setError('');
            })
            .catch(() => {
                setProducts([]);
                setError('Unable to load products from the API.');
            })
            .finally(() => setLoading(false));
    }, []);

    // Filter products by search text and selected category
    const filteredProducts = products.filter((product) => {
        const matchesSearch =
            product.title.toLowerCase().includes(searchText.toLowerCase()) ||
            product.category.toLowerCase().includes(searchText.toLowerCase()) ||
            product.description.toLowerCase().includes(searchText.toLowerCase());

        const matchesCategory =
            selectedCategory === 'All Products' ||
            product.category.toLowerCase() === selectedCategory.toLowerCase();

        return matchesSearch && matchesCategory;
    });

    // Add item to cart
    const handleAddToCart = (product) => {
        setCartItems((prevItems) => {
            const existingItem = prevItems.find((item) => item.id === product.id);

            if (existingItem) {
                return prevItems.map((item) =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }

            return [
                ...prevItems,
                {
                    id: product.id,
                    title: product.title,
                    price: product.price,
                    thumbnail: product.thumbnail,
                    category: product.category,
                    quantity: 1
                }
            ];
        });
        showToast(`Added "${product.title}" to cart 🛒`);
    };

    // Increase item quantity
    const handleIncreaseQuantity = (id) => {
        setCartItems((prevItems) =>
            prevItems.map((item) =>
                item.id === id ? { ...item, quantity: item.quantity + 1 } : item
            )
        );
    };

    // Decrease item quantity
    const handleDecreaseQuantity = (id) => {
        setCartItems((prevItems) => {
            const target = prevItems.find((item) => item.id === id);
            if (target && target.quantity <= 1) {
                showToast(`Removed "${target.title}" from cart`);
                return prevItems.filter((item) => item.id !== id);
            }
            return prevItems.map((item) =>
                item.id === id ? { ...item, quantity: item.quantity - 1 } : item
            );
        });
    };

    // Delete item completely from cart
    const handleDeleteFromCart = (id) => {
        const target = cartItems.find((item) => item.id === id);
        setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
        if (target) {
            showToast(`Deleted "${target.title}" from cart 🗑️`);
        }
    };

    // Clear all items from cart
    const handleClearCart = () => {
        if (cartItems.length === 0) return;
        setCartItems([]);
        showToast('Cart cleared 🗑️');
    };

    // Simulate Checkout
    const handleCheckout = () => {
        if (cartItems.length === 0) return;
        setCartItems([]);
        setIsCartOpen(false);
        showToast('🎉 Order placed successfully! Thank you for shopping.');
    };

    // Total counts & prices
    const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <div className="products-container">
            {/* Toast Notification */}
            {toastMessage && (
                <div className="toast-notification">
                    <span>{toastMessage}</span>
                </div>
            )}

            {/* Sidebar */}
            <div className="sidebar">
                <div className="sidebar-section">
                    <h3>Search</h3>
                    <input
                        type="text"
                        className="search-input"
                        placeholder="Search products..."
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                    />
                    {searchText && (
                        <button
                            className="clear-search-btn"
                            onClick={() => setSearchText('')}
                        >
                            Clear Search
                        </button>
                    )}
                </div>

                <div className="sidebar-section">
                    <h3>Categories</h3>
                    <ul className="category-list">
                        {categories.map((cat) => (
                            <li
                                key={cat}
                                className={selectedCategory === cat ? 'active' : ''}
                                onClick={() => setSelectedCategory(cat)}
                                style={{ textTransform: 'capitalize' }}
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
                        <p>
                            Showing {filteredProducts.length} of {products.length} products
                            {selectedCategory !== 'All Products' && ` in "${selectedCategory}"`}
                        </p>
                    </div>
                    <button className="cart-button" onClick={() => setIsCartOpen(true)}>
                        <span className="cart-icon">🛒</span>
                        <span className="cart-text">Cart</span>
                        <span className="cart-count">{totalCartCount}</span>
                    </button>
                </div>

                <div className="products-grid">
                    {loading ? (
                        <div className="no-products">Loading products...</div>
                    ) : error ? (
                        <div className="no-products">{error}</div>
                    ) : filteredProducts.length === 0 ? (
                        <div className="no-products">
                            No products match your criteria.
                            <br />
                            <button
                                className="btn-shop-now"
                                style={{ marginTop: '12px' }}
                                onClick={() => {
                                    setSearchText('');
                                    setSelectedCategory('All Products');
                                }}
                            >
                                Reset Filters
                            </button>
                        </div>
                    ) : (
                        filteredProducts.map((product) => (
                            <div className="product-card" key={product.id}>
                                <div className="product-image">
                                    <img src={product.thumbnail} alt={product.title} />
                                </div>
                                <div className="product-details">
                                    <p className="product-category">{product.category}</p>
                                    <h3 className="product-name">{product.title}</h3>
                                    <div className="product-tags">
                                        <span className="tag">⭐ {product.rating}</span>
                                        <span className="tag">Stock: {product.stock}</span>
                                    </div>
                                    <p className="product-description">{product.description}</p>
                                    <div className="product-footer">
                                        <span className="product-price">${product.price.toFixed(2)}</span>
                                        <button
                                            className="btn-add-to-cart"
                                            onClick={() => handleAddToCart(product)}
                                        >
                                            Add to Cart
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Cart Drawer & Overlay */}
            {isCartOpen && (
                <>
                    <div className="cart-overlay" onClick={() => setIsCartOpen(false)} />
                    <div className="cart-drawer">
                        <div className="cart-drawer-header">
                            <h2>
                                <span>🛒</span> Shopping Cart ({totalCartCount})
                            </h2>
                            <button
                                className="btn-close-cart"
                                onClick={() => setIsCartOpen(false)}
                                title="Close Cart"
                            >
                                ✕
                            </button>
                        </div>

                        <div className="cart-drawer-body">
                            {cartItems.length === 0 ? (
                                <div className="cart-empty-state">
                                    <div className="cart-empty-icon">🛒</div>
                                    <h3>Your cart is empty</h3>
                                    <p>Looks like you haven't added any products to your cart yet.</p>
                                    <button
                                        className="btn-shop-now"
                                        onClick={() => setIsCartOpen(false)}
                                    >
                                        Start Shopping
                                    </button>
                                </div>
                            ) : (
                                <div className="cart-item-list">
                                    {cartItems.map((item) => (
                                        <div className="cart-item" key={item.id}>
                                            <img
                                                src={item.thumbnail}
                                                alt={item.title}
                                                className="cart-item-img"
                                            />
                                            <div className="cart-item-info">
                                                <div className="cart-item-title">{item.title}</div>
                                                <div className="cart-item-price">
                                                    ${item.price.toFixed(2)} × {item.quantity} = $
                                                    {(item.price * item.quantity).toFixed(2)}
                                                </div>
                                                <div className="cart-item-controls">
                                                    <button
                                                        className="qty-btn"
                                                        onClick={() => handleDecreaseQuantity(item.id)}
                                                        title="Decrease quantity"
                                                    >
                                                        -
                                                    </button>
                                                    <span className="qty-count">{item.quantity}</span>
                                                    <button
                                                        className="qty-btn"
                                                        onClick={() => handleIncreaseQuantity(item.id)}
                                                        title="Increase quantity"
                                                    >
                                                        +
                                                    </button>
                                                    <button
                                                        className="btn-delete-item"
                                                        onClick={() => handleDeleteFromCart(item.id)}
                                                        title="Delete item from cart"
                                                    >
                                                        🗑️ Delete
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {cartItems.length > 0 && (
                            <div className="cart-drawer-footer">
                                <div className="cart-total-row">
                                    <span>Total:</span>
                                    <span>${totalPrice.toFixed(2)}</span>
                                </div>
                                <div className="cart-actions">
                                    <button
                                        className="btn-clear-cart"
                                        onClick={handleClearCart}
                                    >
                                        Clear Cart
                                    </button>
                                    <button
                                        className="btn-checkout"
                                        onClick={handleCheckout}
                                    >
                                        Checkout
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

export default Cart;
