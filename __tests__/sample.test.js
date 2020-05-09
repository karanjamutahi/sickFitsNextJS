describe('Sample Test 101', ()=> {
    it('Works as Expected', () => {
        expect(1).toEqual(1);
    });

    it('Handles ranges properly', ()=> {
        const age = 200;
        expect(age).toBeGreaterThan(100);
    });

    it('makes a list of dog names', () => {
        const dogs = ['Hugo', 'Snickers'];
        expect(dogs).toEqual(dogs);
        expect(dogs).toContain('Snickers');
    })
});