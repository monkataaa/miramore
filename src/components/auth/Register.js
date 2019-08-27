import React, { Component } from 'react';
import observer from '../../utils/observer'
import reqHandler from '../../utils/reqHandler';


class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username :'',
            password : '',
            repeatPass : ''
        };
        this.dataCollector = (e) => {
            this.setState({ [e.target.name]: e.target.value })
        }
        this.submitData = (e) => {
            e.preventDefault()
            console.log("registriram user => ", this.state);

            if (this.state.username === '' || this.state.password === '') {
                observer.trigger(observer.events.notification, { type: 'error', message: "Име и Парола са задължителни !" })
                setTimeout(function(){ observer.trigger(observer.events.hide) }, 3000);  
                return
            } else if (this.state.password !== this.state.repeatPass) {
                observer.trigger(observer.events.notification, { type: 'error', message: "Некоректно въведена парола" })
                setTimeout(function(){ observer.trigger(observer.events.hide) }, 3000);  
                return
            }


            reqHandler.register(this.state)
            .then((data) => {
                localStorage.setItem('token', data._kmd.authtoken)
                localStorage.setItem('username', data.username)
                localStorage.setItem('userId', data._id)
                observer.trigger(observer.events.notification, { type: 'success', message: "Успешен вход, приятно пазаруване !" })
                setTimeout(function(){ observer.trigger(observer.events.hide) }, 3000);       
                reqHandler.getUserData()
                .then(userData => {
                    console.log('user data =>', userData);
                    if (!userData.order) {
                      reqHandler.createNewOrder()
                        .then(newOrder => {
                            reqHandler.updateUser(userData, newOrder._id)
                                .then(newUserInfo => {
                                    console.log('newUSerInfo => ',newUserInfo);
                                    return this.props.history.push('/catalog')
                                })
                        })
                    }
                    return this.props.history.push('/catalog')
                })
            }).catch(err => console.log(err))
                
        }
    }

    render() {
        return (
            <form id="registerForm" className='formStyle' onSubmit={this.submitData}>
                <h2>Регистрация в Miramore Online магазин</h2>
                <label>Име:</label>
                <input onChange={this.dataCollector} name="username" type="text" /><br/>
                <label>Телефон:</label>
                <input onChange={this.dataCollector} name="phone" type="text" /><br/>
                <label>Адрес:</label>
                <input onChange={this.dataCollector} name="address" type="text" /><br/>
                <label>Парола:</label>
                <input onChange={this.dataCollector} name="password" type="password" /><br/>
                <label>Повтори Парола:</label>
                <input onChange={this.dataCollector} name="repeatPass" type="password" /><br/>
                <input id="btnRegister" value="Sign Up" type="submit" /><br/>
            </form>
        );
    }
}

export default Register;