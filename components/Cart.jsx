import React, { useRef } from 'react';
import Link from 'next/link';
import {  AiOutlineLeft, AiOutlineShopping } from 'react-icons/ai';
import { useStateContext } from '../context/StateContext';
import { toast } from 'react-hot-toast';
import CartItem from './CartItem';
import getStripe from '../lib/getStripe';

const Cart = () => {
  const cartRef = useRef();

  const { 
    totalPrice, 
    totalQuantities, 
    cartItems, 
    setShowCart } = useStateContext();

  const handleCheckout = async () => {

    const checkOutItems = cartItems.map((item) => {
      item.itemTotal = Number(item.itemTotal.toFixed(2));
      item.discountPrice = Number(item.discountPrice.toFixed(2));
      item.discountPercent = Number(((1-item.discountPercent)*100).toFixed(0));
      return item;
    })
    
    const stripe = await getStripe();
    const response = await fetch("/api/stripe", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({cartItems: checkOutItems}), 
    })
    if(response.statusCode === 500) return ;
    const data = await response.json();
    toast.loading('Redirecting...');
    stripe.redirectToCheckout({ sessionId: data.id });
  }
  return (
    <div className="cart-wrapper" ref={cartRef}>
      <div className="cart-container">
        <div className="cart-content">
          <button
            type="button"
            className="cart-heading"
            onClick={() => setShowCart(false)}>
              <AiOutlineLeft />  
            <span className="heading">
              Your Cart
            </span>
            <span className="cart-num-items">({totalQuantities} items)</span>
          </button>
          {cartItems.length < 1 && (
            <div className="empty-cart">
                <AiOutlineShopping size={150}/>
                <h3>Your shopping bag is empty</h3>
                <Link href="/">
                  <button 
                    type="button"
                    onClick={() => setShowCart(false)}
                    className="btn extra-padding"
                  >
                    Continue Shopping
                  </button>
                </Link>
            </div>
          )
          }
          <div className="product-container">
            {cartItems.length >= 1 && cartItems.map((item) => (
              <CartItem item={item} key={item._id} />
            ))}
          </div>
          {
            cartItems.length >= 1 && (
              <div className="cart-stripe-container">
                <div className="cart-subtotal">
                  <h4>SubTotal:</h4>
                  <h4 className="subtotal-value">$ {totalPrice.toFixed(2)}</h4>
                </div>
                <div className="btn-container">
                  <button 
                    type="button" 
                    className="btn" 
                    onClick={handleCheckout}
                  >
                    Pay with Stripe
                  </button>
                </div>               
              </div>
            )
          }
        </div>
        <div 
          className="background-click"
          onClick={() => setShowCart(false)}
        >
        </div>
      </div>
    </div>
  )
}

export default Cart