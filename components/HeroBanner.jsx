import React from 'react'
import Link from "next/link";

import { urlFor } from '../lib/client';

const HeroBanner = ({ heroBanner, images }) => {
    // console.log({images});
    // console.log(imgHalved.src);
  return (
    <div className="hero-banner-container">
        <div>
            <p className="beats-solo">
                {heroBanner.smallText}
            </p>
            <h3 className="hero-banner-midText">{heroBanner.midText}</h3>
            <h1 className="hero-banner-largeText">{heroBanner.largeText1}</h1>
            <img 
                className="hero-banner-image"
                src={urlFor(heroBanner.image.asset._ref)} 
                alt={heroBanner.product}
            />
            {images && (
                <img 
                    className="halved-image"
                    src={images.halved_headPhone.src} 
                    alt="headphone x halve" 
                />
                )
            }
            <div>
                <Link href={`/product/${heroBanner.product}`}>
                    <button type="button">
                        {heroBanner.buttonText}
                    </button>
                </Link>
                <div className="desc">
                    <h5>Description</h5>
                    <p>{heroBanner.desc}</p>
                </div>
            </div>
        </div>
    </div>
  )
}
//className="button-desc-container"
export default HeroBanner