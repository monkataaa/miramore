import React, { Component } from 'react';
import reqHandler from '../../utils/reqHandler'
import observer from '../../utils/observer'




class CartProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
        productInfo : {},
        quantity : 1,
        total : null,   
        deleted : false      
        };
        this.calculatePriceByQuantity = (e) => {
            let prevQuantity = this.state.quantity
            this.setState({quantity: e.target.value})
            let productPrice = this.state.productInfo.price
            this.setState({total : this.state.productInfo.price * e.target.value})
            if (prevQuantity > e.target.value) {
                productPrice *= -1
            }
            this.props.calculateOrderTotal(productPrice)
           
        }
        this.deleteProductFromOrder = this.deleteProductFromOrder.bind(this)
    }
    
    componentDidMount(){
        reqHandler.getProductInfo(this.props.productId)
            .then(productInfo => {
                this.setState({productInfo})
                this.setState({total : productInfo.price})
                this.props.calculateOrderTotal(this.state.total)
            }).catch(err => console.log(err))
    }

    deleteProductFromOrder = () => {
        reqHandler.getUserData()
            .then(userData => {
                reqHandler.getOrderInfo(userData.order)
                    .then(orderData => {
                        let updatedOrderData = orderData
                        let correctedProducts = updatedOrderData.products.filter(e => e !== this.state.productInfo._id)
                        updatedOrderData.products = correctedProducts
                        reqHandler.updateOrder(userData.order, updatedOrderData)
                            .then(updatedORder => {
                                observer.trigger(observer.events.notification, { type: 'success', message: "Продуктът беше премахнат от Вашата поръчка !" })
                                setTimeout(function () { observer.trigger(observer.events.hide) }, 3000);
                                this.setState({deleted : true})
                            }).catch(err => console.log(err))
                    })
    
            }).catch(err => console.log(err))
    }
    

   
    render() {
        if (this.state.deleted) { return null}
        return (
            <tbody>
                <tr>
                    <td data-th="Product">
                        <div class="row">
                            <div class="col-sm-2 hidden-xs"><img style={{ 'max-width': '100px' }} src={this.state.productInfo.imageUrl} alt="..." class="img-responsive" /></div>
                            <div class="col-sm-10">
                                <h4 class="nomargin">{this.state.productInfo.title}</h4>
                                <p>{this.state.productInfo.description}</p>
                            </div>
                        </div>
                    </td>
                    <td data-th="Price">{this.state.productInfo.price}лв.</td>
                    <td data-th="Quantity">
                        <input type="number" name='quantity' onChange={this.calculatePriceByQuantity} min='0' max='10' value={this.state.quantity} class="form-control text-center" />
                    </td>
                    <td data-th="Subtotal" class="text-center">{this.state.total} </td>
                    <td class="actions" data-th="">
                        <button class="btn btn-info btn-sm"><i class="fa fa-refresh"></i></button>
                        <button onClick={this.deleteProductFromOrder} class="btn btn-danger btn-sm" ><i class="fa fa-trash-o"></i></button>
                    </td>
                </tr>
            </tbody>
        );
    }
}

export default CartProduct;