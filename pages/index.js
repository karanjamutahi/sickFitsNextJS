import React from 'react';
import Items from '../components/Items';

const Home = props => {
    console.log(`React version = ${React.version}`);
    return (
    <div>
        <Items page={parseInt(props.query.page) || 1}/>
    </div>
)};

export default Home;