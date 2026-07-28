import { memo } from 'react';

const CartItem = ({ item, increaseQuantity, decreaseQuantity, removeCartItem, symbol }) => {
    return (
        <li className="list-group-item d-flex justify-content-between align-items-center">
            <span>{item.name}</span>
            <span className="d-flex align-items-center gap-2">
                <strong>{symbol}{(item.price * item.quantity).toFixed(2)}</strong>
                <button onClick={() => decreaseQuantity(item.id)} className="btn btn-sm btn-outline-secondary">
                    <i className="bi bi-dash-circle"></i>
                </button>
                <span>{item.quantity}</span>
                <button onClick={() => increaseQuantity(item.id)} className="btn btn-sm btn-success">
                    <i className="bi bi-plus-circle"></i>
                </button>
                <button onClick={() => removeCartItem(item.id)} className="btn btn-sm btn-danger">
                    <i className="bi bi-trash"></i>
                </button>
            </span>
        </li>
    );
};

export default memo(CartItem);