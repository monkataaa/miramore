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
            
            <div class="formStyle" id="uploadFormId"  onSubmit={this.submitData}>
                <form class="submitForm">
                <h2>Upload product</h2>
                    <div className="inputField">
                        <label>Title:</label>
                        <input onChange={this.dataCollector} name="title" type="text" />
                    </div>
                    <br></br>
                    <div className="inputField">
                        <label>Price:</label>
                        <input onChange={this.dataCollector} name="price" type="text" />
                    </div>
                    <br></br>
                    <div className="inputField">
                        <label>Mini Image Link:</label>
                        <input onChange={this.dataCollector} name="miniImageUrl" type="text" />
                    </div>
                    <br></br>
                    <div className="inputField">
                        <label>Image Link:</label>
                        <input onChange={this.dataCollector} name="imageUrl" type="text" />
                    </div>
                    <div className="inputField">
                        <label>Description:</label>
                        <input onChange={this.dataCollector} name="description" type="text"  ></input><br />
                    </div>
                    <div className="inputField">
                        <label>Category:</label>
                        <input onChange={this.dataCollector} name="category" type="text"  ></input><br />
                    </div>

                    {/* <div className="inputField"> */}
                        {/* <input id="btnEditPost" type="submit" value="Upload Product" /> */}
                    {/* </div> */}
                        <button type="submit" class="btn btn-primary submitBtn">Primary</button>
                </form>
            </div>
                );
                    }
                }
                
export default UploadForm;