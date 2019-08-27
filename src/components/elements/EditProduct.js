import React, { Component } from 'react';
import reqHandler from '../../utils/reqHandler';
import observer from '../../utils/observer'



class EditProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };

        this.dataCollector = this.dataCollector.bind(this)

        this.submitData = (e) => {
            e.preventDefault()
            reqHandler.editProduct(this.state._id, this.state)
                .then((editedProduct) => {
                    console.log('editedProduct', editedProduct);
                    observer.trigger(observer.events.notification, { type: 'success', message: "Продуктът беше коригиран успешно !" })
                    setTimeout(function(){ observer.trigger(observer.events.hide) }, 3000);    
                    this.props.history.push('/catalog')
                }).catch(err => console.log(err))
        }
    }
    dataCollector(e){
        this.setState({ [e.target.name]: e.target.value })
    }
    componentDidMount() {
        reqHandler.getProductInfo(this.props.match.params.id)
            .then(productDataFromDb => {
               Object.keys(productDataFromDb).forEach(e => this.setState({[e] : productDataFromDb[e] }))
            }).catch(err => console.log(err))
    }


    render() {
        return (
            <div class="submitArea formContainer" onSubmit={this.submitData}>
                <form id="editPostForm" class="submitForm">
                    <label>Title:</label>
                    <input onChange={this.dataCollector}  name="title" type="text" value={this.state.title} /><br />
                    <label>Price:</label>
                    <input onChange={this.dataCollector} name="price" type="text"  value={this.state.price}/><br />
                    <label>Mini Image Link:</label>
                    <input onChange={this.dataCollector} name="miniImageUrl" type="text"  /><br />
                    <label>Link Image:</label>
                    <input onChange={this.dataCollector} name="imageUrl" type="text"  value={this.state.imageUrl}/><br />
                    <label>Description:</label>
                    <textarea onChange={this.dataCollector} name="description"  value={this.state.description}></textarea><br />
                    <label>Category:</label>
                    <textarea onChange={this.dataCollector} name="category"  value={this.state.category}></textarea><br />
                    <input id="btnEditPost" type="submit" value="Коригирай" />
                </form>
            </div>
        );
    }
}

export default EditProduct;