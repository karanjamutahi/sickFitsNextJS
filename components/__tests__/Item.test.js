import Item from '../Item';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';

const fakeItem = {
    id:"sdlkajhsda0sa09dia",
    title: "Fake Item",
    description: "Just a Fake Item",
    image: "dog.jpg",
    largeImage: "large-dog.jpg",
    price:5999,
};

describe('Item Component', ()=>{
    const wrapper = shallow(<Item item={fakeItem}></Item>);

    it("Renders and matches the snapshot", () => {
        expect(toJSON(wrapper)).toMatchSnapshot();
    });

    xit("renders and displays correctly", () =>{
        const priceTag = wrapper.find('PriceTag');
        expect(priceTag.children().text()).toBe("$59.99");
        expect(wrapper.find('Title a').children().text()).toBe(fakeItem.title);
    });

    xit("Renders the image properly", () => {
        const image = wrapper.find('img');
        expect(image.props().src).toBe(fakeItem.image);
        expect(image.props().alt).toBe(fakeItem.title);
    });

    xit("Renders out the buttons properly", () => {
        const buttonList = wrapper.find('.buttonList');
        expect(buttonList.children()).toHaveLength(3);
        expect(buttonList.find('Link').exists()).toBeTruthy();
        expect(buttonList.find('AddToCart').exists()).toBeTruthy();
        expect(buttonList.find('DeleteItem').exists()).toBeTruthy();
    });
});