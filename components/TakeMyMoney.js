import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import Swal from '@sweetalert/with-react';
import Router from 'next/router';
import NProgress from 'nprogress';

import User, { CURRENT_USER_QUERY } from './User';
import calcTotalPrice from '../lib/calcTotalPrice';
import calcTotalItems from '../lib/calcTotalItems';
import { ALL_ORDERS_QUERY } from '../components/Orders';

const CREATE_ORDER_MUTATION = gql`
    mutation CREATE_ORDER_MUTATION($token : String!) {
        createOrder(token: $token) {
            id
            charge
            total
            items {
                id
                title
            }
        }
    }
`;

class TakeMyMoney extends React.Component {
    onToken = async (res, createOrder) => {
        NProgress.start();
        const order = await createOrder({variables: {
            token: res.id
        }}).catch(err => Swal(err.message, '', 'error', {timer: 3000}));
        Router.push('/order/[OrderID]', `/order/${order.data.createOrder.id}`);
    }

    render() {
        return(
            <User>
                {
                    ({ data: { me }, loading}) => {
                        return (
                            <Mutation mutation={CREATE_ORDER_MUTATION} refetchQueries={[{query: CURRENT_USER_QUERY}, {query: ALL_ORDERS_QUERY}]}>
                                {
                                    (createOrder) => {
                                        return (
                                            !loading && 
                                            <StripeCheckout
                                                amount={calcTotalPrice(me.cart)}
                                                name="Sick Fits"
                                                description={`Order of ${calcTotalItems(me.cart)} Items`}
                                                image={ me.cart[0] && me.cart[0].item.image }
                                                stripeKey="pk_test_FJ2okkCRVlP3Q8l8gEEMVpsc00L0CLjdJj"
                                                currency="USD"
                                                email={me.email}
                                                token={res => this.onToken(res, createOrder)}
                                            >
                                                {this.props.children}
                                            </StripeCheckout>
                                        )
                                    }
                                }
                            </Mutation> 
                        )
                    }
                }
            </User>
        )
    }
}

export default TakeMyMoney;
export { CREATE_ORDER_MUTATION };