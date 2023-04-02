const {calculateMean, calculateMedian, calculateMode, validateQueryNums, writeToFile} = require('../functions');
const fs = require('fs');

beforeAll(function () {
    fs.existsSync('results.json') && fs.unlinkSync('results.json');
});

afterAll(function () {
    fs.existsSync('results.json') && fs.unlinkSync('results.json');
});

describe("calculateMean", function () {
    test("calculates the mean of an empty array", function () {
        expect(calculateMean([])).toEqual(0);
    });
    test("calculates the mean of an array of numbers", function () {
        expect(calculateMean([1, -1, 4, 2])).toEqual(1.5);
    });
});

describe("calculateMedian", function () {
    test("calculates the median of an even set", function () {
        expect(calculateMedian([1, -1, 4, 2])).toEqual(1.5);
    });

    test("calculates the median of an odd set", function () {
        expect(calculateMedian([1, -1, 4])).toEqual(1);
    });
});

describe("calculateMode", function () {
    test("calculates the mode", function () {
        expect(calculateMode([1, 1, 1, 2, 2, 3])).toEqual(1);
    });
});

describe("validateQueryNums", function () {
    test("throws an error if there are no numbers", function () {
        expect(() => validateQueryNums()).toThrow();
    });

    test("throws an error if there is a non-number", function () {
        expect(() => validateQueryNums('1,2,3,4,5,6,7,8,9,0,foo')).toThrow();
    });

    test("returns an array of numbers if there are only numbers", function () {
        expect(validateQueryNums('1,2,3,4,5,6,7,8,9,0')).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 0]);
    });
});

describe("writeToFile", function () {
    test("writes data to results.json to a file", function () {
        writeToFile({foo: 'bar'});
        expect(fs.existsSync('./results.json')).toBe(true);
        expect(fs.readFileSync('./results.json', 'utf8')).toContain('"foo":"bar"');
    });
});