const express = require('express');
const bodyParser = require('body-parser');
const app = express();
var _ = require('lodash');

app.use(express.static('client'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var lions = [];
var id = 0;

app.param('id', (req, res, next, id) => {
    var index = _.findIndex(lions, {id: id});
    var lion = lions[index];

    if(lion) {
        req.lion = lion;
        next();
    } else {
        res.status(404).send();
    }
});

app.get('/lions', (req, res) => {
    // to test error middleware
    //throw new Error('Custom error');

    res.json(lions);
});

app.get('/lions/:id', (req, res) => {
    res.json(req.lion);
});

incrementId = (req, res, next) => {
    req.body.id = ++id + '';
    next();
};

app.post('/lions', incrementId, (req, res) => {
    var lion = req.body;
    lions.push(lion);
    res.json(lion);
});

app.put('/lions/:id', (req, res) => {

    let update = req.body;
    if(update.id) {
        delete update.id;
    }

    if(!req.lion) {
        res.send();
    } else {
        var updatedLion = _.assign(req.lion, update);
        res.json(updatedLion);
    }
});


app.delete('/lions/:id', (req, res) => {
    var lion = req.lion;
    if(!lion) {
        res.send();
    } else {
        var deletedLion = lion;
        lions.splice(lion, 1)
        res.json(deletedLion);
    }
});

app.use((err, req, res, next) => {
    if(err) {
        res.status(500).send(err);
    }
});

const port = 3000;
app.listen(port, () => {
    console.log(`listening on port  ${port}`);
});
