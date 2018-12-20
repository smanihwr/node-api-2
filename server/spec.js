var app = require('./server');
var request = require('supertest');
var expect = require('chai').expect;
require('colors');

describe('[LIONS]'.yellow, function () {
    it('should get all lions', function (done) {
        request(app)
            .get('/lions')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, resp) => {
                expect(resp.body).to.be.an('array');
                done();
            });
    });

    it('should create a lion', function (done) {
        const simba = {
            "name": "Simba",
            "age": 3,
            "pride": "the cool cats",
            "gender": "male"
        };
        request(app)
            .post('/lions')
            .send(simba)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(201)
            .end((err, resp) => {
                var respSimba = resp.body;
                expect(respSimba).to.be.an('object');
                expect(respSimba.name).to.equal(simba.name);
                done();
            });
    });


    it('should delete a lion', function (done) {
        const simba = {
            "name": "Simba",
            "age": 3,
            "pride": "the cool cats",
            "gender": "male"
        };
        request(app)
            .post('/lions')
            .send(simba)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(201)
            .end((err, resp) => {
                var id = resp.body.id;
                expect(resp.body).to.be.an('object');
                request(app)
                    .delete('/lions/' + id)
                    .end((err, resp) => {
                        var respSimba = resp.body;
                        expect(respSimba).to.be.an('object');
                        expect(respSimba.name).to.equal(simba.name);
                        done();
                    })
            });
    });

    it('should update a lion', function (done) {
        const simba = {
            "name": "Simba",
            "age": 3,
            "pride": "the cool cats",
            "gender": "male"
        };
        request(app)
            .post('/lions')
            .send(simba)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(201)
            .end((err, resp) => {
                expect(resp.body).to.be.an('object');

                var id = resp.body.id;
                const updatedSimba = {
                    "name": "Simba",
                    "age": 3,
                    "pride": "the cool big cats",
                    "gender": "male"
                };

                request(app)
                    .put('/lions/' + id)
                    .send(updatedSimba)
                    .set('Accept', 'application/json')
                    .expect('Content-Type', /json/)
                    .expect(201)
                    .end((err, resp) => {
                        var respSimba = resp.body;
                        expect(respSimba).to.be.an('object');
                        expect(respSimba.pride).to.equal(updatedSimba.pride);
                        done();
                    });
            });
    });
});
