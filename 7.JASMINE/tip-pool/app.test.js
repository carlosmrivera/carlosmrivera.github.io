describe("appendDeleteBtn Tests", function () {
    it("should append a delete button inside a td to the tr", function () {
        const tr = document.createElement('tr');
        appendDeleteBtnServer(tr);
        const td = tr.querySelector('td');
        expect(tr.childElementCount).toEqual(1);
        expect(td).not.toBeNull();
        expect(td.childElementCount).toEqual(1);
        expect(td.querySelector('button')).not.toBeNull();
        
    })
});