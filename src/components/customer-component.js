import React, { Component } from 'react';
import axios from 'axios';
import './customer-component.css';

import CustomerDetailComponent from './customer-detail-component';

class CustomerComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            customers: [],
            selectedCustomer: null
        };

        this.onCustomerSelected = this.onCustomerSelected.bind(this);
    }

    componentDidMount() {
        axios.get('/v1/customers').then(res => {
            console.log(res);
            this.setState({customers: res.data});
        }, err => {

        });
    }

    onCustomerSelected = (customer) => {
        this.setState({selectedCustomer: customer});
    }

    saveCustomer = (customer) => {
        if(customer) {
            axios.put('/v1/customers/' + customer._id, customer).then(res => {
                console.log(res);
                if(res && res.data && res.data.ok && res.data.n) {
                    const index = this.state.customers.findIndex(c => c._id === customer._id);
                    if(index !== -1) this.setState(state => {
                        let customers = state.customers;
                        customers[index] = customer;

                        return {customers, selectedCustomer: null};
                    });
                } else {
                    alert(`Something went wrong saving the customer... Please, try again later.`);
                }
            }, err => {

            });
        }
    }

    render() {
        return (
            <div>
                <div className="customer-cards-container">
                    {this.state.customers.map(c => <div className="customer-card" key={c._id}><span className="field">Name: </span>{c.name}<br/><span className="field">Address: </span>{c.address} <button type="button" onClick={() => this.onCustomerSelected(c)}>Select Customer</button></div>)}
                </div>
                <div>
                    {this.state.selectedCustomer ? <CustomerDetailComponent customer={this.state.selectedCustomer} save={this.saveCustomer} /> : null}
                </div>
            </div>
        );
    }
}

export default CustomerComponent;