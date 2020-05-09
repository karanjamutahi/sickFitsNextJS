import PleaseSignIn from '../../components/PleaseSignIn';
import Order from '../../components/Order';

const OrderPage = props => {
    return(
        <PleaseSignIn>
            <Order id={props.query.OrderID}></Order>
        </PleaseSignIn>
    );
};

export default OrderPage;