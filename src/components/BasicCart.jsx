import { useState, useCallback, useEffect } from 'react';
import CartItem from './CartItem';

export default function BasicCart() {

    const symbol = '$';

    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [cartItems, setCartItems] = useState([]);
    
    const isCartEmpty = cartItems.length === 0;
    const totalAmount = cartItems.reduce((subTotal, current) => {
        return (current.price * current.quantity) + subTotal;
    }, 0);

    const addToCart = ({id, name, price}) => {

        if(isCartEmpty){
            const newCartItem = { id, name, price, quantity: 1 };
            setCartItems([...cartItems, newCartItem]);
        }else{
            const foundCartItem = findCartProductById(id);
            if(foundCartItem){
                increaseQuantity(id)
            }else{
                const newCartItem = { id, name, price, quantity: 1 };
                setCartItems([...cartItems, newCartItem]);
            }
        }
    }

    const increaseQuantity = useCallback((id) => {
        setCartItems(prevItems => prevItems.map(item => {
            if (item.id === id) {
                return { ...item, quantity: item.quantity + 1 };
            }
            return item;
        }));
    }, []);

    const decreaseQuantity = useCallback((id) => {
        setCartItems(prevItems => {
            const foundCartItem = prevItems.find(item => item.id === id);

            if(foundCartItem && foundCartItem.quantity <= 1){
                return prevItems.filter(item => item.id !== id);
            }else{
                return prevItems.map(item => {
                    if (item.id === id) {
                        return { ...item, quantity: item.quantity - 1 };
                    }
                    return item;
                });
            }
        });
    }, []);

    const removeCartItem = useCallback((id) => {
        setCartItems(prevItems => prevItems.filter(item => item.id !== id));
    }, []);

    const findCartProductById = (id) => {
        return cartItems.find(item => item.id === id);
    }

    const onFormSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const searchTerm = formData.get('searchTerm');
        setSearchTerm(searchTerm);
    }

    const fetchProducts = useCallback((searchTerm) => {
        console.log("Searching products with term:", searchTerm);
        // Simulate fetching products from an API
        console.log("Fetching products...");

        let url= 'https://dummyjson.com/products/';

        if(searchTerm.length > 2){
            url = `https://dummyjson.com/products/search?q=${searchTerm}`;
        }

        fetch(url).then(response => response.json()).then(data => {
            console.log(data);
            setProducts(data.products);
        }).catch(error => {
            console.error("Error fetching products:", error);
        });


    }, []);

    useEffect(() => {
        fetchProducts(searchTerm);
    }, [searchTerm]);

    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-md-8">
                    <form className="mb-3" onSubmit={(e) => { onFormSubmit(e) }}>
                        <div className="input-group">
                            <input type="text" name="searchTerm" className="form-control" placeholder="Search products..."  />
                            <button className="btn btn-primary" type="submit">Search</button>
                            <button className="btn btn-secondary" type="button" onClick={() => setSearchTerm('')}>Clear</button>
                        </div>
                    </form>
                    <ul className="list-group">
                        {
                            products.length === 0 ? (
                                <li className="list-group-item">No products found.</li>
                            ) :
                            products.map(product => (
                                <li key={product.id} className="list-group-item d-flex justify-content-between align-items-center">
                                    {product.title} ({product.category})
                                    <span>
                                        <span className="mr-4">
                                            <strong>{symbol}{product.price.toFixed(2)}</strong>
                                        </span>
                                        <button onClick={()=>{addToCart(product)}} className="btn btn-sm btn-success ms-2">Add to Cart</button>
                                    </span>
                                </li>
                            ))
                        }
                    </ul>
                </div>
                <div className="col-md-4">
                    <h5>Total Amount: {symbol}{totalAmount.toFixed(2)}</h5>
                    <ul className="list-group">
                        {
                            cartItems.map(item => (
                                <CartItem
                                    key={item.id}
                                    item={item}
                                    increaseQuantity={increaseQuantity}
                                    decreaseQuantity={decreaseQuantity}
                                    removeCartItem={removeCartItem}
                                    symbol={symbol}
                                />
                            ))
                        }
                        
                    </ul>
                </div>
            </div>
        </div>
    );
}