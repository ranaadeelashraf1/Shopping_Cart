import { useState, useEffect } from 'react';

const Cart = () => {
    const [products, setProducts] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

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
                setProducts(data.products || []);
                setError('');
            })
            .catch(() => {
                setProducts([]);
                setError('Unable to load products from the API.');
            })
            .finally(() => setLoading(false));
    }, []);

    const filteredProducts = products.filter((product) =>
        product.title.toLowerCase().includes(searchText.toLowerCase())
    );

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
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
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
                        <p>Showing {filteredProducts.length} products</p>
                    </div>
                    <button className="cart-button">
                        <span className="cart-icon">🛒</span>
                        <span className="cart-text">Cart</span>
                        <span className="cart-count">0</span>
                    </button>
                </div>

                <div className="products-grid">
                    {loading ? (
                        <div className="no-results">Loading products...</div>
                    ) : error ? (
                        <div className="no-results">{error}</div>
                    ) : filteredProducts.length === 0 ? (
                        <div className="no-results">No products match "{searchText}"</div>
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
                                        <span className="tag">Rating: {product.rating}</span>
                                        <span className="tag">Stock: {product.stock}</span>
                                    </div>
                                    <p className="product-description">{product.description}</p>
                                    <div className="product-footer">
                                        <span className="product-price">${product.price.toFixed(2)}</span>
                                        <button className="btn-add-to-cart">Add to Cart</button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default Cart;

