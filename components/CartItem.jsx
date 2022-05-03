import React from 'react';
import { urlFor } from '../lib/client';
import { useStateContext } from '../context/StateContext';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import { ImCross } from "react-icons/im";

const CartItem = ({ item }) => {
    const { 
        increaseCartItemQty,
        decreaseCartItemQty,
        removeProduct
       } = useStateContext();
    
  return (
    <div className="product" >
        <img 
            src={urlFor(item?.image[0])}
            className="cart-product-image"
        />
        <div className="item-desc">
            <div className="flex top">
                <h5 className="cart-product-name">{item.name}</h5>
                <button
                    type="button"
                    className="remove-item"
                    onClick={() => removeProduct(item._id)}
                >
                    <ImCross size={20}/>
                </button>
                <div className="product-cart-price-container">
                    <h6 className="product-price">$ {Number(item.price.toFixed(2))}</h6>
                    <h6 className="product-discounted-price">$ {Number(item.discountPrice.toFixed(2))}</h6>
                </div>
                <div className="quantity-desc-container">
                    <div className="cart-item-quantity">
                    <span 
                        className="minus"
                        onClick={() => decreaseCartItemQty(item._id,item.quantity)}
                    >
                        <AiOutlineMinus />
                    </span>
                    <span className="num">
                        {item.quantity}
                    </span>
                    <span 
                        className="plus"
                        onClick={() => increaseCartItemQty(item._id,item.quantity)}
                    >
                        <AiOutlinePlus />
                    </span>
                    </div>
                </div>
                <div className="subtotal">
                    <h6>Total Item Cost: {`$${item.itemTotal.toFixed(2)}`}</h6>
                </div>
            </div>
        </div>
    </div>
  )
}

export default CartItem