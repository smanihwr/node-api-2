const tigerRouter = require('express').Router();

var tigers = [];
var id = 0;

tigerRouter.param('id', (req, res, next, id) => {
    var index = _.findIndex(tigers, {id: id});
    var tiger = tigers[index];

    if (tiger) {
        req.tiger = tiger;
        next();
    } else {
        res.status(404).send();
    }
});

incrementId = (req, res, next) => {
    req.body.id = ++id + '';
    next();
};

tigerRouter.route('/')
    .get((req, res) => {
        // to test error middleware
        //throw new Error('Custom error');
        res.json(tigers);
    })
    .post(incrementId, (req, res) => {
        var tiger = req.body;
        tigers.push(tiger);
        res.json(tiger);
    });

tigerRouter.route('/:id')
    .get((req, res) => {
        res.json(req.tiger);
    })
    .put((req, res) => {

        let update = req.body;
        if (update.id) {
            delete update.id;
        }

        if (!req.tiger) {
            res.send();
        } else {
            var updatedTiger = _.assign(req.tiger, update);
            res.json(updatedTiger);
        }
    })
    .delete((req, res) => {
        var tiger = req.tiger;
        if (!tiger) {
            res.send();
        } else {
            var deletedTiger = tiger;
            tigers.splice(tiger, 1)
            res.json(deletedTiger);
        }
    });

module.exports = tigerRouter;