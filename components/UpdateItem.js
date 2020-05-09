import React, { Component } from 'react';
import { Mutation, Query } from 'react-apollo';
import gql from 'graphql-tag';
import Router from 'next/router';

import Form from './styles/Form';
import formatMoney from '../lib/formatMoney';
import ErrorMessage from './ErrorMessage';

const SINGLE_ITEM_QUERY = gql`
    query SINGLE_ITEM_QUERY(
        $id: ID!
    ) {
        item(where: {
            id: $id
        }) {
            title
            price
            description
            image
            largeImage
        }
    }
`;

const UPDATE_ITEM_MUTATION = gql`
    mutation UPDATE_ITEM_MUTATION(
        $id: ID!
        $title: String
        $description: String
        $price: Int
        $image: String
        $largeImage: String
    ) {
        updateItem(
        id:$id
        title: $title
        description: $description
        price: $price
        image: $image
        largeImage: $largeImage
        ) {
            id
            title
            description
            price
            image
            largeImage
        }
    }
`;

class UpdateItem extends Component {
    state = {};

    handleChange = (e) => {
        const { name,type,value } = e.target;
        const val = type === 'number' ? parseFloat(value) : value;
        this.setState({ [name]: val});
    };

    updateItem = async (e, updateItemMutation) => {
        e.preventDefault();
        const res = await updateItemMutation({
            variables: {
                id: this.props.id,
                ...this.state,

            }
        });
    };

    render(){
        return(
            <Query query={SINGLE_ITEM_QUERY} variables={{ id: this.props.id }}>
                {({ data } ,loading) => {
                    if(loading) return <p>Loading ...</p>;
                    if(!data.item) return <h1>No Item Found</h1>;
                    return (
                        <Mutation mutation={UPDATE_ITEM_MUTATION} variables={this.state}>
                            {(updateItem, { loading, error})=>(
                                
                            <Form onSubmit= {e => this.updateItem(e, updateItem)}>
                            <h2>Update {data.item.title} Details</h2>
                            <ErrorMessage error={error}></ErrorMessage>
                            <fieldset disabled={loading} aria-busy={loading}>

                                {data.item.image && <img src={data.item.image} alt="Image Preview"></img> /**TODO: Add an 'x' button to delete entry from cloudinary and upload a new image */}
                                {/*
                                <label htmlFor="file">
                                    Upload Image
                                    <input type="file" name="file" id="file" placeholder='Upload Image' required onChange={this.handleImage}/>
                                </label>
                                */}
                                <label htmlFor="title">
                                    Title
                                    <input type="text" name="title" id="title" placeholder='Title' required defaultValue={data.item.title} onChange={this.handleChange}/>
                                </label>

                                <label htmlFor="price">
                                    Price (KSH)
                                    <input type="number" name="price" id="price" placeholder='Price' required defaultValue={data.item.price} onChange={this.handleChange}/>
                                </label>

                                <label htmlFor="description">
                                    Description
                                    <textarea type="number" name="description" id="description" placeholder='Enter A Description' required defaultValue={data.item.description} onChange={this.handleChange}/>
                                </label>

                                <button type='Submit'>Sav{loading ? 'ing' : 'e'} Changes</button>
                            </fieldset>
                        </Form>
                        )}
                    </Mutation>
                )
            }}
        </Query>
        );
    }
};

export default UpdateItem;
export { UPDATE_ITEM_MUTATION };
export { SINGLE_ITEM_QUERY };