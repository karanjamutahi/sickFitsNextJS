import formatMoney from '../formatMoney';

describe('Format Money function', () => {
    it('Converts cents to dollars', () => {
        expect(formatMoney(100)).toEqual('$1');
    });

    it('Works with fractional dollars', () => {
        expect(formatMoney(1)).toEqual('$0.01');
        expect(formatMoney(9)).toEqual('$0.09');
        expect(formatMoney(40)).toEqual('$0.40');
    });

    it('Rounds off Whole Dollars', () => {
        expect(formatMoney(1000)).toEqual('$10');
    });

    it('Works with whole dollars and fractions', () => {
        expect(formatMoney(5012)).toEqual("$50.12");
    });
})