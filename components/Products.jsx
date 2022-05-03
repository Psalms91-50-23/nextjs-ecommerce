import React, { useEffect, useState } from 'react';
import Product from './Product';
import { AiOutlineSearch } from 'react-icons/ai';

const Products = ({ products, bannerData }) => {

    const [filteredProducts, setFilteredProducts] = useState(products);
    const [options, setOptions] = useState("all")
    const [name, setName] = useState("")

    useEffect(() => {
        if(name && options === "all"){
            const productsFiltered = products.filter((product) => {
                if(product.name.toLowerCase().includes(name.toLowerCase())){
                    return product;
                }
            })
            setFilteredProducts(productsFiltered)
        }
        else if(!name && options !== "all"){
            const productsFiltered = products.filter((product) => {
                if(product.category.includes(options)){
                    return product;
                }
            })
            setFilteredProducts(productsFiltered)
        }
        else if(name && options !== "all"){
            const productsFiltered = products.filter((product) => {
                if(product.name.toLowerCase().includes(name.toLowerCase()) && product.category.includes(options)){
                    return product;
                }
            })
            setFilteredProducts(productsFiltered)
        }else{
            setFilteredProducts(products)
        }
    }, [name,options])
    
  return (
      <>
        <div className="searchbar-container">
            <div className="searchbar-content">
                <div 
                    className="searchbar-bg"
                >
                    <input 
                        name="name"
                        type="text"
                        className="search-input"
                        autoComplete="off"
                        onChange={e => setName(e.target.value)}
                    />
                    <span className="search-icon-container">
                        <AiOutlineSearch className="search-icon"/>
                    </span>
                </div>
                <div className="select-options-container">
                    <select
                        name="categoryField" 
                        className="select"
                        onChange={e => setOptions(e.target.value)}
                    >
                        <option value="all">All</option>
                        <option value="wireless">Wireless</option>
                        <option value="computer">Computer</option>
                        <option value="accessory">Accessory</option>
                        <option value="gaming">Gaming</option>
                        <option value="music">Music</option>
                        <option value="laptop">Laptop</option>
                        <option value="audio">Audio</option>
                        <option value="speaker">Speaker</option>
                        <option value="tablet">Tablet</option>
                    </select>
                </div>
            </div>
        </div>
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