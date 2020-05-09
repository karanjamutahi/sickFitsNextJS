import { mount } from 'enzyme';
import wait from 'waait';
import toJSON from 'enzyme-to-json';
import { MockedProvider } from 'react-apollo/test-utils';
import Cart, { LOCAL_STATE_QUERY } from '../Cart';
import { CURRENT_USER_QUERY } from '../User';
import { fakeUser, fakeCartItem } from '../../lib/testUtils';
import { ApolloConsumer } from 'react-apollo';
import AddToCart, {ADD_TO_CART_MUTATION} from '../AddToCart';
import { ApolloClient } from 'apollo-boost';            

const mocks = [
    {
        request: { query: CURRENT_USER_QUERY },
        result: { data: { me: {
            ...fakeUser(),
            cart: [],
        }}}
    },
    {
        request: { query: CURRENT_USER_QUERY },
        result: { data: { me: {
            ...fakeUser(),
            cart: [fakeCartItem()],
        }}}
    },
    {
        request: { query: ADD_TO_CART_MUTATION, variables: { id: 'abc123' }},
        result: { data: {
            addToCart: {
                ...fakeCartItem(),
                quantity: 1,
            }
        }}
    },
    
]

describe('AddToCart Component', () => {
    it("Renders and Matches Snapshot", async () => {
        const wrapper = mount(
            <MockedProvider mocks={mocks}>
                <AddToCart id="abc123"></AddToCart>
            </MockedProvider>
        );
        await wait();
        wrapper.update();
        //console.log(wrapper.debug());
        expect(toJSON(wrapper.find('button'))).toMatchSnapshot();
    });

    xit("adds an item when clicked", async () => {
        let apolloClient;
        const wrapper = mount(
            <MockedProvider mocks={mocks}>
               <ApolloConsumer>
                   {(client) => {
                       apolloClient = client;
                       return(
                           <AddToCart id="abc123"></AddToCart>
                       )
                   }}
               </ApolloConsumer>
            </MockedProvider>
        );
        await wait();
        wrapper.update();
        const  { data: { me }}  = await apolloClient.query({ query: CURRENT_USER_QUERY });
        //console.log(me);
        expect(me.cart).toHaveLength(0);
        const button = wrapper.find('button');
        //console.log(button.debug());
        button.simulate('click');
        await wait();
        const  { data: { me: me2 }}  = await apolloClient.query({ query: CURRENT_USER_QUERY });
        //console.log(me2);
        expect(me2.cart).toHaveLength(1);
        expect(me2.cart[0].id).toBe('omg123');
        expect(me2.cart[0].quantity).toBe(3);
    });

    it("Changes from Add to Adding when clicked", async () => {
        const wrapper = mount(
            <MockedProvider mocks={mocks}>
                <AddToCart id="abc123"></AddToCart>
            </MockedProvider>
        );

        await wait();
        wrapper.update();
        expect(wrapper.text()).toContain('Add To Cart');
        wrapper.find('button').simulate('click');
        expect(wrapper.text()).toContain('Adding To Cart');
    });
});