process.env.NODE_ENV = 'test';

// let mongoose = require("mongoose");
let Product = require('../interface/commons/models/product');

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index').server;
let should = chai.should();


chai.use(chaiHttp);

describe('products', () => {
    var preventDelete = false;

    beforeEach((done) => {
        if(!preventDelete) {
            Product.remove({}, (err) => {
                done();
            });
        }
        else {
            preventDelete = false;
            done();
        }
    });
    describe('/GET/all product', () => {
        it('it should GET all the products', (done) => {
            chai.request(server)
                .get('/all')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.products.should.be.a('array');
                    res.body.products.length.should.be.eql(0);
                    done();
                });
        });
    });
    describe('/PUT product', () => {
        it('it should PUT a product ', (done) => {
            let product = {
                productName: "yam",
                productPrice: "500",
                productCount: "10"
            }
            chai.request(server)
                .put('/')
                .send(product)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('Created product data');
                    res.body.should.have.property('product');
                    res.body.product.should.have.property('productName');
                    res.body.product.should.have.property('productPrice');
                    res.body.product.should.have.property('productCount');
                    res.body.product.productName.should.have.be.eql('yam');
                    preventDelete = true
                    done();
                });
        });
        it('it should not PUT a product with the same name', (done) => {
            let product = {
                productName: "yam",
                productPrice: "500",
                productCount: "10"
            }
            chai.request(server)
                .put('/')
                .send(product)
                .end((err, res) => {
                    res.should.not.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('error');
                    done();
                });
        });
    });
    describe('/GET/:productName product', () => {
        it('it should GET a product by the given product name', (done) => {
            let product = new Product({
                productName: "yam",
                productPrice: "500",
                productCount: "10"
            });
            product.save((err, product) => {
                chai.request(server)
                    .get('/' + product.productName)
                    .send(product)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.product.should.have.property('productName');
                        res.body.product.should.have.property('productPrice');
                        res.body.product.should.have.property('productCount');
                        done();
                    });
            });

        });
    });
    /*
     * Test the /DELETE/:id route
     */
    describe('/DELETE/:productName product', () => {
        it('it should DELETE a product given the product name', (done) => {
            let product = new Product({
                productName: "milk",
                productPrice: "500",
                productCount: "10"
            })
            product.save((err, product) => {
                chai.request(server)
                    .delete('/' + product.productName)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('message').eql('Deleted product data');
                        res.body.result.should.have.property('itemCount');
                        res.body.result.should.have.property('deletedCount');
                        done();
                    });
            });
        });
    });
});