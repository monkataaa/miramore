import React, { Component } from 'react';
import reqHandler from '../../utils/reqHandler';
import { BrowserRouter as   Link,  } from 'react-router-dom';


class AllOrdersByUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: [],
            pending: [],
            confirmed: []
        };
        this.filteredOrder = this.filteredOrder.bind(this)
    }


    componentDidMount() {
        console.log('iskam oldorders');
        reqHandler.getAllOrdersByUser()
            .then(allOrders => {
                console.log('allOrders => ', allOrders);
                for (const order of allOrders) {
                    this.setState(prevState => {
                        if (order.status === 'open') {
                            prevState.open.push(order)
                        } else if (order.status === 'pending') {
                            prevState.pending.push(order)
                        } else if (order.status === 'confirmed') {
                            prevState.confirmed.push(order)
                        }
                        return prevState
                    })

                }
            }).catch(err => console.log('err =>', err))
    }

    filteredOrder(){
        console.log('filtered !!!');
    }

    render() {
        console.log("state =>", this.state);
        return (
            <div>
                <Link to={{pathname:"filtered", query:{openOrders : JSON.stringify(this.state.open)}}}>> Отворени </Link>
                <Link to='filtered' openOrders={this.state.pending}> Изчакващи </Link>
                <Link to='filtered' openOrders={this.state.confirmed}> Потвърдени </Link>
            </div>
        );
    }
}

export default AllOrdersByUser;
