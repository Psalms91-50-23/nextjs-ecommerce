import React, { useEffect } from 'react';
import Link from 'next/link';
import { BsBagCheckFill } from 'react-icons/bs';
import { useStateContext } from '../context/StateContext';
import { fireworksExplosion } from '../lib/utils';

const Success = () => {

    const {
        setCartItems,
        setTotalPrice,
        setTotalQuantities
    } = useStateContext();

    useEffect(() => {
        localStorage.clear();
        setCartItems([]);
        setTotalPrice(0);
        setTotalQuantities(0);
        fireworksExplosion();
    }, [])
    
  return (
    <div className="success-wrapper">
        <div className="success">
            <p className="icon">
                <BsBagCheckFill />
            </p>
            <h2>Thank you for your purchase. Please come again!</h2>
            <p className="description">
                If you have any questions please email
                <a className="email" href="mailto:order-response@example.com">
                    order-response@example.com
                </a>
            </p>
            <Link href="/">
                <button className="btn extra-padding" type="button" width="300px">
                    Continue Shopping
                </button>
            </Link>
        </div>
    </div>
  )
}

export default Success