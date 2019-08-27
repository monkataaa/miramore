import React, { Component } from 'react'
import reqHandler from '../../utils/reqHandler'
import { BrowserRouter as Route, Link } from 'react-router-dom';
import '../../styles/DetailedProduct.css'
import observer from '../../utils/observer'






export default class DetailedProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            productData: {}
        }
        this.deleteProduct = this.deleteProduct.bind(this)
        this.editProduct = this.editProduct.bind(this)
        this.purchaseProduct = () => {
            // console.log('productData =>',this.state.productData);
            if (localStorage.getItem('token') === null) {
                console.log('opa nqma token');
                return this.props.history.push('/login')
            } else (
                reqHandler.getUserData()
                    .then(userData => {
                        console.log('userDataOrder =>', userData.order);
                        reqHandler.getOrderInfo(userData.order)
                            .then(orderData => {
                                console.log('orderData => ', orderData);
                                let updatedOrderData = orderData

                                updatedOrderData.products.push(this.state.productData._id)
                                console.log("order Data after adding the product => ", updatedOrderData);
                                reqHandler.updateOrder(userData.order, updatedOrderData)
                                    .then(updatedORder => {
                                        console.log('updatedORder', updatedORder);
                                        observer.trigger(observer.events.notification, { type: 'success', message: "Продуктът беше добавен успешно към Вашата количка !" })
                                        setTimeout(function () { observer.trigger(observer.events.hide) }, 3000);
                                        return this.props.history.push('/catalog')
                                    })
                            })

                    })
            )

        }
    }

    editProduct(){
    console.log('edit..') 
    return <Link to='/upload/product' />
    }

    deleteProduct(){
        reqHandler.deleteProduct(this.state.productData._id)
            .then(deletedProduct => {
                observer.trigger(observer.events.notification, { type: 'success', message: "Продуктът беше изтрит успешно !" })
                setTimeout(function(){ observer.trigger(observer.events.hide) }, 3000);       
                return this.props.history.push('/catalog')
            })
    }

    componentDidMount() {
        reqHandler.detailedProduct(this.props.match.params.id)
            .then(productData => {
                this.setState({ productData: productData })
            }).catch(err => console.log(err))
    }



    render() {
        if (Object.keys(this.state.productData).length === 0) return null;
        // console.log(this.state.productData);
        return (
            <div className="container">
                <div className="card">
                    <div className="container-fliud">
                        <div className="wrapper row">
                            <div className="preview col-md-6">

                                <div className="preview-pic tab-content">
                                    <div className="tab-pane active" id="pic-1"><img src={this.state.productData.imageUrl} alt='imageURL' /></div>
                                </div>

                            </div>
                            <div className="details col-md-6">
                                <div className="panel panel-default text-center">
                                    <h3><div className="panel-title"><span className="glyphicon glyphicon-list-alt"></span>   Име </div></h3>
                                    <hr />
                                    <h4>{this.state.productData.title}</h4>
                                </div>
                                <div className="panel panel-default text-center">
                                    <div className="rating">
                                        <h3><div className="panel-title"><span className="glyphicon glyphicon-info-sign"></span>  Категория </div></h3>
                                        <hr />
                                        <h4>{this.state.productData.category}</h4>
                                    </div>
                                </div>
                                <div className="panel panel-default text-center">
                                    <h3><div className="panel-title"><span className="glyphicon glyphicon-comment"></span>  Характеристика  </div></h3>
                                    <hr />
                                    <h4>{this.state.productData.description}</h4>
                                </div>
                                <div className="panel panel-default text-center">
                                    <h3><div className="panel-title"><span className="glyphicon glyphicon-credit-card"></span>  Цена </div></h3>
                                    <hr />
                                    <h2><font color="purple">{this.state.productData.price}</font></h2>
                                </div>
                                {/* <div className="panel panel-default text-center">
                                    <h3><div className="panel-title"><span className="glyphicon glyphicon-scissors"></span>  Брой </div></h3>
                                    <hr />
                                    <span className="input-group-addon">
                                    <select id="beden1" name='1beden' className="form-control" type='number'>
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                        <option>6</option>
                                        <option>7</option>
                                        <option>8</option>
                                        <option>9</option>
                                        <option>10</option>

                                    </select></span>
                                    <br />
                                </div> */}

                                {localStorage.getItem('admin') !== null ?
                                    (<div className="text-center">
                                        <Link to={`/edit/product/${this.state.productData._id}`} className="editBtn btn btn-default" type="button"><span className="glyphicon glyphicon-gift"></span> Редактирай </Link>
                                        <br />
                                        <button onClick={ this.deleteProduct} className="deleteBtn btn btn-default" type="button"><span className="glyphicon glyphicon-gift"></span> Изтрий </button>
                                    </div>)
                                    : ( <div className="text-center">
                                            <button onClick={this.purchaseProduct} className="add-to-cart btn btn-default" type="button"><span className="glyphicon glyphicon-gift"></span> Поръчай </button>
                                        </div>
                                    )}
                            </div>
                        </div>
                    </div>
                </div >
            </div >
        )
    }
}
