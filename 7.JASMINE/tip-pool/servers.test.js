describe("Servers test (with setup and tear-down)", function () {
    beforeEach(function () {
        // initialization logic
        //I dont need to do anything here but an example of what I would do
        serverNameInput.value = '';
    });

    afterEach(function () {
        serverNameInput.value = '';
    });

    it('should add a new server to allServers on submitServerInfo()', function () {
        const testServers = [
            'Carlos',
            'Alice',
            'Bob'
        ]

        testServers.forEach(function (server, index) {
            serverNameInput.value = server;
            submitServerInfo();
            expect(allServers[`server${index + 1}`].serverName).toEqual(server);
        })

        expect(Object.keys(allServers).length).toEqual(3);
    });

    it('should return the row numbers on the servers table', function () {
        const length = Object.keys(allServers).length
        expect(serverTbody.getElementsByTagName('tr').length).toEqual(length);
    });

    afterAll(function () {
        // teardown logic
        //I dont need to do anything here but an example of what I would do
        serverNameInput.value = '';
        allServers = {};
        
    })


});
