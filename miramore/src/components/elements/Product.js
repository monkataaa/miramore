import React from 'react'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';


const Product = ({ productData }) => {
    return (
        <figure className='gallery figure'>
            <h1>{productData.title}</h1>
            <img src={productData.imageUrl} className='.gallery figure img' alt="" />
            <figcaption className='gallery figure figcaption'>
                        {productData.description} 
                        
                
                <br />                
                <small className="small">{productData.price}лв</small>
                <Link  to={`/details/${productData._id}`}> Детайли... </Link>
            </figcaption>
        </figure>
    )
}

export default Product