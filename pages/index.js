import React from 'react';
import { client } from '../lib/client';
import { Products, FooterBanner, HeroBanner } from '../components';
import { images } from '../images';

const Home = ({ products, bannerData }) => (
  <div>
    <HeroBanner heroBanner={bannerData.length && bannerData[0]} images={images}/>
    <div className="products-heading">
      <h2>Best Seller Products</h2>
      <p>Latest technologies in the market!</p>
    </div>
    <Products products={products} bannerData={bannerData}/>
    <FooterBanner footerBanner={bannerData && bannerData[0]}/>
  </div>
);

//useEffect version in next
export const getServerSideProps = async () => {
  const query = '*[_type == "product"]';
  const products = await client.fetch(query);
  const bannerQuery = '*[_type == "banner"]';
  const bannerData = await client.fetch(bannerQuery);

  return {
    props: { products, bannerData }
  }
}

export default Home;