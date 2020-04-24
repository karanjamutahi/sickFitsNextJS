import React from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

import { CURRENT_USER_QUERY } from './User';

const ADD_TO_CART_MUTATION = gql`
    mutation addToCart($id: ID!){
        addToCart(id: $id) {
            id
            quantity
        }
    }
`;

class AddToCart extends React.Component {
    render(){
        const { id } = this.props;
        return(
            <Mutation mutation={ADD_TO_CART_MUTATION} refetchQueries={[{ query: CURRENT_USER_QUERY}]} variables={
                {
                    id,
                }}>
                {(addToCart, { loading, error }) => {
                    return (
                        <button onClick={addToCart}>Add To Cart 🛒</button>
                    )
                }}
            </Mutation>
            
        )
    }
}

export default AddToCart;