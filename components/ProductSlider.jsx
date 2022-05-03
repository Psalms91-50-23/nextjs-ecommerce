import React from 'react';
import Link from 'next/link';
import { urlFor } from '../lib/client';

const ProductSlider = ({
    product: { image, name, price, slug }, discount
}) => {
    const discountNum = 1-(Number(discount.slice(0,2)/100));
  return (
    <div className="slider-image-container">
        <Link href={`/product/${slug.current}`}>
            <div className="image-slider-content">
                <div className="slider-discount-container">
                    <p className="slider-discount">{discount.slice(0,4)}</p>
                    <p className="slider-off">Off</p>
                </div>
                <img 
                    className="slider-image"
                    src={urlFor(image && image[0])} 
                    alt={name} 
                />
                <p className="slider-product-name">{name}</p>
                <div className="slider-price-container">
                    <p className="slider-product-price">$ {(price).toFixed(2)}</p>
                    <p className="slider-product-discounted-price">$ {(price*discountNum).toFixed(2)}</p>
                </div>
            </div>
        </Link>
    </div>
  )
}

export default ProductSlider