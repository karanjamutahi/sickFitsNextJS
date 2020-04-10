import React, { Component } from 'react';
import gql from 'graphql-tag';
import Link from 'next/link';
import Head from 'next/head';

import PaginationStyles from './styles/PaginationStyles';
import { Query } from 'react-apollo';
import Loading from './Loading';
import Error from './ErrorMessage';
import { perPage } from '../config';
import Title from './styles/Title';



const PAGINATION_QUERY = gql`
    query PAGINATION_QUERY {
        itemsConnection {
            aggregate {
                count
            }
        }
    }
`;


const Pagination = (props) => (
        <Query query={ PAGINATION_QUERY } >
            {({ data , loading, error }) => {
                if (loading) return <Loading loading={loading}></Loading>;
                if (error) return <Error error={error}></Error>; 
                const count = data.itemsConnection.aggregate.count;
                const pages = Math.ceil(count/perPage);
                let page = props.page;
                return (   
                <PaginationStyles>
                        <Head>
                            <title>Sick Fits | Page {page}</title>
                        </Head>
                        <Link 
                        prefetch
                        href={{
                            pathname:'items',
                            query: {
                                page: page>1 ? page -1 : pages
                            }
                        }}><a className='prev'>◄ Prev</a></Link>
                        <p>{`Page ${page} of ${pages} 😎`}</p>
                        <Link 
                        prefetch
                        href={{
                            pathname:'items',
                            query: {
                                page: page<pages ? page +1 : 1
                            }
                        }}><a>Next ►</a></Link>
                </PaginationStyles>
                );
            }}
        </Query>
)

export default Pagination ;