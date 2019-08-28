import React, { Component } from 'react';
import reqHandler from '../../utils/reqHandler';


class UploadForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };

        this.dataCollector = (e) => {
            this.setState({ [e.target.name]: e.target.value })
        }

        this.submitData = (e) => {
            e.preventDefault()
            reqHandler.createProduct(this.state)
                .then((newProduct) => {
                    this.props.history.push('/catalog')
                }).catch(err => console.log(err))
        }
    }



    render() {
        return (
            <div class="submitArea formContainer" onSubmit={this.submitData}>
                <form id="editPostForm" class="submitForm">
                    <div className="inputField">
                        <label>Title:</label>
                        <input onChange={this.dataCollector} name="title" type="text" /><br />
                    </div>
                    <div className="inputField">
                        <label>Price:</label>
                        <input onChange={this.dataCollector} name="price" type="text" /><br />
                    </div>
                    <div className="inputField">
                        <label>Mini Image Link:</label>
                        <input onChange={this.dataCollector} name="miniImageUrl" type="text" /><br />
                    </div>
                    <div className="inputField">
                        <label>Image Link:</label>
                        <input onChange={this.dataCollector} name="imageUrl" type="text" /><br />
                    </div>
                    <div className="inputField">
                        <label>Description:</label>
                        <textarea onChange={this.dataCollector} name="description"  ></textarea><br />
                    </div>
                    <div className="inputField">
                        <label>Category:</label>
                        <textarea onChange={this.dataCollector} name="category"  ></textarea><br />
                    </div>

                    <div className="inputField">
                        <input id="btnEditPost" type="submit" value="Upload Product" />
                    </div>
                </form>
            </div>
        );
    }
}

export default UploadForm;