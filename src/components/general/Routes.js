import React from 'react'
import { BrowserRouter as Router, Route,  Switch } from 'react-router-dom';
import Register from '../auth/Register';
// import {Redirect} from 'react-router-dom'
import UploadForm from '../elements/UploadForm'
import Catalog from '../elements/Catalog'
import Login from '../auth/Login'
import Logout from '../auth/Logout';
import DetailedProduct from '../elements/DetailedProduct';
import Cart from '../elements/Cart';
import PendingOrders from '../elements/PendingOrders';
import EditProduct from '../elements/EditProduct';
import AllOrdersByUser from '../elements/AllOrdersByUser';
import FilteredOrder from '../elements/FilteredOrder';
let Routes = () => {
    return (
        <Switch>
            <Route exact path='/' component={Catalog}/>
            <Route exact path='/register' component={Register}/>
            <Route exact path='/upload/product' component={UploadForm }/>
            <Route exact path='/edit/product/:id' component={EditProduct }/>
            <Route exact path='/catalog' component={Catalog}/>
            <Route exact path='/login' component={Login}/>
            <Route exact path='/logout' component={Logout}/>
            <Route exact path='/details/:id' component={DetailedProduct}/>
            <Route exact path='/cart' component={Cart}/>
            <Route exact path='/orders/pending' component={PendingOrders}/>
            <Route exact path='/orders/all' component={AllOrdersByUser}/>
            <Route exact path='/orders/filtered' component={FilteredOrder}/>
        </Switch>
    )
}
export default Routes