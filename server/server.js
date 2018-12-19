const express = require('express');
const bodyParser = require('body-parser');
const app = express();
var _ = require('lodash');

app.use(express.static('client'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var lions = [];
var id = 0;

app.get('/lions', (req, res) => {
    res.json(lions);
});

app.get('/lions/:id', (req, res) => {
    let lion = _.find(lions, req.params.id);
    res.json(lion || {});
});

app.post('/lions', (req, res) => {
    var lion = req.body;

    lion.id = ++id + '';
    lions.push(lion);
    res.json(lion);
});

app.put('/lions/:id', (req, res) => {

    let id = req.params.id;
    let update = req.body;

    if(update.id) {
        delete update.id;
    }

    var index = _.findIndex(lions, {id: id});

    if(!lions[index]) {
        res.send();
    } else {
        var updatedLion = _.assign(lions[index], update);
        res.json(updatedLion);
    }
});


app.delete('/lions/:id', (req, res) => {

    let id = req.params.id;
    var index = _.findIndex(lions, {id: id});
    var lion = lions[index];

    if(!lion) {
        res.send();
    } else {
        var deletedLion = lion;
        lions.splice(lion, 1)
        res.json(deletedLion);
    }
});

const port = 3000;
app.listen(port, () => {
    console.log(`listening on port  ${port}`);
});
