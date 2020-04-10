import { useRouter } from 'next/router';
import Link from 'next/link';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

import SingleItem from '../../components/SingleItem';
import Router from 'next/router';


const Home = props => {
    const router = useRouter();
    return (
        <SingleItem id={router.query.pid}></SingleItem>
    )
};

export default Home;