import React, { Component } from 'react';
import { BrowserRouter as  Route, Link } from 'react-router-dom';
import '../../styles/navigation.css'


class Navigation extends Component {
    render() {
        return (
            <div>
                <div className="col-sm-12">
                    <ul className="navi">
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
                        <div className="col-sm-12 li"></div>
                    </ul>
                </div>
            </div>
        )
    }
}

export default Navigation;