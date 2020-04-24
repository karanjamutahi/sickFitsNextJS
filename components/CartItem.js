import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

import RemoveFromCart from './RemoveFromCart';
import formatMoney from '../lib/formatMoney';

const CartItemStyles = styled.li`
    padding: 1rem 0;
    border-bottom: 1px solid ${props => props.theme.lightgrey };
    display: grid;
    align-items: center;
    grid-template-columns: auto 1fr auto;
    img {
        margin-right: 10px;
    }
    h3, p {
        margin: 0
    }
`;

const CartItem = (props) => { 
    
    if(!props.cartItem.item) return (
        <CartItemStyles>
            <p>This Item has been removed😢</p>
            <RemoveFromCart id={props.cartItem.id}/>
        </CartItemStyles>
    )
    
    return(
    <CartItemStyles>
        <img width="100" src={props.cartItem.item.image} alt={props.cartItem.item.title}/>
        <div className="cart-item-details">
            <h3>{props.cartItem.item.title}</h3>
            <p>
                {formatMoney(props.cartItem.item.price * props.cartItem.quantity)}
                {" - "}
                <em>
                    {props.cartItem.quantity} &times; {formatMoney(props.cartItem.item.price)}
                </em>
            </p>
            <RemoveFromCart id={props.cartItem.id}/>
        </div>
    </CartItemStyles>
    )
}

CartItem.propTypes = {
    cartItem: PropTypes.object.isRequired,
};

export default CartItem;