// for deleting 

import { Link } from 'react-router-dom'
import React from 'react'

const RegisteredUserNav = (props) => {
    return (
        <div className="navbar-nav">
            <Link className="nav-item nav-link" to="/cart">Количка</Link>
        </div>
    )
}

export default RegisteredUserNav