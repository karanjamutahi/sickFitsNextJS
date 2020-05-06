
import UpdateItem from '../components/UpdateItem';
import PleaseSignIn from '../components/PleaseSignIn';

const Update = (props) => {
    return(
    <PleaseSignIn>
        <UpdateItem id={props.query.id}></UpdateItem>
    </PleaseSignIn>
    )
} 

export default Update; 