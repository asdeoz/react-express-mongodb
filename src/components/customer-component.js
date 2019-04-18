import React, { Component } from 'react';
import axios from 'axios';
import './customer-component.css';

import CustomerDetailComponent from './customer-detail-component';

class CustomerComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            customers: [],
            selectedCustomer: null,
            isDeleting: false
        };

        this.onCustomerSelected = this.onCustomerSelected.bind(this);
        this.onNewCustomer = this.onNewCustomer.bind(this);
        this.onCustomerDeleted = this.onCustomerDeleted.bind(this);
    }

    loadCustomers = () => {
        axios.get('/v1/customers').then(res => {
            console.log(res);
            this.setState({customers: res.data, selectedCustomer: null});
        }, err => {
            alert(`An error occurred while loading the customers. Error: ${err}`)
        });
    }

    componentDidMount() {
        this.loadCustomers();
    }

    onCustomerSelected = (customer) => {
        this.setState({selectedCustomer: customer});
    }

    onNewCustomer = () => {
        if(!this.state.selectedCustomer) {
            this.setState({selectedCustomer: {_id: null, name: '', address: ''}});
        } else {
            this.setState({selectedCustomer: null});
        }
    }

    onCustomerDeleted = (customer) => {
        // eslint-disable-next-line no-restricted-globals
        if(confirm(`Are you sure you want to delete "${customer.name}"?`) === true) {
            this.setState({isDeleting: true});
            axios.delete('/v1/customers/' + customer._id).then(res => {
                console.log(res);
                this.setState({isDeleting: false});
                if(res && res.data && res.data.ok && res.data.n) {
                    const index = this.state.customers.findIndex(c => c._id === customer._id);
                    if(index !== -1) this.setState(state => {
                        let customers = state.customers;
                        customers.splice(index, 1);
                        return {customers, selectedCustomer: null};
                    });
                } else {
                    alert(`Something went wrong deleting the customer... Please, try again later.`);
                }
            }, err => {
                this.setState({isDeleting: false});
                alert(`Something went wrong deleting the customer... Error: ${err}`);
            });
        }
    }

    saveCustomer = (customer) => {
        if(customer) {
            if (customer._id) {
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
                    alert(`Something went wrong saving the customer... Error: ${err}`);
                });
            } else {
                axios.post('/v1/customers', customer).then(res => {
                    console.log(res);
                    if(res && res.data && res.data.ok && res.data.n && res.data.customer) {
                        this.setState(state => {
                            let customers = state.customers;
                            customers.push(res.data.customer);
                            return {customers, selectedCustomer: null};
                        });
                    } else {
                        alert(`Something went wrong saving the customer... Please, try again later.`);
                    }
                }, err => {
                    alert(`Something went wrong saving the customer... Error: ${err}`);
                })
            }
        }
    }

    customerCard = (customer) => {
        return (
            <div className="customer-card" key={customer._id}>
                <span className="field">Name: </span>{customer.name}<br/>
                <span className="field">Address: </span>{customer.address}
                <div>
                    <button className="btn btn-delete" type="button" onClick={() => this.onCustomerDeleted(customer)} disabled={this.state.isDeleting}>Delete</button>
                    <button className="btn btn-select" type="button" onClick={() => this.onCustomerSelected(customer)}>Select Customer</button>
                </div>
            </div>
        );
    }

    render() {
        return (
            <div>
                {this.state.customers && this.state.customers.length ? 
                    <div className="customer-cards-container">
                        {this.state.customers.map(c => this.customerCard(c))}
                    </div>
                    :
                    <div className="loading"><span>Loading...</span></div>
                }
                <div>
                    <button className="btn btn-new" type="button" onClick={this.onNewCustomer}>{this.state.selectedCustomer ? 'Cancel' : 'New Customer'}</button>
                </div>
                <div>
                    {this.state.selectedCustomer ? <CustomerDetailComponent customer={this.state.selectedCustomer} save={this.saveCustomer} /> : null}
                </div>
            </div>
        );
    }
}

export default CustomerComponent;