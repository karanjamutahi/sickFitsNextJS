import { mount } from 'enzyme';
import wait from 'waait';
import toJSON from 'enzyme-to-json';
import Router from 'next/Router';
import { MockedProvider } from 'react-apollo/test-utils';
import CreateItem, { CREATE_ITEM_MUTATION } from '../CreateItem';
import { fakeItem } from '../../lib/testUtils';
import { resultKeyNameFromField } from 'apollo-utilities';

const dogImage = 'https://unsplash.com/dog.jpg';
//Mock the global fetch API
global.fetch = jest.fn().mockResolvedValue({
    json: () => ({
        secure_url: dogImage,
        eager: [{ secure_url: dogImage}]
    })
});

describe("Create Item Component", () => {
    it('Renders and matches snapshot', () => {
        const wrapper = mount(
            <MockedProvider>
                <CreateItem></CreateItem>
            </MockedProvider>
        );

        expect(toJSON(wrapper.find('form[data-test="CreateItem"]'))).toMatchSnapshot();
    });

    it("Uploads a file when changed", async() => {
        const wrapper = mount(
            <MockedProvider>
                <CreateItem></CreateItem>
            </MockedProvider>
        );

        const input = wrapper.find('input[type="file"]');
        //console.log(input.debug());
        input.simulate('change', { target: { files: ['fakedog.jpg']}});
        await wait();
        const component = wrapper.find('CreateItem').instance();
        //console.log(component.state);
        expect(component.state.image).toEqual(dogImage);
        expect(component.state.largeImage).toEqual(dogImage);
        expect(global.fetch).toHaveBeenCalled();
        global.fetch.mockReset();
    });

    it("handles state updating", async () => {
        const wrapper = mount(
            <MockedProvider>
                <CreateItem></CreateItem>
            </MockedProvider>
        );
        const input = wrapper.find('input[name="title"]');
        //console.log(input.debug());
        input.simulate('change', { target:{
            name: 'title',
            value: 'dog',
            type: 'text'
        }});
        await wait();
        const instance = wrapper.find('CreateItem').instance();
        expect(instance.state.title).toEqual('dog');
    });

    it("creates an item when the form is submitted", async () => {
        const item = fakeItem();
        //console.log(item);

        const mocks = [{
            request: { query: CREATE_ITEM_MUTATION, variables: {
                title: item.title,
                description: item.description,
                price: item.price,
                image: '',
                largeImage: '',
            } },
            result: { data: {
                createItem: {
                    ...item,
                    __typename: 'Item'
                }
            }}
        }];

        const wrapper = mount(
            <MockedProvider mocks={mocks}>
                <CreateItem></CreateItem>
            </MockedProvider>
        );
        //console.log(wrapper.debug());

        const titleInput = wrapper.find('input[name="title"]');
        //console.log(titleInput.debug());
        titleInput.simulate('change', { target:{
            name: 'title',
            value: item.title,
        }});

        const descriptionInput = wrapper.find('#description');
        descriptionInput.simulate('change', { target: {
            name: 'description',
            value: item.description
        }});

        const priceInput = wrapper.find('input[name="price"]');
        priceInput.simulate('change', { target: {
            name: 'price',
            value: item.price,
            type: 'number'
        }});

        //Mock router
        Router.router = { push: jest.fn()};
        const form = wrapper.find('form');
        //console.log(form.debug());
        form.simulate('submit');    
        await wait(50);
        expect(Router.router.push).toHaveBeenCalled();
        expect(Router.router.push).toHaveBeenCalledWith("/item/[pid]", "/item/abc123");
    });
});