import { mount } from 'enzyme';
import toJSON from 'enzyme-to-json';
import wait from 'waait';
import PleaseSignIn from '../PleaseSignIn';
import { MockedProvider } from 'react-apollo/test-utils';
import { fakeUser } from '../../lib/testUtils';
import { CURRENT_USER_QUERY } from '../User';

const notSignedInMock = [
    {
        request: { query: CURRENT_USER_QUERY },
        result: { data: { me: null}, },
    }
];

const signedInMock = [
    {
        request: { query:  CURRENT_USER_QUERY  },
        result: { data: { me: fakeUser() }, },
    }
];


describe("Gated Sign In", () => {
    it("Prevents unauthenticated users from proceeding", async () => {
        const wrapper = mount(
            <MockedProvider mocks={notSignedInMock}>
                <PleaseSignIn></PleaseSignIn>
            </MockedProvider>   
        );
        await wait();
        wrapper.update();
        expect(wrapper.text()).toContain("Please Log In");
        expect(wrapper.find('Login').exists()).toBeTruthy();
    });

    it("Allows Logged In user to continue", async () => {
        const TestComponent = (props) => <p>Success</p>
        
        const wrapper = mount(
            <MockedProvider mocks={signedInMock}>
                <PleaseSignIn>
                    <TestComponent></TestComponent>
                </PleaseSignIn>
            </MockedProvider>
        );

        await wait();
        wrapper.update();
        expect(wrapper.find('TestComponent').exists()).toBeTruthy();
    });
});