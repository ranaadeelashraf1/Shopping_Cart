const Cart = () => {
    return (
        <div className="products-container">
            {/* Sidebar */}
            <div className="sidebar">
                <div className="sidebar-section">
                    <h3>Search</h3>
                    <input
                        type="text"
                        className="search-input"
                        placeholder="Search products..."
                    />
                </div>

                <div className="sidebar-section">
                    <h3>Categories</h3>
                    <ul className="category-list">
                        <li className="active">All Products</li>
                        <li>Electronics</li>
                        <li>Sports</li>
                        <li>Home</li>
                        <li>Accessories</li>
                    </ul>
                </div>
            </div>

            {/* Main Content */}
            <div className="products-main">
                <div className="products-header">
                    <div>
                        <h1>Our Products</h1>
                        <p>Showing 8 products</p>
                    </div>
                    <button className="cart-button">
                        <span className="cart-icon">🛒</span>
                        <span className="cart-text">Cart</span>
                        <span className="cart-count">0</span>
                    </button>
                </div>

                <div className="products-grid">
                    {/* Product Card 1 */}
                    <div className="product-card">
                        <div className="product-image">
                            <img src="https://via.placeholder.com/300x200/3498db/ffffff?text=Headphones" alt="Wireless Headphones" />
                        </div>
                        <div className="product-details">
                            <p className="product-category">Electronics</p>
                            <h3 className="product-name">Wireless Headphones</h3>
                            <div className="product-tags">
                                <span className="tag">Bluetooth</span>
                                <span className="tag">Noise Cancelling</span>
                            </div>
                            <p className="product-description">High-quality wireless headphones with noise cancellation</p>
                            <div className="product-footer">
                                <span className="product-price">$79.99</span>
                                <button className="btn-add-to-cart">Add to Cart</button>
                            </div>
                        </div>
                    </div>

                    {/* Product Card 2 */}
                    <div className="product-card">
                        <div className="product-image">
                            <img src="https://via.placeholder.com/300x200/e74c3c/ffffff?text=Smart+Watch" alt="Smart Watch" />
                        </div>
                        <div className="product-details">
                            <p className="product-category">Electronics</p>
                            <h3 className="product-name">Smart Watch</h3>
                            <div className="product-tags">
                                <span className="tag">Fitness</span>
                                <span className="tag">GPS</span>
                            </div>
                            <p className="product-description">Feature-rich smartwatch with fitness tracking</p>
                            <div className="product-footer">
                                <span className="product-price">$199.99</span>
                                <button className="btn-add-to-cart">Add to Cart</button>
                            </div>
                        </div>
                    </div>

                    {/* Product Card 3 */}
                    <div className="product-card">
                        <div className="product-image">
                            <img src="https://via.placeholder.com/300x200/2ecc71/ffffff?text=Running+Shoes" alt="Running Shoes" />
                        </div>
                        <div className="product-details">
                            <p className="product-category">Sports</p>
                            <h3 className="product-name">Running Shoes</h3>
                            <div className="product-tags">
                                <span className="tag">Comfort</span>
                                <span className="tag">Breathable</span>
                            </div>
                            <p className="product-description">Comfortable running shoes for daily training</p>
                            <div className="product-footer">
                                <span className="product-price">$89.99</span>
                                <button className="btn-add-to-cart">Add to Cart</button>
                            </div>
                        </div>
                    </div>

                    {/* Product Card 4 */}
                    <div className="product-card">
                        <div className="product-image">
                            <img src="https://via.placeholder.com/300x200/9b59b6/ffffff?text=Yoga+Mat" alt="Yoga Mat" />
                        </div>
                        <div className="product-details">
                            <p className="product-category">Sports</p>
                            <h3 className="product-name">Yoga Mat</h3>
                            <div className="product-tags">
                                <span className="tag">Non-slip</span>
                                <span className="tag">Eco-friendly</span>
                            </div>
                            <p className="product-description">Non-slip yoga mat for all types of exercises</p>
                            <div className="product-footer">
                                <span className="product-price">$29.99</span>
                                <button className="btn-add-to-cart">Add to Cart</button>
                            </div>
                        </div>
                    </div>

                    {/* Product Card 5 */}
                    <div className="product-card">
                        <div className="product-image">
                            <img src="https://via.placeholder.com/300x200/f39c12/ffffff?text=Coffee+Maker" alt="Coffee Maker" />
                        </div>
                        <div className="product-details">
                            <p className="product-category">Home</p>
                            <h3 className="product-name">Coffee Maker</h3>
                            <div className="product-tags">
                                <span className="tag">Programmable</span>
                                <span className="tag">12 Cup</span>
                            </div>
                            <p className="product-description">Programmable coffee maker with thermal carafe</p>
                            <div className="product-footer">
                                <span className="product-price">$59.99</span>
                                <button className="btn-add-to-cart">Add to Cart</button>
                            </div>
                        </div>
                    </div>

                    {/* Product Card 6 */}
                    <div className="product-card">
                        <div className="product-image">
                            <img src="https://via.placeholder.com/300x200/1abc9c/ffffff?text=Blender" alt="Blender" />
                        </div>
                        <div className="product-details">
                            <p className="product-category">Home</p>
                            <h3 className="product-name">Blender</h3>
                            <div className="product-tags">
                                <span className="tag">Powerful</span>
                                <span className="tag">Multi-speed</span>
                            </div>
                            <p className="product-description">Powerful blender for smoothies and more</p>
                            <div className="product-footer">
                                <span className="product-price">$49.99</span>
                                <button className="btn-add-to-cart">Add to Cart</button>
                            </div>
                        </div>
                    </div>

                    {/* Product Card 7 */}
                    <div className="product-card">
                        <div className="product-image">
                            <img src="https://via.placeholder.com/300x200/34495e/ffffff?text=Backpack" alt="Backpack" />
                        </div>
                        <div className="product-details">
                            <p className="product-category">Accessories</p>
                            <h3 className="product-name">Backpack</h3>
                            <div className="product-tags">
                                <span className="tag">Durable</span>
                                <span className="tag">Laptop</span>
                            </div>
                            <p className="product-description">Durable backpack with laptop compartment</p>
                            <div className="product-footer">
                                <span className="product-price">$45.99</span>
                                <button className="btn-add-to-cart">Add to Cart</button>
                            </div>
                        </div>
                    </div>

                    {/* Product Card 8 */}
                    <div className="product-card">
                        <div className="product-image">
                            <img src="https://via.placeholder.com/300x200/e67e22/ffffff?text=Sunglasses" alt="Sunglasses" />
                        </div>
                        <div className="product-details">
                            <p className="product-category">Accessories</p>
                            <h3 className="product-name">Sunglasses</h3>
                            <div className="product-tags">
                                <span className="tag">UV Protection</span>
                                <span className="tag">Polarized</span>
                            </div>
                            <p className="product-description">Stylish sunglasses with UV protection</p>
                            <div className="product-footer">
                                <span className="product-price">$39.99</span>
                                <button className="btn-add-to-cart">Add to Cart</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;

