import React, { Component } from 'react';
import reqHandler from '../../utils/reqHandler'
import '../../styles/Cart.css'
import CartProduct from './CartProduct';
import observer from '../../utils/observer'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';



class Cart extends Component {
	constructor(props) {
		super(props);
		this.state = {
			orderInfo : {},
			total : 0
		};
		this.calculateOrderTotal = this.calculateOrderTotal.bind(this)
		this.makeOrder = this.makeOrder.bind(this)
		
	}

	calculateOrderTotal(productTotal) {
		console.log('productTotal >', productTotal);
		// this.setState({total : productTotal})
		this.setState(prevState => {
			prevState.total += Number(productTotal)
			return prevState
		})
	}

	

	componentDidMount() {
		reqHandler.getUserData()
			.then(userData => {
				// console.log('userData => ', userData);
				reqHandler.getOrderInfo(userData.order)
					.then(orderInfo => {
						// console.log("orderInfo => ",orderInfo);
						this.setState({ orderInfo })
					})
			})
			.catch(err => {
				console.log(err);
			})
	}

	makeOrder(){
		if (localStorage.getItem('token') === null) {
            return this.props.history.push('/login')
        } else(
            reqHandler.getUserData()
                .then(userData => {
                    reqHandler.getOrderInfo(userData.order)
                        .then(orderData => {
							let updatedOrderData = orderData
							updatedOrderData.total = this.state.total
                            updatedOrderData.status = 'pending'
                            reqHandler.updateOrder(userData.order, updatedOrderData)
                                .then(updatedORder => {
									console.log('updatedORder',updatedORder);
									reqHandler.createNewOrder()
									.then(newOrder => {
										reqHandler.updateUser(userData,newOrder._id)
											.then(newUserInfo => {
												console.log('newUSerInfo => ',newUserInfo);
												observer.trigger(observer.events.notification, { type: 'success', message: "Поръчката е приета успешно! Ще се свържем с Вас скоро !" })
												setTimeout(function(){ observer.trigger(observer.events.hide) }, 3000);       
												return this.props.history.push('/catalog')
											})
									})
                                })
                        })
                 
                })
        )
	}

	

	render() {
		if (!this.state.orderInfo.products) return null
			
		return (
			<div class="container">
				<table id="cart" class="table table-hover table-condensed">
					<thead>
						<tr>
							<th style={{ 'width': '70%' }}>Product</th>
							<th style={{ 'width': '10%' }}>Price</th>
							<th style={{ 'width': '8%' }}>Quantity</th>
							<th style={{ 'width': '22%' }} class="text-center">Subtotal</th>
							<th style={{ 'width': '10%' }}></th>
						</tr>
					</thead>
					{this.state.orderInfo.products.map(p => {return <CartProduct productId={p}  calculateOrderTotal={this.calculateOrderTotal} {...this.props}/>})}
			
					<tfoot>
						<tr class="visible-xs">
							<td class="text-center"><strong>Total 1.99</strong></td>
						</tr>
						<tr>
							<td><a href="#" class="btn btn-warning"><i class="fa fa-angle-left"></i> Continue Shopping</a></td>
							<td colspan="2" class="hidden-xs"></td>
							<td class="hidden-xs text-center"><strong>Total {this.state.total}</strong></td>
							<td><button onClick = {this.makeOrder} class="btn btn-success btn-block">Checkout <i class="fa fa-angle-right"></i></button></td>
						</tr>
					</tfoot>
				</table>
			</div>
		);
	}
}

export default Cart;