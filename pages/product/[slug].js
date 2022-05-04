import React, { useState, useEffect } from 'react';
import { client, urlFor } from '../../lib/client';
import { 
    AiOutlineMinus, AiOutlinePlus, AiFillStar, 
    AiOutlineStar, AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';
import { HiShoppingCart } from 'react-icons/hi';
import { RiHandbagFill } from 'react-icons/ri';
import ProductSlider from '../../components/ProductSlider';
import { useStateContext  } from '../../context/StateContext';

const ProductDetails = ({ product, products, bannerData }) => {
    const { image, name, details, price } = product;
    const { discount } = bannerData[0];
    const discountNum = 1-(Number(discount.slice(0,2)/100));
    const [hover, setHover] = useState(false);
    const [imageIndex, setImageIndex] = useState(0);
    const [sliderProductFiltered, setSliderProductFiltered] = useState(products);
    // const [filter, setFilter] = useState(false);
    const { 
        decreaseQty, 
        increaseQty, 
        qty, 
        addProduct,
        setShowCart } = useStateContext();

    useEffect(() => {
        setSliderProductFiltered(products.filter(item => item.name !== name));
    },[name])

    const nextImage = () => {
        if(imageIndex < image.length-1){
            setImageIndex(imageIndex+1)
        }else if (imageIndex === image.length-1){
            setImageIndex(0)
        }
    }

    const previousImage = () => {
        if(imageIndex > 0 ){
            setImageIndex(imageIndex-1)
        }else if (imageIndex === 0){
            setImageIndex(image.length-1)
        }
    }

    const handleBuyNow = () => {
        addProduct(product, qty, discountNum);
        setShowCart(true)
    }
  return (
        <div className="product-detail-container">
            <div>
                <div className="product-details-imageContainer">
                    <div className="product-image-container">
                        <div className="image-container">
                            <div 
                                className={hover ? "product-details-hover" 
                                : "product-details-notHover"}
                            >
                                <p>{discount.slice(0,4)}</p>
                                <p className={hover ? "off-hover" : "off-not-hover"}>Off</p>
                            </div>
                            <div className="image-button-container">
                                <img 
                                    className="product-detail-image"
                                    src={urlFor(image && image[imageIndex])} 
                                    alt={name}
                                    onMouseEnter={() => setHover(true)}
                                    onMouseLeave={() => setHover(false)}
                                />
                                <span 
                                    className="left-arrow"
                                    onClick={previousImage}
                                >
                                    <AiOutlineLeft size={30}/>
                                </span>
                                <span 
                                    className="right-arrow"
                                    onClick={nextImage}
                                >
                                    <AiOutlineRight size={30}/>
                                </span>
                            </div>
                        </div>
                    <div className="small-images-container">
                        {image.map((imgUrl,index) => (
                            <img 
                                src={urlFor(imgUrl)} 
                                className={imageIndex === index ? "small-image selected-image" : "small-image"}
                                onMouseEnter={() => setImageIndex(index)}
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
                            <p className="product-price">$ {Number(price.toFixed(2))}</p>
                            <p className="product-discounted-price">$ {Number((price*discountNum).toFixed(2))}</p>
                        </div>
                        <div className="quantity">
                            <div className="quantity-container">
                                <h4>Quantity</h4>
                                <div className="quantity-desc">
                                    <span 
                                        className="minus"
                                        onClick={decreaseQty}
                                    >
                                        <AiOutlineMinus />
                                    </span>
                                    <span className="num">{qty}</span>
                                    <span 
                                        className="plus"
                                        onClick={increaseQty}
                                    >
                                        <AiOutlinePlus />
                                    </span>
                                </div>
                            </div>
                            <div className="buttons">
                                <button 
                                    type="buttons"
                                    className="add-to-cart"
                                    onClick={() => addProduct(product, qty, discountNum)}
                                >
                                    <span className="shopping-cart-icon">
                                        <HiShoppingCart />
                                    </span>
                                    Add to Cart
                                </button>
                                <button 
                                    type="buttons"
                                    className="buy-now"
                                    onClick={handleBuyNow}
                                 >
                                     <span className="buy-now-icon">
                                         <RiHandbagFill />
                                     </span>
                                        Buy Now
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="maylike-products-wrapper">
                    <h2>You may also like</h2>
                    <div className="marquee">
                        <div className="maylike-products-container track">
                        {sliderProductFiltered?.map((product) => {
                            return (
                            <ProductSlider 
                                key={product._id} 
                                product={product} 
                                discount={discount}
                            />)
                        })
                        }
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