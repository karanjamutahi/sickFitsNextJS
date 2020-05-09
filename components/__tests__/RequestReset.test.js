import { mount } from 'enzyme';
import wait from 'waait';
import toJSON from 'enzyme-to-json';
import { MockedProvider } from 'react-apollo/test-utils';
import RequestReset, { REQUEST_RESET_MUTATION } from '../RequestReset';

const mocks = [
    {
        request: { query: REQUEST_RESET_MUTATION, variables: {email: "mutahi.henry@gmail.com"}},
        result: { data: { requestReset: { message: "success", __typename: "Message" } } }
    }
]
describe("RequestReset Component", () => {
    it("Renders and matches snapshot", async () => {
        const wrapper = mount(
        <MockedProvider>
            <RequestReset></RequestReset>
        </MockedProvider>
        );
        const form = wrapper.find('form[data-test="form"]');
        //console.log(form.debug());
        expect(toJSON(form)).toMatchSnapshot();
    });

    it("Calls the mutation", async () => {
        const wrapper = mount(
            <MockedProvider mocks={mocks}>
                <RequestReset></RequestReset>
            </MockedProvider>
        );
        //console.log(wrapper.debug());
        //Simulate typing an email
        wrapper.find('input').simulate('change', { target: { name: 'email', value: 'mutahi.henry@gmail.com' } } );
        wrapper.find('form').simulate('submit');
        await wait();
        wrapper.update();
        expect(wrapper.find('p').text()).toContain("We've sent a reset link to your email");
    });
});