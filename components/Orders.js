import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Link from 'next/link';
import styled from 'styled-components';
import { formatDistance } from 'date-fns';

import Error from '../components/ErrorMessage';
import Loading from './Loading';
import SingleOrderView from './SingleOrderView';
import OrderItemStyles from './styles/OrderItemStyles';
import formatMoney from '../lib/formatMoney';


const ALL_ORDERS_QUERY = gql`
    query ALL_ORDERS_QUERY($id: ID!) {
        orders(id: $id) {
            id,
            charge,
            total,
            createdAt,
            user {
                id
                firstname
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

const orderUl = styled.ul`
  display: grid;
  grid-gap: 4rem;
  grid-template-columns: repeat(auto-fit, minmax(40%, 1fr));
`;

class Orders extends Component {
    render() {
        return (
            <Query query={ALL_ORDERS_QUERY} variables={{id: this.props.userID}}>
                {({ data: { orders }, loading, error}) => {
                    if(error) return <Error error={error}></Error>
                    if(loading) return <Loading loading={loading}></Loading>
                    return (
                        <div>
                            <h2>You have {orders.length} orders</h2>
                            <orderUl>
                                {orders.map(order => (
                                <OrderItemStyles key={order.id}>
                                    <Link
                                    href="/order/[OrderID]" as={`/order/${order.id}`}
                                    >
                                    <a>
                                        <div className="order-meta">
                                        <p>{order.items.reduce((a, b) => a + b.quantity, 0)} Items</p>
                                        <p>{order.items.length} Products</p>
                                        <p>{formatDistance(order.createdAt, new Date())}</p>
                                        <p>{formatMoney(order.total)}</p>
                                        </div>
                                        <div className="images">
                                        {order.items.map(item => (
                                            <img key={item.id} src={item.image} alt={item.title} />
                                        ))}
                                        </div>
                                    </a>
                                    </Link>
                                </OrderItemStyles>
                                ))}
                            </orderUl>
                        </div>
                    )
                }}
            </Query>
        );
    }
}


export default Orders;
export { ALL_ORDERS_QUERY }; 