const lionRouter = require('express').Router();

var lions = [];
var id = 0;

lionRouter.param('id', (req, res, next, id) => {
    var index = _.findIndex(lions, {id: id});
    var lion = lions[index];

    if(lion) {
        req.lion = lion;
        next();
    } else {
        res.status(404).send();
    }
});

lionRouter.get('/', (req, res) => {
    // to test error middleware
    //throw new Error('Custom error');

    res.json(lions);
});

lionRouter.get('/:id', (req, res) => {
    res.json(req.lion);
});

incrementId = (req, res, next) => {
    req.body.id = ++id + '';
    next();
};

lionRouter.post('/', incrementId, (req, res) => {
    var lion = req.body;
    lions.push(lion);
    res.json(lion);
});

lionRouter.put('/:id', (req, res) => {

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


lionRouter.delete('/:id', (req, res) => {
    var lion = req.lion;
    if(!lion) {
        res.send();
    } else {
        var deletedLion = lion;
        lions.splice(lion, 1)
        res.json(deletedLion);
    }
});

module.exports = lionRouter;