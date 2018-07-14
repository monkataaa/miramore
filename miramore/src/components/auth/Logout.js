import React, {Component} from 'react'
import reqHandler from '../../utils/reqHandler'
import observer from '../../utils/observer'

class Logout extends Component {
    componentDidMount(){
        reqHandler.logout()
        .then(data => {
            observer.trigger(observer.events.notification, { type: 'success', message: "Успешен изход, приятен ден !" })
            setTimeout(function(){ observer.trigger(observer.events.hide) }, 3000);       
            localStorage.clear()
            return this.props.history.push('/')
        })
    }
    render() {
        return (<div></div>);
    }
}

export default Logout;