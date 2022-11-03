describe("Calculation tests", function() {
    it('should calculate the monthly rate correctly', function () {
        expect(calculateMonthlyRate(0)).toEqual(0)
        expect(calculateMonthlyRate(12)).toEqual(1)
        expect(calculateMonthlyRate(120)).toEqual(10)
        expect(calculateMonthlyRate('120usd')).toEqual(NaN)
    });
    
    it("should return a result with 2 decimal places", function() {
        expect(calculateMonthlyPayment({amount: 10000, years: 10, rate: 5})).toEqual('4166.67')
        expect(calculateMonthlyPayment({amount: 10000, years: 10, rate: 10})).toEqual('8333.33')
        expect(calculateMonthlyPayment({amount: 20000, years: 10, rate: 15})).toEqual('25000.00')
    });
});
