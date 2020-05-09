import { shallow, mount } from 'enzyme';
import toJSON from 'enzyme-to-json';
import CartCount from '../CartCount';

describe("CartCount Component renders properly", () => {
    it("Renders", () => {
        shallow(<CartCount count={10}/>);
    });

    it("Matches the snapshot", () => {
        const wrapper = shallow(<CartCount count={10}></CartCount>);
        expect(toJSON(wrapper)).toMatchSnapshot();
    });

    it("Updates via props", () => {
        const wrapper = shallow(<CartCount count={50}></CartCount>);
        expect(toJSON(wrapper)).toMatchSnapshot();
        wrapper.setProps({count: 10});
        expect(toJSON(wrapper)).toMatchSnapshot();
    });

});