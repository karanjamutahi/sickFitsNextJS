import { mount } from 'enzyme';
import wait from 'waait';
import toJSON from 'enzyme-to-json';
import { MockedProvider } from 'react-apollo/test-utils';
import Cart, { LOCAL_STATE_QUERY } from '../Cart';
import { CURRENT_USER_QUERY } from '../User';
import { fakeUser, fakeCartItem, fakeItem } from '../../lib/testUtils';
import { ApolloConsumer } from 'react-apollo';
import { ApolloClient } from 'apollo-boost';
import NProgress from 'nprogress';
import Router from 'next/router';
import TakeMyMoney, { CREATE_ORDER_MUTATION } from '../TakeMyMoney';

Router.router = { push() {} };

const mocks = [
    {
        request: {query: CURRENT_USER_QUERY},
        result: { data: { me: {
            ...fakeUser(),
            cart: [fakeCartItem()]
        }}}
    },
    {
        request: {query: CREATE_ORDER_MUTATION, variables: {

        }},
        result: { data: { createOrder: {

        }}}
    }
]
describe("TakeMyMoney Component", async () => {
    xit("Renders and matches snapshot", () => {
        const wrapper = mount(
            <MockedProvider mocks={mocks}>
                <TakeMyMoney></TakeMyMoney>
            </MockedProvider>
        );

        console.log(wrapper.debug());
        await wait();
        wrapper.update();
    });
});