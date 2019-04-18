import React, { Component } from 'react';
import './customer-detail-component.css';

class CustomerDetailComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            customer: props.customer,
            isSaving: false
        };

        this.onNameChange = this.onNameChange.bind(this);
        this.onAddressChange = this.onAddressChange.bind(this);
        this.onSave = this.onSave.bind(this);
    }

    componentDidUpdate(prevProps) {
        if(this.props.customer._id !== prevProps.customer._id) {
            this.setState({customer: this.props.customer});
        }
    }

    onNameChange = (event) => {
        let customer = {...this.state.customer};
        customer.name = event.target.value;
        this.setState({customer});
    }

    onAddressChange = (event) => {
        let customer = {...this.state.customer};
        customer.address = event.target.value;
        this.setState({customer});
    }

    onSave = () => {
        this.setState({isSaving: true});
        this.props.save(this.state.customer);
    }

    render() {
        return (
            <div className="form-container">
                <div className="form-field">
                    <label htmlFor="customerName">Name: </label>
                    <input type="text" name="customerName" value={this.state.customer.name} onChange={this.onNameChange} />
                </div>
                <div className="form-field">
                    <label htmlFor="customerAddress">Address: </label>
                    <input type="text" name="customerAddress" value={this.state.customer.address} onChange={this.onAddressChange} />
                </div>
                <div>
                    <button className="btn btn-save" type="button" onClick={this.onSave} disabled={this.state.isSaving}>{this.state.isSaving ? 'Saving...' : 'Save'}</button>
                </div>
            </div>
        )
    }
}

export default CustomerDetailComponent;