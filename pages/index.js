import Link from 'next/link'
import Items from '../components/Items';
import gql from 'graphql-tag'

const Home = props => (
    <div>
        <Items page={parseInt(props.query.page) || 1}/>
    </div>
);
export default Home;