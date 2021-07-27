const loader = require("../utils/loader");
const Product = require("../../commons/models/product");
const PROTO_PATH = __dirname + '/../proto/product.proto';
const { ObjectID } = require('mongodb');

const protoDescriptor = loader.loadProto(PROTO_PATH);

function getProductByName(call, callback) {
  const productName = call.request.productName
  Product.findOne(
    {
      productName: productName
    },
    null,
    (error, product) => {
      const status = !error && product;
      // set productId key for response
      if (product) product.productId = product._id.toString();
      return callback(error, { status, product });
    }
  );
  // callback(null, {
  //     status: true,
  //     product: { productName: "seriveYam", productPrice: 160 },
  // });
}


function getProductById(call, callback) {
  try {
    const productId = ObjectID(call.request.productId)
    Product.findOne(
      {
        _id: productId
      },
      null,
      (error, product) => {
        const status = !error && product;
        // set productId key for response
        if (product) product.productId = product._id.toString();
        return callback(error, { status, product });
      }
    );
  } catch (err) {
    return callback(err, { status: false, product: null });
  }
}


module.exports = {
  service: protoDescriptor.ProductService.service,
  methods: {
    getProductById,
    getProductByName
  }
};
