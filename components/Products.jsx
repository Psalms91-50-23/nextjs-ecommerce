import React, { useEffect, useState } from 'react';
import Product from './Product';
import { AiOutlineSearch } from 'react-icons/ai';

const Products = ({ products, bannerData }) => {

    // const [originalProductsData, setOriginalProductsData] = useState(products);
    // const [filteredField, setFilteredField] = useState({ name: "", categoryField: "all"});
    // const { name, categoryField } = filteredField;
    const [filteredProducts, setFilteredProducts] = useState(products);
    const [category, setCategory] = useState("all")
    const [name, setName] = useState("")

    useEffect(() => {
        // console.log({products});
        console.log({name});
        console.log({category});
        
        console.log("-1");
        if(name && category === "all"){
            console.log("0");
            const productsFiltered = products.filter((product) => {
                console.log({product});
                if(product.name.toLowerCase().includes(name.toLowerCase())){
                    return product;
                }
            })
            setFilteredProducts(productsFiltered)
            console.log({productsFiltered});
            // setFilteredProducts(products);
        }
        else if(!name && category !== "all"){
            console.log("2");
            const productsFiltered = products.filter((product) => {
                console.log({product});
                if(product.category.includes(category)){
                    return product;
                }
            })
            console.log({productsFiltered});
            setFilteredProducts(productsFiltered)
        }
        else if(name && category !== "all"){
            console.log("3");
            // console.log("name not falsy and field not all");
            const productsFiltered = products.filter((product) => {
                console.log({product});
                if(product.name.toLowerCase().includes(name.toLowerCase()) && product.category.includes(category)){
                    return product;
                }
            })
            console.log({productsFiltered});
            setFilteredProducts(productsFiltered)
        }else{
            setFilteredProducts(products)
        }
    }, [name,category])
    
    const handleTextChange = (e) => {
        e.preventDefault();
        setName(e.target.value)

    }

    const handleOptionChange = (e) => {
        e.preventDefault();
        setCategory(e.target.value)
    }
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
                        autocomplete="off"
                        onChange={e => handleTextChange(e)}
                    />
                    <span className="search-icon-container">
                        <AiOutlineSearch className="search-icon"/>
                    </span>
                </div>
                <div className="select-options-container">
                    <select
                        name="categoryField" 
                        className="select"
                        onChange={e => handleOptionChange(e)}
                    >
                        <option value="all">All</option>
                        <option value="wireless">Wireless</option>
                        <option value="computer">Computer</option>
                        <option value="accessory">Accessory</option>
                        <option value="gaming">Gaming</option>
                        <option value="music">Music</option>
                        <option value="laptop">Laptop</option>
                        <option value="desktop">Desktop</option>
                        <option value="audio">Audio</option>
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