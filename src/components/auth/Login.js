import React, { Component } from 'react';
import reqHandler from '../../utils/reqHandler';
import observer from '../../utils/observer'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';



class Login extends Component {
    constructor(props) {
        super(props);
        this.dataCollector = (e) => {
            this.setState({ [e.target.name]: e.target.value })
        }
        this.submitData = (e) => {
            e.preventDefault()
            reqHandler.login(this.state)
                .then((data) => {
                    if (data._kmd.roles && data._kmd.roles[0] && data._kmd.roles[0]['roleId'] === "c9dd7694-7fb3-4089-a43e-e2b3e5909a03") {
                        localStorage.setItem('admin', `ADMIN-${data.username}`)
                    }
                    localStorage.setItem('token', data._kmd.authtoken)
                    localStorage.setItem('username', data.username)
                    localStorage.setItem('userId', data._id)
                    observer.trigger(observer.events.notification, { type: 'success', message: "Успешен вход, приятно пазаруване !" })
                    setTimeout(function(){ observer.trigger(observer.events.hide) }, 3000);       

                    reqHandler.getUserData()
                        .then(userData => {
                            if (!userData.order && userData.order === '') {
                              reqHandler.createNewOrder()
                                .then(newOrder => {
                                    reqHandler.updateUserOrders(newOrder._id)
                                        .then(newUserInfo => {
                                            console.log('newUSerInfo => ',newUserInfo);
                                            return this.props.history.push('/catalog')
                                        })
                                })
                            }
                            return this.props.history.push('/catalog')
                        })
                 
                }).catch(err => {
                    observer.trigger(observer.events.notification, { type: 'error', message: "Грешно име или парола. Повторете!" })
                    setTimeout(function(){ observer.trigger(observer.events.hide) }, 3000);  
                })

        }
    }

    componentDidMount(){
        observer.trigger(observer.events.notification, { type: 'error', message: "Само регистрирани потребители могат да правят поръчки!" })
        setTimeout(function(){ observer.trigger(observer.events.hide) }, 3000);    
    }

    render() {
        return (
            <form id="registerForm" className='formStyle' onSubmit={this.submitData}>
                <h2>Вход в Miramore Online магазин</h2>
                <label>Потрбител:</label>
                <input onChange={this.dataCollector} name="username" type="text" /><br />
                <label>Парола:</label>
                <input onChange={this.dataCollector} name="password" type="password" /><br />
                <input id="btnRegister" value="ВХОД" type="submit" /><br />
                ...още нямаш <Link to='/register'> Регистрация </Link> ?
            </form>
        );
    }
}

export default Login;