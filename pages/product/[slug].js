import React, { useState } from 'react';
import { client, urlFor } from '../../lib/client';
import { AiOutlineMinus, AiOutlinePlus, AiFillStar, AiOutlineStar } from 'react-icons/ai';

const ProductDetails = ({ product: { image, name, details, price }, products, bannerData }) => {
    const { discount } = bannerData[0];
    const discountNum = 1-(Number(discount.slice(0,2)/100));
    const [hover, setHover] = useState(false);
    const [imageIndex, setImageIndex] = useState(0)
  return (
    <div>
        <div className="product-detail-container">
            <div>
                <div className="product-image-container">
                    <div className="image-container">
                        <div 
                            className={hover ? "product-details-hover" : "product-details-notHover"}
                            >
                            <p>{discount.slice(0,4)}</p>
                            <p className={hover ? "off-hover" : "off-not-hover"}>Off</p>
                        </div>
                        <img 
                            className="product-detail-image"
                            src={urlFor(image && image[imageIndex])} 
                            alt={name}
                            onMouseEnter={() => setHover(true)}
                            onMouseLeave={() => setHover(false)}
                        >
                        </img>
                    </div>
                <div 
                    className="small-images-container"
                    >
                    {image.map((item,index) => (
                        <img 
                            src={urlFor(item)} 
                            className={"small-image"}
                            onMouseEnter={() => setImageIndex(index)}
                            // onClick={""}
                            key={index}
                        />
                    ))}
                </div>
                </div>
                <div className="product-details-desc">
                    <h1>{name}</h1>
                    <div className="reviews">
                        <div className="stars-container">
                            <AiFillStar />
                            <AiFillStar />
                            <AiFillStar />
                            <AiFillStar />
                            <AiOutlineStar />
                        </div>
                        <p>(20)</p>
                    </div>
                    <h4>Details :</h4>
                    <p>{details}</p>
                    <div className="price-container">
                        <p className="product-price">$ {(price).toFixed(2)}</p>
                        <p className="product-discounted-price">$ {(price*discountNum).toFixed(2)}</p>
                    </div>
                    <div className="quantity">
                        <h3>Quantity</h3>
                        <div className="quantity-desc">
                            <span className="minus">
                                <AiOutlineMinus />
                            </span>
                            <span className="num">{0}</span>
                            <span className="plus">
                                <AiOutlinePlus />
                            </span>
                        </div>
                        <div className="buttons">
                            <button 
                                type="buttons"
                                className="add-to-cart"
                                // onClick={""}
                                >
                                    Add to Cart
                            </button>
                            <button 
                                type="buttons"
                                className="buy-now"
                                // onClick={""}
                                >
                                    Buy Now
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export const getStaticPaths = async () => {
    const query = `*[_type == "product"] {
        slug {
            current
        }
    } 
    `
    const products = await client.fetch(query);
    const paths = products.map((product) => ({
        params: {
            slug: product.slug.current
        }
    }))

    return {
        paths,
        fallback: 'blocking'
    }
}

export const getStaticProps = async ({ params: { slug }}) => {
    const query = `*[_type == "product" && slug.current == '${slug}'][0]`;
    const productsQuery = '*[_type == "product"]'
    const product = await client.fetch(query);
    const products = await client.fetch(productsQuery);

    const bannerQuery = '*[_type == "banner"]';
    const bannerData = await client.fetch(bannerQuery);
    return {
      props: { products, product, bannerData }
    }
}

export default ProductDetails