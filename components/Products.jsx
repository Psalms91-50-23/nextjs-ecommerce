import React, { useEffect, useState } from 'react';
import Product from './Product';
import { AiOutlineSearch } from 'react-icons/ai';

const Products = ({ products, bannerData }) => {

    // const [originalProductsData, setOriginalProductsData] = useState(products);
    const [filteredField, setFilteredField] = useState({ name: "", categoryField: "all"});
    const { name, categoryField } = filteredField;
    const [filteredProducts, setFilteredProducts] = useState(products);
    const [category, setCategory] = useState("all")

    const handleChange = (e) => {
        // console.log(e.target.value);
        const findProduct = e.target.value;
        if(!e.target.value.length){
            setFilteredProducts(products);
        }

        const productsFiltered = products.filter((product) => {
            if(product.name.toLowerCase().includes(findProduct.toLowerCase())){
                return product;
            }
        })
        if(productsFiltered.length){
            setFilteredProducts(productsFiltered)
        }else{
            setFilteredProducts(products)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();

    }

    console.log({categoryField});
    console.log({name});
  return (
      <>
        <div className="searchbar-container">
            <div className="searchbar-content">
                <form 
                    onSubmit={(e) => handleSubmit(e) }
                    className="searchbar-bg"
                    // onSubmit={(e) => handleSubmit(e)}
                >
                    <input 
                        name="name"
                        type="text"
                        className="search-input"
                        onChange={(e) => setFilteredField({...filteredField, [e.target.name]:e.target.value})}
                        // onChange={e => handleChange(e)}
                    />
                    <span className="search-icon-container">
                        <AiOutlineSearch className="search-icon"/>
                    </span>
                </form>
                <div className="select-options-container">
                    <select
                        name="categoryField" 
                        className="select"
                        onChange={(e) => setFilteredField({...filteredField, [e.target.name]:e.target.value})}
                    >
                        <option value="all">All</option>
                        <option value="headphone">Headphone</option>
                        <option value="computer">Computer</option>
                        <option value="accessory">Accessory</option>
                        <option value="gaming">Gaming</option>
                        <option value="music">Music</option>
                        <option value="audio">Audio</option>
                    </select>
                </div>
            </div>
        </div>
        {
            console.log({products})
        }
        <div className="products-container">
            {filteredProducts?.map((product) => (
            <Product 
            key={product._id} 
            product={product}
            discount={bannerData.length && bannerData[0].discount}
            />))}
        </div>
      </>
  )
}

export default Products