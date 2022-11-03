describe("Payments test", function () {


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

    it("should add a new payment to allPayments on submitPaymentInfo()", function () {
        billAmtInput.value = 100;
        tipAmtInput.value = 20;
        submitPaymentInfo();
        expect(Object.keys(allPayments).length).toEqual(1);
        expect(allPayments['payment1'].billAmt).toEqual('100');
        expect(allPayments['payment1'].tipAmt).toEqual('20');
        expect(allPayments['payment1'].tipPercent).toEqual(20);
    });

    it("should not add a new payment to allPayments on submitPaymentInfo() with empty input", function () {
        billAmtInput.value = '';
        tipAmtInput.value = '';
        submitPaymentInfo();
        expect(Object.keys(allPayments).length).toEqual(0);
    })

    it("should not add a new payment to allPayments on submitPaymentInfo() with negative input", function () {
        billAmtInput.value = -100;
        tipAmtInput.value = -20;
        submitPaymentInfo();
        expect(Object.keys(allPayments).length).toEqual(0);
    })

    it("should create a new payment on createCurPayment()", function () {
        billAmtInput.value = 100;
        tipAmtInput.value = 20;
        expect(createCurPayment()).toEqual({
            billAmt: '100',
            tipAmt: '20',
            tipPercent: 20
        });
    })

    it("should not create a new payment on createCurPayment() with empty input", function () {
        billAmtInput.value = '';
        tipAmtInput.value = '';
        expect(createCurPayment()).toEqual(undefined);
    })

    it("should not create a new payment on createCurPayment() with negative input", function () {
        billAmtInput.value = -100;
        tipAmtInput.value = -20;
        expect(createCurPayment()).toEqual(undefined);
    })

    it("should append a new payment to the payment table on appendPaymentTable()", function () {
        let curPayment = {
            billAmt: '100',
            tipAmt: '20',
            tipPercent: 20
        };
        appendPaymentTable(curPayment);
        expect(paymentTbody.getElementsByTagName('tr').length).toEqual(1);
    })

    afterAll(function () {
        // teardown logic
        billAmtInput.value = '';
        tipAmtInput.value = '';
        allPayments = {};
        paymentTbody.innerHTML = '';
        serverTbody.innerHTML = '';
    })

});
