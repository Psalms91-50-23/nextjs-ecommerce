import React from 'react';
import Link from 'next/link';
import { urlFor } from '../lib/client';

const Product = ({ 
  product: { image, name, price, slug }, discount }) => {
    const discountNum = 1-(Number(discount.slice(0,2)/100));
  return (
      <Link href={`/product/${slug.current}`}>
      <div className="product-card">
        <div className="sale-discount-container">
          <p>{discount.slice(0,4)}</p>
          <p className="off">Off</p>
        </div>
          <img 
            className="product-image"
            src={urlFor(image && image[0])} 
            alt={name} 
            width={250}
            height={250}
          />
          <p className="product-name">{name}</p>
          <div className="price-container">
            <p className="product-price">$ {(price).toFixed(2)}</p>
            <p className="product-discounted-price">$ {(price*discountNum).toFixed(2)}</p>
          </div>
      </div>
      </Link>
  )
}

export default Product