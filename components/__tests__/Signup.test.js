import { mount } from 'enzyme';
import wait from 'waait';
import toJSON from 'enzyme-to-json';
import { MockedProvider } from 'react-apollo/test-utils';
import Signup, { SIGNUP_MUTATION } from '../Signup';
import { CURRENT_USER_QUERY } from '../User';
import { fakeUser } from '../../lib/testUtils';
import { ApolloConsumer } from 'react-apollo';


function type(wrapper, name, value) {
    //console.log(wrapper.find(`input[name="${name}"]`).debug());
    wrapper.find(`input[name="${name}"]`).simulate('change', {target: { name, value }});
}

const me = fakeUser();
const mocks = [
    {
        request:{ query: SIGNUP_MUTATION, variables: {
            email: me.email,
            password: 'password',
            Fname: me.firstname,
            lastname: 'fanya kitu unataka',
        }},
        result: { data: {
            signUp: {
                __typename: 'User',
                id: 'abc123',
                email: me.email,
                firstname: me.firstname, 
            }
        }}
    },
    {
        request: { query: CURRENT_USER_QUERY,},
        result: { data: { me } },
    }
];

describe("Signup Component", () => {
     it("Renders and matches snapshot", async () => {
        const wrapper = mount(
            <MockedProvider>
                <Signup></Signup>
            </MockedProvider>
        );
        const signup = wrapper.find('form');
        //console.log(toJSON(signup));
        //console.log(wrapper.debug());
        expect(toJSON(signup)).toMatchSnapshot();
     });

     xit('Calls the mutation properly', async () => {
        let apolloClient;
        const wrapper = mount(
            <MockedProvider mocks={mocks}>
                <ApolloConsumer>
                    { client => {
                        apolloClient = client;
                        return (<Signup></Signup>);
                        } 
                    }
                </ApolloConsumer>
            </MockedProvider>
        );
        await wait();
        wrapper.update();
        //console.log(apolloClient);
        //console.log(wrapper.find('input').debug());
        type(wrapper, 'Fname', me.firstname);
        type(wrapper, 'email', me.email);
        type(wrapper, 'password', "password");
        wrapper.update();
        const form = wrapper.find('form[data-test="signup"]');
        //console.log(form.debug());
        form.simulate('submit');
        await wait();
        const user = await apolloClient.query({ query: CURRENT_USER_QUERY});
        console.log(user);
     });

     
});