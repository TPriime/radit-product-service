process.env.NODE_ENV = 'test';

let Product = require('../interface/commons/models/product');

let chai = require('chai');
let should = chai.should();

const rpcProductClient = require("./util/rpc-clients").porductClient;


describe('products', () => {
    // clear db after each run
    beforeEach((done) => {
        Product.remove({}, (err) => {
            done();
        }); 
    });

    /*
     * Test the rpc product service
     */
    describe('RPC:getProductByName product', () => {
        it('it should fetch a product given the product name', (done) => {
            let product = new Product({
                productName: "milk",
                productPrice: "500",
                productCount: "10"
            })
            product.save((err, prodt) => {
                rpcProductClient.getProductByName(
                    {
                        productName: prodt.productName
                    },
                    (error, res) => {
                        chai.assert(res.status, "status is not true");
                        chai.assert.equal(res.product.productName, prodt.productName);
                        done();
                    });
            });
        });
    });

    describe('RPC:getProductById product', () => {
        it('it should fetch a product given the product id', (done) => {
            let product = new Product({
                productName: "uhgyvh",
                productPrice: "1000",
                productCount: "10"
            })
            product.save((err, prodt) => {
                console.log(prodt)
                rpcProductClient.getProductById(
                    {
                        productId: prodt._id
                    },
                    (error, res) => {
                        console.log(res)
                        chai.assert(res.status, "status is not true");
                        chai.assert.equal(res.product.productId, prodt._id.toString());
                        chai.assert.equal(res.product.productName, prodt.productName);
                        done();
                    });
            });
        });
    });
});