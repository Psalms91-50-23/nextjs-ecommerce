import React, { createContext, useContext, useState } from "react";
import { toast } from "react-hot-toast";

const Context = createContext();

export const StateContext = ({ children }) => {
    const [showCart, setShowCart] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalQuantities, setTotalQuantities] = useState(0);
    const [qty, setQty] = useState(1);

    const increaseQty = () => {
        setQty((prevQty) => prevQty + 1);
    }

    const decreaseQty = () => {
        setQty((prevQty) => {
            if(prevQty - 1 < 1) return 1;
            return prevQty - 1;
          });
    }

    const increaseCartItemQty = ( cartItemId ) => {
        setCartItems(cartItems.map((item) => {
            if(item._id === cartItemId){
                setTotalPrice((prevTotalPrice) => prevTotalPrice + Number((1 * item.price) * item.discountPercent));
                return {...item, quantity: item.quantity + 1, itemTotal: Number(((item.quantity+1) * item.price) * item.discountPercent)};
            }else{
                return item;
            }
        }))
        setTotalQuantities((prevQty) => prevQty + 1);   
    }

    const decreaseCartItemQty = ( cartItemId, cartItemQty ) => {
        if(cartItemQty > 1){
            var totalCartQty = 0;
            setCartItems(cartItems.map((item) => {
                if(item._id === cartItemId){
                    totalCartQty += item.quantity - 1;
                    setTotalPrice((prevTotalPrice) => prevTotalPrice - Number((1 * item.price) * item.discountPercent));
                    return {...item, quantity: item.quantity - 1, itemTotal: Number(((item.quantity - 1) * item.price) * item.discountPercent)};
                }else{
                    totalCartQty += item.quantity;
                    return item;
                }
            }))
            setTotalQuantities(totalCartQty);
        }
    }

    const addProduct = (product, quantity, discount) => {
        const checkProductInCart = cartItems.find((item) => item._id === product._id);
        if(checkProductInCart){
          const updateCartItems = cartItems.map((cartProduct) => {
                if(cartProduct._id === product._id) {
                    setTotalQuantities((prevQty) => prevQty + quantity); 
                    setTotalPrice((prevTotalPrice) => Number(prevTotalPrice + (product.discountPrice * quantity)));
                    return {
                        ...cartProduct, 
                        quantity: cartProduct.quantity + quantity,
                        discountPercent: discount,
                        discountPrice: Number(cartProduct.price * discount),
                        itemTotal: Number((((quantity + cartProduct.quantity) * cartProduct.price) * discount))
                    }
                } else {
                    setTotalQuantities((prevQty) => prevQty + quantity);
                    return cartProduct;
                }  
            })
            setCartItems(updateCartItems);
            toast.success(`${qty} ${product.name} added to the cart.`);
        } else {
            product.quantity = quantity;
            product.discountPercent = discount;
            product.discountPrice = Number(product.price * discount);
            product.itemTotal = Number((product.price * quantity) * discount);
            product.price = Number(product.price); 
            setTotalPrice((prevTotalPrice) => Number(prevTotalPrice + (product.discountPrice * quantity)));
            setCartItems([ ...cartItems, { ...product }]);
            setTotalQuantities((prevQty) => prevQty + quantity);
            toast.success(`${qty} ${product.name} added to the cart.`);
        }
    }

    const removeProduct = ( productId ) => {

        const itemFound = cartItems.find((item) => item._id === productId)
        if(itemFound){
            cartItems.find((item) => {
                if(item._id === productId){
                    setTotalQuantities((prevQty) => prevQty - item.quantity);
                    setTotalPrice((prevPrice) => {
                        return (prevPrice - (Number((item.quantity * item.price) * item.discountPercent).toFixed(2)));
                    })
                }
            })
            setCartItems(cartItems.filter((item) => item._id !== productId))
        }
    }
    return (
        <Context.Provider
            value={{
                showCart,
                cartItems,
                totalPrice,
                totalQuantities,
                qty,
                increaseQty,
                decreaseQty,
                addProduct,
                setShowCart,
                setTotalQuantities,
                decreaseCartItemQty,
                increaseCartItemQty,
                removeProduct,
                setCartItems,
                setTotalPrice
            }}
        >
            {children}
        </Context.Provider> 
    )
}

export const  useStateContext = () => useContext(Context);