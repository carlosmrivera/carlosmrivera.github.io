let motorcycle = new Motorcycle({
    make: 'Honda',
    model: 'Nighthawk',
    year: 2000
})

describe('Testing Motorcycle class', () => {
    it('Should be an instance of Car', () => {
        expect(motorcycle).toBeInstanceOf(Motorcycle)
    })

    it('Should have 4 wheels', () => {
        expect(motorcycle.numWheels).toEqual(2)
    })

    it('Should rev the engine', () => {
        expect(motorcycle.revEngine ()).toEqual('VROOM!!!')
    })
    
    it('Should return Honda as the make', () => {
        expect(motorcycle.make).toEqual('Honda')
    })

    it('Should return Nighthawk as the model', () => {
        expect(motorcycle.model).toEqual('Nighthawk')
    })

    it('Should return 2000 as the year', () => {
        expect(motorcycle.year).toEqual(2000)
    })

    it('Should honk', () => {
        expect(motorcycle.honk()).toEqual('Beep.')
    })

    it('Should return an stringified instance of the motorcycle', () => {
        expect(motorcycle.toString()).toEqual('The vehicle is a Honda Nighthawk from 2000.')
    })
})

