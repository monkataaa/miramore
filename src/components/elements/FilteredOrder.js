import React, { Component } from 'react';

class FilteredOrder extends Component {
    constructor(props) {
        super(props);
        
    }
    componentDidMount(){
        console.log('this.state.props =>',JSON.parse(this.props));
    }
    render() {
        return (
            <div>
                
            </div>
        );
    }
}

export default FilteredOrder;