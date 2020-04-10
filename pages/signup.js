import Signup from '../components/Signup';
import styled from 'styled-components';
import Login from '../components/Login';

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
    </Columns>
    )
}
export default signupPage;