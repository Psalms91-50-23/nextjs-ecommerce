import React, { useEffect, useState } from 'react';
import { client } from '../lib/client';
import { Products, FooterBanner, HeroBanner } from '../components';
import { images } from '../images';

// function filteredProducts(data, findProduct){

//   console.log(findProduct);
//   const [originalProductData, setOriginalProductData] = useState(data)
//   const [filteredProducts, setFilteredProducts] = useState(second)

//   const productsFiltered = originalProductData.filter((product) => {
//     if(product.name.toLowerCase().includes(findProduct.toLowerCase())){
//       return product
//     }
//   })

//   return productsFiltered;

// }

const Home = ({ products, bannerData }) => (
  
  <div>
    <HeroBanner heroBanner={bannerData.length && bannerData[0]} images={images}/>
    {/* {console.log({products})} */}
    <div className="products-heading">
      <h2>Best Seller Products</h2>
      <p>Latest technologies in the market!</p>
    </div>
    <Products products={products} bannerData={bannerData}/>
    {/* <div className="filter-products">
      <input 
        type="text" 
        onChange={e => filteredProducts(products,e)}
        />
    </div> */}
    <FooterBanner footerBanner={bannerData && bannerData[0]}/>
  </div>
);

//useEffect version in next
export const getServerSideProps = async () => {
  const query = '*[_type == "product"]';
  const products = await client.fetch(query);
  // console.log({products});
  const bannerQuery = '*[_type == "banner"]';
  const bannerData = await client.fetch(bannerQuery);

  return {
    props: { products, bannerData }
  }
}

export default Home;