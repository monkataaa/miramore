import React from 'react'
import { BrowserRouter as Route, Link } from 'react-router-dom';



const Product = ({ productData }) => {
    return (
        <div className="gallery">
            <p className="galleryTitle">{productData.title}</p>
            <Link to={`/details/${productData._id}`}>
                <img className="galleryImg" src={productData.miniImageUrl} alt="Cinque Terre" />
                <div className="desc">{productData.description}</div>
                <span className="price">{productData.price}лв.</span>
            </Link >
        </div>

        /* <Link to={`/details/${productData._id}`}>
            <figure className='gallery figure'>
                <h1>{productData.title}</h1>
                <img src={productData.imageUrl} className='.gallery figure img' alt="" />
                <figcaption className='gallery figure figcaption'>
                    {productData.description}


                    <br />
                    <small className="small">{productData.price}лв</small>

                </figcaption>
            </figure>
        </Link> */
    )
}


export default Product