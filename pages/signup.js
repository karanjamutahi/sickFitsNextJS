import Signup from '../components/Signup';
import styled from 'styled-components';
import Login from '../components/Login';
import RequestReset from '../components/RequestReset';

const Columns = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    grid-gap: 20px;

`;

const signupPage = (props) => {
    return (
    <Columns>
        <Signup></Signup>
        <Login></Login>
        <RequestReset></RequestReset>
    </Columns>
    )
}
export default signupPage;