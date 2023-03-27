const ExpressError = require('./ExpressError');
const fs = require('fs');

const validateQueryNums = (nums) => {
    if (!nums) {
        throw new ExpressError('You must provide a list of numbers', 400);
    }

    return nums.split(',').map(num => {
        const parsedNum = parseInt(num);
        if (isNaN(parsedNum)) {
            throw new ExpressError(`'${num}' is not a number`, 400);
        }

        return parsedNum;
    });
}

const writeToFile = (data) => {
    const filename = 'results.json';

    fs.appendFileSync(filename, `${JSON.stringify({timestamp: new Date().getTime(), ...data})}\n`, (err) => {
        if (err) throw new ExpressError('Error writing to file', 500);
    });
};

const calculateMean = (nums) => {
    return nums.reduce((acc, num) => acc + num, 0) / nums.length || 0;
}

const calculateMedian = (nums) => {
    const sortedNums = nums.sort((a, b) => a - b);
    const center = Math.floor(sortedNums.length / 2);

    if (sortedNums.length % 2 === 0) {
        return (sortedNums[center] + sortedNums[center - 1]) / 2;
    }

    return sortedNums[center];
}

const calculateMode = (nums) => {
    return nums.sort((a, b) =>
        nums.filter(v => v === a).length - nums.filter(v => v === b).length
    ).pop();
}

module.exports = {
    validateQueryNums,
    writeToFile,
    calculateMean,
    calculateMedian,
    calculateMode
}