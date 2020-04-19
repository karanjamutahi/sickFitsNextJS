import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import swal from '@sweetalert/with-react';
import { ALL_ITEMS_QUERY } from './Items';

const DELETE_ITEM_MUTATION = gql`
    mutation DELETE_ITEM_MUTATION($id: ID!) {
        deleteItem(id: $id){
            id
        }
    }
`;

class DeleteItem extends Component {

    update = (cache, payload) => { //TODO: Investigate why this doesn't work and possible side effects
        //Manually update cache on client so it matches server
        //1. Read cache and know whats on it
        const data = cache.readQuery({ query: ALL_ITEMS_QUERY});
        console.log(data);
        //2. Filter the deleted item out
        data.items = data.items.filter(item => item.id !== payload.data.deleteItem.id)
        //3. Put the items back 
        cache.writeQuery({ query:ALL_ITEMS_QUERY, data });
    };

    render() {
        return (
            <Mutation mutation={DELETE_ITEM_MUTATION} variables={{id: this.props.id}} update={this.update} >
                {(deleteItem, { error }) => (
                    <button onClick={ async () => {
                        
                        if( await swal('Are you sure you want to Delete this item ?', { buttons: ['No', 'Yes'], icon: 'warning'})) {
                            deleteItem();
                        }
                    }}>{this.props.children}</button>
                    )}  
            </Mutation>
        );
    }
}

export default DeleteItem;