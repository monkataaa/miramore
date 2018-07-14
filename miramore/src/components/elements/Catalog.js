import React, { Component } from 'react'
import reqHandler from '../../utils/reqHandler';
import Product from './Product';
import observer from '../../utils/observer'

// import Post from '../partials/Post';

class Catalog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: []
        }
    }
    componentDidMount() {
        // observer.trigger(observer.events.notification, { type: 'loading', message: "Продуктите се зареждат..." })
        reqHandler.pullProducts()
        .then((incomingProducts) => {
            this.setState({ products: incomingProducts })
            setTimeout(function(){ observer.trigger(observer.events.hide) }, 2000);       
        })
    }
    render() {
        if(this.state.products.length === 0) return null;
        return (
            <div  className="gallery">
                {this.state.products.map(p => {
                        return <Product key={p._id} productData={p} />
                    })}
            </div>
        )
    }
}

export default Catalog

