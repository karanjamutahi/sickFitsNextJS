import { mount } from 'enzyme';
import wait from 'waait';
import toJSON from 'enzyme-to-json';
import { MockedProvider } from 'react-apollo/test-utils';
import Cart, { LOCAL_STATE_QUERY } from '../Cart';
import { CURRENT_USER_QUERY } from '../User';
import { fakeUser, fakeCartItem, fakeItem } from '../../lib/testUtils';
import { ApolloConsumer } from 'react-apollo';
import RemoveFromCart,{ REMOVE_FROM_CART_MUTATION } from '../RemoveFromCart';
import { ApolloClient } from 'apollo-boost';


const mocks = [
    {
        request: { query: CURRENT_USER_QUERY },
        result: { data: { me: {
             ...fakeUser(),
            cart: [ fakeItem({id: 'abc123'})]
            }}}
    },
    {
        request: { query: REMOVE_FROM_CART_MUTATION, variables: { id: 'abc123'}},
        result: { data: { removeFromCart: { 
            __typename: 'CartItem',
            id: 'abc123'
        }}}
    }
];

describe("RemoveFromCart Component", () => {
    it("Renders and matches Snapshot", () => {
        const wrapper = mount(
            <MockedProvider>
                <RemoveFromCart id="abc123"></RemoveFromCart>
            </MockedProvider>
        );
        //console.log(wrapper.debug());
        expect(toJSON(wrapper.find('button'))).toMatchSnapshot();
    });

    xit("Removes item from cart", async () => {
        let apolloClient;
        const wrapper = mount(
            <MockedProvider mocks={mocks}>
                <ApolloConsumer>
                    {(client) => {
                        apolloClient = client;
                        return(<RemoveFromCart id="abc123"></RemoveFromCart>);
                    }}
                </ApolloConsumer>
            </MockedProvider>
        );
        //console.log(apolloClient);
        const res = await apolloClient.query({query: CURRENT_USER_QUERY});
        console.log(res);
        expect(res.data.me.cart).toHaveLength(1);
        wrapper.find('button').simulate('click');
        await wait();
        const res2 = await apolloClient.query({query: CURRENT_USER_QUERY});
        console.log(res2); 
        expect(res2.data.me.cart).toHaveLength(0);
    });
});