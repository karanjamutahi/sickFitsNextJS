import React, { Component } from 'react';
import styled from 'styled-components';
import Head from 'next/head';
import {  Query } from 'react-apollo';

import { SINGLE_ITEM_QUERY } from './UpdateItem';
import Error from './ErrorMessage';
import Loading from './Loading';

const SingleItemStyles = styled.div`
  max-width: 1200px;
  margin: 2rem auto;
  box-shadow: ${props => props.theme.bs};
  display: grid;
  grid-auto-columns: 1fr;
  grid-auto-flow: column;
  min-height: 800px;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  .details {
    margin: 3rem;
    font-size: 2rem;
  }
`;

class SingleItem extends Component {
    render() {
        return (
            <Query query={SINGLE_ITEM_QUERY} variables={{id: this.props.id}}>
            {({ data , error, loading })=>{
                    if (loading) return <Loading loading={true}></Loading> ;
                    if(error) return <Error error={error}></Error>;
                    if(!data.item) return <p>404: Item not Found</p> ;
                    return (
                        <SingleItemStyles>
                            <Head>
                                <title>Sick Fits | {data.item.title}</title>
                            </Head>
                            <img src={data.item.largeImage} alt={data.item.title} />
                            <div className="details">
                                <h2>Viewing {data.item.title}</h2>
                                <p>{data.item.description}</p>
                            </div>
                        </SingleItemStyles>
                    )
                }
            }
        </Query>
        );
    }
}

export default SingleItem;