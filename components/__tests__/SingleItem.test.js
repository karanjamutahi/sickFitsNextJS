import { mount } from 'enzyme';
import toJSON from 'enzyme-to-json';
import wait from 'waait';
import SingleItem from '../SingleItem';
import { SINGLE_ITEM_QUERY } from '../UpdateItem';
import { MockedProvider } from 'react-apollo/test-utils';
import { fakeItem } from '../../lib/testUtils';

describe("Single Item Component", () => {
    let mocks = [
        {
            request: { query: SINGLE_ITEM_QUERY, variables: { id: fakeItem().id }},
            result: { data: { item: fakeItem(), },}
        }
];

    it("Renders with proper data", async () => {
        const wrapper = mount(
        <MockedProvider mocks={mocks}>
            <SingleItem id={fakeItem().id}></SingleItem>
        </MockedProvider>
        );
        expect (wrapper.find('Loading')).toBeTruthy();
        await wait();
        wrapper.update();
        expect(toJSON(wrapper.find('h2'))).toMatchSnapshot() ;
    });

    it("Errors with a not found item", async () => {
        mocks[0].result = {
            errors: [
                {
                    message: "Item not found!"
                }
            ]
        };

        const wrapper = mount(
            <MockedProvider mocks={mocks}>
                <SingleItem id={fakeItem().id}></SingleItem>
            </MockedProvider>
        );

        await wait();
        wrapper.update();
        const item = toJSON(wrapper.find('[data-test="graphql-error"]'));
        expect(item).toMatchSnapshot();
    });
});