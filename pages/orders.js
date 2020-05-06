import Orders from "../components/Orders"
import PleaseSignIn from "../components/PleaseSignIn";

const ordersPage = props => {
    console.log(props.query);
    return (
        <PleaseSignIn>
            <Orders userID={props.query.userID ? props.query.userID : ''}>
                <p>Orders Page</p>
            </Orders>
        </PleaseSignIn>
    )
};

export default ordersPage;