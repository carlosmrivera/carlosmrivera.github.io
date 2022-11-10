let car = new Car({
    make: 'Chevy',
    model: 'Spark',
    year: 2022
})

describe('Testing Car class', () => {
    it('Should be an instance of Car', () => {
        expect(car).toBeInstanceOf(Car)
    })

    it('Should have 4 wheels', () => {
        expect(car.numWheels).toEqual(4)
    })
    
    it('Should return Chevy as the make', () => {
        expect(car.make).toEqual('Chevy')
    })

    it('Should return Spark as the model', () => {
        expect(car.model).toEqual('Spark')
    })

    it('Should return 2022 as the year', () => {
        expect(car.year).toEqual(2022)
    })

    it('Should honk', () => {
        expect(car.honk()).toEqual('Beep.')
    })

    it('Should return an stringified instance of the car', () => {
        expect(car.toString()).toEqual('The vehicle is a Chevy Spark from 2022.')
    })
})

