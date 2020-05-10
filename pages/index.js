import Items from '../components/Items';

//const version = React.version;

const Home = props => {
    //console.log(`React version = ${version}`);
    return (
    <div>
        <Items page={parseInt(props.query.page) || 1}/>
    </div>
)};

export default Home;