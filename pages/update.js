
import UpdateItem from '../components/UpdateItem';

const Update = (props) => {
    return(
    <div>
        <UpdateItem id={props.query.id}></UpdateItem>
    </div>
    )
} 

export default Update; 