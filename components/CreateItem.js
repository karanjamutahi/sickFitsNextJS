import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Router from 'next/router';

import Form from './styles/Form';
import formatMoney from '../lib/formatMoney';
import ErrorMessage from './ErrorMessage';
import { ALL_ITEMS_QUERY } from './Items'; //dangerous to refetch query because it could take long

const CREATE_ITEM_MUTATION = gql`
    mutation CREATE_ITEM_MUTATION(
        $title: String!
        $description: String!
        $price: Int!
        $image: String
        $largeImage: String
    ) {
        createItem(
        title: $title
        description: $description
        price: $price
        image: $image
        largeImage: $largeImage
        ) {
            id
        }
    }
`;

class CreateItem extends Component {
    state = {
        title: '',
        description: '',
        image: '',
        largeImage: '',
        price: 0
    };

    handleChange = (e) => {
        const { name,type,value } = e.target;
        const val = type === 'number' ? parseFloat(value) : value;
        this.setState({ [name]: val});
    };

    handleImage = async (e) => {

        //1. Upload Image
        const files = e.target.files;
        const data = new FormData();
        data.append('file',files[0]);
        data.append('upload_preset', 'sickfits');
        const res = await fetch('https://api.cloudinary.com/v1_1/karanjamutahi/image/upload', {
            method: "POST",
            body: data
        });
        const file = await res.json(); 
        this.setState({
            image: file.secure_url,
            largeImage: file.eager[0].secure_url,
        })
    };

    render(){
        return(
            <Mutation mutation={CREATE_ITEM_MUTATION} variables={this.state} refetchQueries={ALL_ITEMS_QUERY}>
                {(createItem, { loading, error})=>(

            <Form data-test="CreateItem" onSubmit={ async e => {
                // 1.Stop form from submitting
                e.preventDefault();
                // 2. Poll for image to upload & return a URL
                /*
                while(!this.state.largeImage) { 
                    loading=true; //Hold the line & Disable the fieldset
                }
                loading = false; //Re-Enable the fieldset
                */
                //3. Run the mutation
                const { data } = await createItem();
                // 3. Change them to the Single Item Page
                Router.push(`/item/[pid]`, `/item/${data.createItem.id}`);
            }}>
                <h2>Sell an Item</h2>

                <ErrorMessage error={error}></ErrorMessage>
                <fieldset disabled={loading} aria-busy={loading}>

                    {this.state.image && <img src={this.state.image} alt="Image Preview"></img> /**TODO: Add an x button to delete entry from cloudinary and upload a new image */}
                    <label htmlFor="file">
                        Upload Image
                        <input type="file" name="file" id="file" placeholder='Upload Image' required onChange={this.handleImage}/>
                    </label>

                    <label htmlFor="title">
                        Title
                        <input type="text" name="title" id="title" placeholder='Title' required value={this.state.title} onChange={this.handleChange}/>
                    </label>

                    <label htmlFor="price">
                        Price (KSH)
                        <input type="number" name="price" id="price" placeholder='Price' required value={this.state.price} onChange={this.handleChange}/>
                    </label>

                    <label htmlFor="description">
                        Description
                        <textarea type="number" name="description" id="description" placeholder='Enter A Description' required value={this.state.description} onChange={this.handleChange}/>
                    </label>

                    <button type='Submit'>Add Item</button>
                </fieldset>
            </Form>
            )}
        </Mutation>
        );
    }
};

export default CreateItem;
export { CREATE_ITEM_MUTATION };