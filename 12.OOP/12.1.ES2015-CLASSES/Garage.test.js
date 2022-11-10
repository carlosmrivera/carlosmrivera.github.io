let g = new Garage(2)

describe('Testing Garage class', () => {
    it('Should be an instance of Garage', () => {
        expect(g).toBeInstanceOf(Garage)
    })
    
    it('Should return 2 as the capacity', () => {
        expect(g.capacity).toEqual(2)
    })

    it('Should return an empty array as the initial vehicles', () => {
        expect(g.vehicles).toBeInstanceOf(Array)
        expect(g.vehicles.length).toEqual(0)
    })

    it('Should only add vehicles to the garage', () => {
        expect(g.add('X')).toEqual('Only vehicles are allowed in here!')
        expect(g.add(new Motorcycle({make: 'Honda', model: 'Best model ever', year: 2022}))).toEqual('Vehicle added!')
        expect(g.vehicles.length).toEqual(1)
    })

    it('Should not add when full', () => {
        expect(g.add(new Motorcycle({make: 'Honda', model: 'Best model ever', year: 2022}))).toEqual('Vehicle added!')
        expect(g.vehicles.length).toEqual(1)
        expect(g.add(new Car({make: 'Ford', model: 'Explorer', year: 2023}))).toEqual('Vehicle added!')
        expect(g.vehicles.length).toEqual(2)
        expect(g.add(new Vehicle({make: 'Chevy', model: 'Spark', year: 2015}))).toEqual(`Sorry, we're full.`)

    })

    afterEach(() => {
        g = new Garage(2)
    });

})

