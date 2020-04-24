import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import swal from '@sweetalert/with-react';
import { ALL_ITEMS_QUERY } from './Items';
import { CURRENT_USER_QUERY } from './User';

const DELETE_ITEM_MUTATION = gql`
    mutation DELETE_ITEM_MUTATION($id: ID!) {
        deleteItem(id: $id){
            id
        }
    }
`;

class DeleteItem extends Component {

    update = (cache, payload) => {  
        //Manually update cache on client so it matches server
        //1. Read cache and know whats on it
        const data = cache.readQuery({ query: ALL_ITEMS_QUERY});
        //2. Filter the deleted item out
        data.items = data.items.filter(item => item.id !== payload.data.deleteItem.id)
        //3. Put the items back 
        cache.writeQuery({ query:ALL_ITEMS_QUERY, data });

        //Do the same for Cart Items
        
        const currentUser = cache.readQuery({ query: CURRENT_USER_QUERY});
        currentUser.me.cart = currentUser.me.cart.filter(cartItem => cartItem.item.id !== payload.data.deleteItem.id); //TODO: Update this so that it only deletes the item property and not the whole cartItem
        cache.writeQuery({ query:CURRENT_USER_QUERY, data:currentUser}); 
        
    };

    render() {
        return (
            <Mutation mutation={DELETE_ITEM_MUTATION} variables={{id: this.props.id}} update={this.update} >
                {(deleteItem, { error }) => (
                    <button onClick={ async () => {
                        
                        if( await swal('Are you sure you want to Delete this item ?', { buttons: ['No', 'Yes'], icon: 'warning', dangerMode:true })) {
                            deleteItem().catch(err => {
                                swal(err.message, "" ,"error", { timer: 3000 });
                            });
                        }
                    }}>{this.props.children}</button>
                    )}  
            </Mutation>
        );
    }
}

export default DeleteItem;