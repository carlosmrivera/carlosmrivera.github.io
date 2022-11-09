describe('Testing app.js', () => { 
    beforeAll(() => {
        testing = true
    })

    it('Should have a defined length into board variable', () => { 
        expect(board.length).toBe(HEIGHT);
        expect(board.every(row => row.length === WIDTH)).toBeTruthy();
    })

    it('Should have only null values when initialized', () => { 
        expect(board.every(row => row.every(cell => cell === null))).toBeTruthy();
    })

    it('Should start with player 1', () => {
        expect(currPlayer).toBe(1);
    })

    it('Should test the game UI with identifiers', () => {
        const top = document.getElementById('column-top');

        expect(top).toBeTruthy();
        expect(document.getElementById('board')).toBeTruthy();
        expect(document.querySelectorAll('td').length).toBe(HEIGHT * WIDTH + WIDTH);
        expect(document.querySelectorAll('tr').length).toBe(HEIGHT + 1);
    })

    it('Should test game results', () => {
        const top = document.getElementById('column-top');
        const tds = top.querySelectorAll('td')
        td1 = tds[0]
        td2 = tds[1]

        expect(checkForWin()).toBeFalsy();

        td1.click();
        td2.click();
        td1.click();
        td2.click();
        td1.click();
        td2.click();
        td1.click();

        expect(checkForWin()).toBeTruthy();

    })

    it('Should lock the board and dont allow new movements', () => {
        finishGame(true)
        const top = document.getElementById('column-top');
        const td = top.querySelector('td')
        
        td.click();

        expect(document.querySelectorAll('.piece').length).toEqual(0);
    })

    it('Should place a piece into the board', () => {
        updateBoard(0, 0)
        placeInTable(0, 0)

        expect(document.querySelectorAll('.piece').length).toEqual(1);
        expect(board[0][0]).toEqual(1);
    })

    it('Should find a spot for a piece', () => {
        expect(findSpotForCol(0)).toEqual(5);

        //add some pieces to the board
        updateBoard(5, 0)
        updateBoard(4, 0)

        expect(findSpotForCol(0)).toEqual(3);

        //keep adding pieces
        updateBoard(3, 0)
        updateBoard(2, 0)
        updateBoard(1, 0)
        updateBoard(0, 0)

        expect(findSpotForCol(0)).toEqual(null);
    })

    it('Should change the player', () => {
        expect(currPlayer).toEqual(1);
        switchPlayers()
        expect(currPlayer).toEqual(2);
        switchPlayers()
        expect(currPlayer).toEqual(1);
    })

    afterEach(() => {
        makeBoard();
        makeHtmlBoard();
    })

    afterAll(() => {
        testing = false
    })
    
})