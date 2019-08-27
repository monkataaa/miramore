import React, { Component } from 'react';
import reqHandler from '../../utils/reqHandler'
import '../../styles/DetailedProduct.css'
import OrderSummary from './OrderSummary';



class PendingOrders extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pendingOrdersIds : []
        };
    }
    componentDidMount(){
        reqHandler.getPendingOrders()
            .then(allPendingOrders => {
               this.setState({pendingOrdersIds : allPendingOrders.map(p => p._id)})
            }).catch(err => console.log(err))
    }
    
    render() {
        // console.log(this.state.pendingOrdersIds);
        return (

            <div class="container">
                <table id="cart" class="table table-hover table-condensed">
                    <thead>
                        <tr>
                            <th style={{ 'width': '30%' }}class="text-center">Products</th>
                            <th style={{ 'width': '20%' }}class="text-center">Клиент</th>
                            <th style={{ 'width': '32%' }} class="Price">Сума</th>
                            <th style={{ 'width': '30%' }}></th>
                        </tr>
                    </thead>
                    {this.state.pendingOrdersIds.map(oId => <OrderSummary orderId={oId}  />)}
                    <tfoot>
                        <tr class="visible-xs">
                            <td class="text-center"><strong>Total 1.99</strong></td>
                        </tr>
                        <tr>
                            <td colspan="2" class="hidden-xs"></td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        );
    }
}

export default PendingOrders;