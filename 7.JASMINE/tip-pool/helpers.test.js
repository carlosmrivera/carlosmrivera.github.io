describe("Helpers test", function () {

    beforeEach(function () {
        // initialization logic
        billAmtInput.value = '';
        tipAmtInput.value = '';
    });

    afterEach(function () {
        // teardown logic
        billAmtInput.value = '';
        tipAmtInput.value = '';
        allPayments = {};
        paymentTbody.innerHTML = '';
        serverTbody.innerHTML = '';
    });

    it("should sum all tip amounts from allPayments on sumPaymentTotal()", function () {
        billAmtInput.value = 100;
        tipAmtInput.value = 20;
        submitPaymentInfo();
        billAmtInput.value = 200;
        tipAmtInput.value = 40;
        submitPaymentInfo();
        expect(sumPaymentTotal('tipAmt')).toEqual(60);
    })

    it("should calculate the total tip", function () {
        expect(calculateTipPercent(100, 20)).toEqual(20);
        expect(calculateTipPercent(175, 20)).toEqual(11);
    });

    it("should append a td to a tr", function () {
        let newTr = document.createElement('tr');
        appendTd(newTr, 'test');
        expect(newTr.children.length).toEqual(1);
        expect(newTr.firstChild.innerHTML).toEqual('test');
    })

    afterAll(function () {
        summaryTds[0].innerHTML = '';
        summaryTds[1].innerHTML = '';
        summaryTds[2].innerHTML = '';
    });
});
