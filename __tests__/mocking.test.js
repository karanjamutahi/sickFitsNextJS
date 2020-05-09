function Person(name, foods, ) {
    this.name = name;
    this.foods = foods;
} 

Person.prototype.fetchFavFoods = function () {
    return new Promise((resolve, reject) => {
        //Simulate async API
        setTimeout(() => {
            return resolve(this.foods);
        },2000);
    });
}

describe("Learning Mocking", ()=> {
    it('Mocks a reg function', () => {
        const fetchDogs = jest.fn();
        fetchDogs('Snickers');
        fetchDogs('Hugo');
        expect(fetchDogs).toHaveBeenCalledWith('Snickers');
    });

    it('Can create a person', () => {
        const me = new Person('Karanja', ['pizza', 'burgers']);
        expect(me.name).toEqual('Karanja');
    });

    it("Can fetch food", async () => {
        const me = new Person('Karanja', ['pizza', 'burgers']);
        ///Mock the fetchFavFoods function
        me.fetchFavFoods = jest.fn().mockResolvedValue(['sushi', 'ramen', 'pizza']);
        const foods = await me.fetchFavFoods();
        expect(foods).toContain('pizza');
    });
});