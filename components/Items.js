import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';

import Item from './Item';
import Pagination from './Pagination';
import { perPage } from '../config';

const Center = styled.div`
    text-align: center;
`;

const ItemsList = styled.div`
    display:grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 60px;
    max-width: ${props => props.theme.maxWidth};
    margin: 0 auto;
`;

const ALL_ITEMS_QUERY = gql`
    query ALL_ITEMS_QUERY(
        $skip: Int = 0, 
        $first: Int = ${perPage},
        ) {
        items(
            first: $first,
            skip: $skip,
            orderBy: updatedAt_DESC
            ){
                id,
                title,
                description,
                price,
                image,
                largeImage
        }
    }
`;

class Items extends Component {
    render() {
        return (
            <Center>
                <Pagination page={this.props.page}></Pagination>
                <Query query={ALL_ITEMS_QUERY} variables={{
                    skip: this.props.page * perPage - perPage,
                    first: perPage,     
                }}>
                    {({ error, loading, data }) => {
                        if(loading) return <p>Loading ...</p>
                        if(error) return <p>Error :(</p>
                        return <ItemsList>{ data.items.map( item => <Item item={item} key={item.id}></Item>) }</ItemsList>
                    }}
                </Query>
                <Pagination page={this.props.page}></Pagination>
            </Center>
        );
    }
}

export default Items;
export { ALL_ITEMS_QUERY };