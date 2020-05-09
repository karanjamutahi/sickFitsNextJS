import CreateItem from '../components/CreateItem';
import PleaseSignIn from '../components/PleaseSignIn';

const Sell = props => (
    <PleaseSignIn>
        <CreateItem></CreateItem>
    </PleaseSignIn>
);

export default Sell;