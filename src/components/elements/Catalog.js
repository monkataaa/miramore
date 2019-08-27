import React, { Component } from 'react'
import reqHandler from '../../utils/reqHandler';
import Product from './Product';
import observer from '../../utils/observer'
import noimage from '../../utils/noimage.jpg'


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
            incomingProducts.map(p => {
                if (!this.imageExists(p.imageUrl)) {
                    p.imageUrl = noimage
                }
            }
              
            )
            this.setState({ products: incomingProducts })
            setTimeout(function(){ observer.trigger(observer.events.hide) }, 2000);       
        }).catch(err => console.log(err))
    }
    render() {
        if(this.state.products.length === 0) return null;
        return (
            <div  className="galleryGlobal">
                {this.state.products.map(p => {
                        return <Product key={p._id} productData={p} />
                    })}
            </div>
        )
    }

    imageExists(image_url){

        let http = new XMLHttpRequest();
        http.open('HEAD', image_url, false);
        try{
            http.send();
        } catch (err) {
            return false
        }
        
        return http.status === 200;
    
    }
}

export default Catalog

