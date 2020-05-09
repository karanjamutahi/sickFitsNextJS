import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import { format } from 'date-fns';
import Head from 'next/head';
import gql from 'graphql-tag';


import formatMoney from '../lib/formatMoney';
import OrderStyles from './styles/OrderStyles';
import Error from './ErrorMessage';
import Loading from './Loading';


const SINGLE_ORDER_QUERY = gql`
    query SINGLE_ORDER_QUERY($id: ID!) {
        order(id: $id) {
            id
            charge
            total
            createdAt
            user {
                id
            }
            items {
                id
                title
                description
                image
                price
                quantity
            }
        }
    }
`;

class Order extends Component {
    render() {
        return (
            <Query query={SINGLE_ORDER_QUERY} variables={{id: this.props.id}}>
            {
                ({data, loading, error}) => {
                    if(error) return <Error error={error}></Error>
                    if(loading) return <Loading loading={loading}></Loading>
                    const { order } = data;
                    return (
                        <OrderStyles>
                            <Head>
                                <title>Sick Fits | Order {order.id}</title>
                            </Head>
                            <p>
                                <span>Order ID:</span>  
                                <span>{order.id}</span>
                            </p>
                            <p>
                                <span>Charge Number</span>
                                <span>{order.charge}</span>
                            </p>
                            <p>
                                <span>Date</span>
                                <span>{format(order.createdAt, 'MMMM d, Y h:mm a')}</span>
                            </p>
                            <p>
                                <span>Total</span>
                                <span>{formatMoney(order.total)}</span>
                            </p>
                            <div className="items">
                                {
                                    order.items.map(item => (
                                        <div className="order-item" key={item.id}>
                                            <img src={item.image} alt={item.title}/>
                                            <div className="item-details">
                                                <h2>{item.title}</h2>
                                                <p>{item.description}</p>
                                                <p>Qty: {item.quantity}</p>
                                                <p>Each: {formatMoney(item.price)}</p>
                                                <p>SubTotal: {formatMoney(item.price * item.quantity)}</p>
                                            </div>
                                        </div>
                                    )) 
                                }
                            </div>
                        </OrderStyles>
                    )
                }
            }
            </Query>
        );
    }
}

Order.propTypes = {
    id: PropTypes.string.isRequired,
};

export default Order;