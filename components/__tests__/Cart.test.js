import { mount } from 'enzyme';
import wait from 'waait';
import toJSON from 'enzyme-to-json';
import { MockedProvider } from 'react-apollo/test-utils';
import Cart, { LOCAL_STATE_QUERY } from '../Cart';
import { CURRENT_USER_QUERY } from '../User';
import { fakeUser, fakeCartItem } from '../../lib/testUtils';
import { ApolloConsumer } from 'react-apollo';

const mocks = [
    {
        request: { query: CURRENT_USER_QUERY },
        result: { data: { 
            me: {
                ...fakeUser(),
                cart: [fakeCartItem()],
            }
        }}
    },
    {
        request: { query: LOCAL_STATE_QUERY },
        result: { data: {
            cartOpen: true
        }}
    }
];

describe("Cart Component", () => {
    it("Renders and matches snapshot", async ()=> {
        const wrapper = mount(
            <MockedProvider mocks={mocks}>
                <Cart></Cart>
            </MockedProvider>
        );
        await wait();
        wrapper.update();
        const cart = wrapper.find('header');
        //console.log(cart.debug());
        //console.log(toJSON(cart));
        expect(toJSON(cart)).toMatchSnapshot();
        expect(wrapper.find('CartItem')).toHaveLength(1);
    });
});