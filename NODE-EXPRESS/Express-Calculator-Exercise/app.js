const express = require('express');
const { calculateMean, calculateMedian, calculateMode, validateQueryNums, writeToFile } = require('./functions');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// /mean route
app.get('/mean', (req, res, next) => {
    try {
        const nums = validateQueryNums(req.query.nums)
        const shouldSave = req.query?.save === 'true'
        
        const response = {
            operation: 'mean',
            value: calculateMean(nums)
        }

        shouldSave && writeToFile(response, shouldSave);

        return res.json(response);

    } catch (error) {
        next(error)
    }
});

// /median route
app.get('/median', (req, res, next) => {
    try {
        const nums = validateQueryNums(req.query.nums)
        const shouldSave = req.query?.save === 'true'

        const response = {
            operation: 'median',
            value: calculateMedian(nums)
        }

        shouldSave && writeToFile(response, shouldSave);

        return res.json(response);

    } catch (error) {
        next(error)
    }
});

// /mode route
app.get('/mode', (req, res, next) => {
    try {
        const nums = validateQueryNums(req.query.nums)
        const shouldSave = req.query?.save === 'true'

        const response = {
            operation: 'mode',
            value: calculateMode(nums)
        }

        shouldSave && writeToFile(response, shouldSave);

        return res.json(response);

    } catch (error) {
        next(error)
    }
});

// /all route
app.get('/all', (req, res, next) => {
    try {
        const nums = validateQueryNums(req.query.nums)
        const shouldSave = req.query?.save === 'true'

        const response = {
            operation: 'all',
            mean: calculateMean(nums),
            median: calculateMedian(nums),
            mode: calculateMode(nums)
        }

        shouldSave && writeToFile(response, shouldSave);

        return res.json(response);

    } catch (error) {
        next(error)
    }
});

// 404 route handler
app.use((_, __, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// general error route handler
app.use((err, _, res, __) => {
    const statusCode = err.status || 500

    return res.status(statusCode).json({
        error: true,
        statusCode,
        errorMessage: err.message ?? 'Something went wrong'
    });

});

app.listen(5010, () => {
    console.log('App running on port 5010');
});