import reqHandler from '../../utils/reqHandler'
import React, { Component } from 'react';

// import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { BrowserRouter as Route, Switch, Redirect  } from 'react-router-dom';
import observer from '../../utils/observer'


class OrderSummary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orderId: '',
            creatorInfo: {},
            products: [],
            total: 0,
            creator: '',
            status: ''
        };
        this.confirmOrder = this.confirmOrder.bind(this)
    }
    componentDidMount() {
        observer.trigger(observer.events.notification, { type: 'loading', message: "Поръчквите се зареждат..." })
        reqHandler.getOrderInfo(this.props.orderId)
            .then(orderFormDb => {
                this.setState({ total: orderFormDb.total })
                this.setState({ orderId: this.props.orderId })
                this.setState({ creator: orderFormDb.creator })
                reqHandler.getUserData(orderFormDb.creator)
                    .then(creatorFromDb => {
                        // console.log('creatorInfo ->', creatorFromDb);
                        this.setState({ creatorInfo: creatorFromDb })
                        for (const p of orderFormDb.products) {
                            reqHandler.detailedProduct(p)
                                .then(productFromDb => {
                                    this.setState(prevState => {
                
                                        setTimeout(function(){ observer.trigger(observer.events.hide) }, 1000);       
                                        prevState.products.push(productFromDb.title)
                                        return prevState
                                    })
                                })
                        }
                    })
            }).catch(err => console.log(err))

    }

    confirmOrder() {
        console.log('potvyrdi poruchka');
        let dataForUpdate = this.state
        dataForUpdate.status = 'confirmed'
        reqHandler.updateOrder(this.state.orderId, dataForUpdate)
            .then(updatedOrder => {
                console.log(updatedOrder);
                this.setState({ status: updatedOrder.status})
                observer.trigger(observer.events.notification, { type: 'success', message: "Поръчката беше повтърдена успешно !" })
                setTimeout(function(){ observer.trigger(observer.events.hide) }, 3000);    
                return <Redirect to='/catalog' />


            })
    }

    render() {
       if (this.state.status === 'confirmed') { return null}
           
        return (
            <tbody>
                <tr>
                    <td data-th="Product">
                        <div class="row">
                            <div class="col-sm-10">
                                <span>{this.state.products.map(p => p + " ")} </span>
                            </div>
                        </div>
                    </td>
                    <td data-th="Product">
                        <div class="row">
                            <div class="col-sm-10">
                                <span>{this.state.creatorInfo.username} </span>
                                <span>{this.state.creatorInfo.phone} </span>
                                <span>{this.state.creatorInfo.address} </span>
                            </div>
                        </div>
                    </td>
                    <td data-th="Price">{this.state.total}</td>
                    <td><button onClick={this.confirmOrder} class="btn btn-success btn-block">Потвърди<i class="fa fa-angle-right"></i></button></td>

                </tr>
            </tbody>
        );
    }
}

export default OrderSummary;