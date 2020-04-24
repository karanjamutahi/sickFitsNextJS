import React from 'react';
import { Mutation } from 'react-apollo';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { CURRENT_USER_QUERY } from './User';
import swal from 'sweetalert';

const REMOVE_FROM_CART_MUTATION = gql`
    mutation REMOVE_FROM_CART($id: ID!) {
        removeFromCart(id: $id) {
            id
            user {
                id
            }
        }
    }
`;

const BigButton = styled.button`
  font-size: 3rem;
  background: none;
  border: 0;
  &:hover {
    color: ${props => props.theme.red};
    cursor: pointer;
  }
`;

class RemoveFromCart extends React.Component {
    static proptypes = {
        id: PropTypes.string.isRequired,
    };
    
    update = (cache, payload) => {  //Gets called as soon as response comes back from server after Mutation has run
        //1. Read cache
        const data = cache.readQuery({ query: CURRENT_USER_QUERY});
        
        //2. Remove item from cache
        const cartItemID = payload.data.removeFromCart.id;
        data.me.cart = data.me.cart.filter(cartItem => cartItem.id !== cartItemID);
        
        //3. Write cache copy back
        cache.writeQuery({ query: CURRENT_USER_QUERY, data});
    }

    render() {
        return (
            <Mutation mutation={REMOVE_FROM_CART_MUTATION} variables={{id: this.props.id}} update={this.update} optimisticResponse={
                {
                __typename: 'Mutation',
                removeFromCart: {
                    id: this.props.id,
                    __typename: 'CartItem',
                    user: {
                        __typename: 'User',
                        id: 'No IDea'
                    }
                },
            }}>
                {(removeFromCart, { loading, error}) => {
                    return(
                        <BigButton disabled={loading} onClick={() => {
                            removeFromCart().catch(err => swal("Error", err.message, "error", {timer: 3000}));
                        }} title={"Delete Item"}>&times;</BigButton>
                    )}}
            </Mutation>
        );
    }
}

export default RemoveFromCart;