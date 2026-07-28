import { useState, useCallback, useEffect } from 'react';
import CartItem from './CartItem';

export default function BasicCart() {
    const symbol = '$';

    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [cartItems, setCartItems] = useState([]);

    const totalAmount = cartItems.reduce((subTotal, current) => {
        return current.price * current.quantity + subTotal;
    }, 0);

    const addToCart = (product) => {
        const normalizedProduct = {
            id: product.id,
            name: product.title || product.name || 'Unnamed Product',
            price: Number(product.price) || 0,
        };

        setCartItems((prevItems) => {
            const existingItem = prevItems.find((item) => item.id === normalizedProduct.id);

            if (existingItem) {
                return prevItems.map((item) =>
                    item.id === normalizedProduct.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }

            return [...prevItems, { ...normalizedProduct, quantity: 1 }];
        });
    };

    const increaseQuantity = useCallback((id) => {
        setCartItems((prevItems) =>
            prevItems.map((item) =>
                item.id === id ? { ...item, quantity: item.quantity + 1 } : item
            )
        );
    }, []);

    const decreaseQuantity = useCallback((id) => {
        setCartItems((prevItems) => {
            const foundCartItem = prevItems.find((item) => item.id === id);

            if (foundCartItem && foundCartItem.quantity <= 1) {
                return prevItems.filter((item) => item.id !== id);
            }

            return prevItems.map((item) =>
                item.id === id ? { ...item, quantity: item.quantity - 1 } : item
            );
        });
    }, []);

    const removeCartItem = useCallback((id) => {
        setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
    }, []);

    const onFormSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const typedSearch = formData.get('searchTerm')?.toString().trim() || '';
        setSearchTerm(typedSearch);
    };

    const fetchProducts = useCallback((term) => {
        const normalizedTerm = term?.toString().trim() || '';
        let url = 'https://dummyjson.com/products/';

        if (normalizedTerm.length > 2) {
            url = `https://dummyjson.com/products/search?q=${encodeURIComponent(normalizedTerm)}`;
        }

        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                setProducts(Array.isArray(data.products) ? data.products : []);
            })
            .catch((error) => {
                console.error('Error fetching products:', error);
                setProducts([]);
            });
    }, []);

    useEffect(() => {
        fetchProducts(searchTerm);
    }, [fetchProducts, searchTerm]);

    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-md-8">
                    <form className="mb-3" onSubmit={onFormSubmit}>
                        <div className="input-group">
                            <input type="text" name="searchTerm" className="form-control" placeholder="Search products..." />
                            <button className="btn btn-primary" type="submit">Search</button>
                            <button className="btn btn-secondary" type="button" onClick={() => setSearchTerm('')}>
                                Clear
                            </button>
                        </div>
                    </form>
                    <ul className="list-group">
                        {products.length === 0 ? (
                            <li className="list-group-item">No products found.</li>
                        ) : (
                            products.map((product) => (
                                <li key={product.id} className="list-group-item d-flex justify-content-between align-items-center">
                                    <span>
                                        {product.title} ({product.category})
                                    </span>
                                    <span>
                                        <span className="me-3">
                                            <strong>{symbol}{Number(product.price).toFixed(2)}</strong>
                                        </span>
                                        <button onClick={() => addToCart(product)} className="btn btn-sm btn-success ms-2">
                                            Add to Cart
                                        </button>
                                    </span>
                                </li>
                            ))
                        )}
                    </ul>
                </div>

                <div className="col-md-4">
                    <h5>Total Amount: {symbol}{totalAmount.toFixed(2)}</h5>
                    <ul className="list-group">
                        {cartItems.map((item) => (
                            <CartItem
                                key={item.id}
                                item={item}
                                increaseQuantity={increaseQuantity}
                                decreaseQuantity={decreaseQuantity}
                                removeCartItem={removeCartItem}
                                symbol={symbol}
                            />
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}