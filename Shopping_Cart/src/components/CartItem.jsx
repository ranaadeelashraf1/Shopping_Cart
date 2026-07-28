import { memo } from "react";

const CartItem = ({item, increaseQuantity, decreaseQuantity, removeCartItem, symbol}) => {

    console.log("CartItem rendered", item.name);

    return (
        <li className="list-group-item d-flex justify-content-between align-items-center">
            {item.name}
            <span>
                <strong>{symbol}{(item.price * item.quantity).toFixed(2)}</strong>
            </span>
            <span className='d-flex'>
                <button onClick={() => increaseQuantity(item.id)} className="btn btn-sm btn-success ms-2"><i className="bi bi-plus-circle"></i></button>
                <span className='mr-2 ml-2'>{item.quantity}</span>

                {
                    item.quantity == 1 ? <button onClick={()=>{removeCartItem(item.id)}} className="btn btn-sm btn-danger ms-2"><i className="bi bi-trash"></i></button> : <button onClick={()=>{decreaseQuantity(item.id)}} className="btn btn-sm btn-success ms-2"><i className="bi bi-slash-circle"></i></button>
                }

            </span>
        </li>
    );
};

export default memo(CartItem);