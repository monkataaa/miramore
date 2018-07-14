import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import NotRegisteredUser from '../elements/NotRegisteredUserView';
import RegisteredUserNav from '../elements/RegisteredUserNav';
import '../../styles/navigation.css'


class Navigation extends Component {
    render() {
        return (
            <div>
                <div class="col-sm-12">
                    <ul class="navi">
                        <li><Link to="/catalog">Каталог<span /></Link></li>
                        {localStorage.getItem('admin') !== null ?
                            <li> <Link className="nav-item nav-link" to="/upload/product">Upload Product</Link></li> : null}
                        {localStorage.getItem('admin') !== null ?
                            <li> <Link className="nav-item nav-link" to="/orders/pending">Pending Orders</Link></li> : null}
                        {localStorage.getItem('admin') === null ?
                            (localStorage.getItem('token') === null ?
                                <li><Link className="nav-item nav-link" to="/login">Поръчай</Link></li>
                                :<li> <Link className="nav-item nav-link" to="/cart">Количка</Link> </li>)
                            : null
                        }
                        {localStorage.getItem('token') === null ? <li> <Link className="nav-item nav-link" to="/login">Вход</Link></li> :
                            <li> <Link className="nav-item nav-link" to="/logout">Изход</Link></li>
                        }
                        <div class="col-sm-12 li"></div>
                    </ul>
                </div>
            </div>
        )
    }
}

export default Navigation;