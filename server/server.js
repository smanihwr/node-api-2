const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const morgan = require('morgan');

// now '_' will be available in all sub routes - but anti pattern
global._ = require('lodash');

const lionRouter = require('./lion');
const tigerRouter = require('./tiger');

app.use(morgan('dev'));
app.use(express.static('client'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// routes
app.use('/lions', lionRouter);
app.use('/tigers', tigerRouter);

app.use((err, req, res, next) => {
    if(err) {
        console.log(err.message);
        res.status(500).send(err);
    }
});

const port = 3000;
app.listen(port, () => {
    console.log(`listening on port  ${port}`);
});
