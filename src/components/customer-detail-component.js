import React, { Component } from 'react';
import './customer-detail-component.css';

class CustomerDetailComponent extends Component {
    constructor(props) {
        super(props);

        this.state = props.customer;

        this.onNameChange = this.onNameChange.bind(this);
        this.onAddressChange = this.onAddressChange.bind(this);
    }

    componentDidUpdate(prevProps) {
        if(this.props.customer._id !== prevProps.customer._id) {
            this.setState(this.props.customer);
        }
    }

    onNameChange = (event) => {
        this.setState({name: event.target.value});
    }

    onAddressChange = (event) => {
        this.setState({address: event.target.value});
    }

    render() {
        return (
            <div className="form-container">
                <div className="form-field">
                    <label htmlFor="customerName">Name: </label>
                    <input type="text" name="customerName" value={this.state.name} onChange={this.onNameChange} />
                </div>
                <div className="form-field">
                    <label htmlFor="customerAddress">Address: </label>
                    <input type="text" name="customerAddress" value={this.state.address} onChange={this.onAddressChange} />
                </div>
                <div>
                    <button className="btn btn-save" type="button" onClick={() => this.props.save(this.state)}>Save</button>
                </div>
            </div>
        )
    }
}

export default CustomerDetailComponent;