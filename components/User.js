import React, { Component } from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';


const CURRENT_USER_QUERY = gql`
    query CURRENT_USER_QUERY {
        me{
            id
            email
            firstname
            orders{
                id
            }
            cart {
                id
                quantity
                item {
                    id
                    price
                    image
                    title
                    description
                }
            }
        }
    }
`;

const User = (props) => (
    <Query query={CURRENT_USER_QUERY} {...props}>
        { 
            (payload) => {
                return props.children(payload);
            } 
        }
    </Query>
);

//Render Prop whose only child can be a function 
User.propTypes = {
    children: PropTypes.func.isRequired,
};
 
export default User;
export { CURRENT_USER_QUERY };