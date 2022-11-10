const v = new Vehicle({
    make: 'Ford',
    model: 'Explorer',
    year: 2021
})

describe('Testing Vehicle class', () => {
    it('Should be an instance of Vehicle', () => {
        expect(v).toBeInstanceOf(Vehicle)
    })
    
    it('Should return Ford as the make', () => {
        expect(v.make).toEqual('Ford')
    })

    it('Should return Explorer as the model', () => {
        expect(v.model).toEqual('Explorer')
    })

    it('Should return 2021 as the year', () => {
        expect(v.year).toEqual(2021)
    })

    it('Should honk', () => {
        expect(v.honk()).toEqual('Beep.')
    })

    it('Should return an stringified instance of the vehicle', () => {
        expect(v.toString()).toEqual('The vehicle is a Ford Explorer from 2021.')
    })
})

