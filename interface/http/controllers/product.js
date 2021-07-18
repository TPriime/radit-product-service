const Product = require("../../commons/models/product");
const Errors = require("../utils/constants").errors;
const Success = require("../utils/constants").successMessages;

module.exports.createProduct = async (req, res) => {
  var product = new Product({
    productName: req.body.productName,
    productPrice: req.body.productPrice,
    productCount: req.body.productCount || 1,
  });
  try {
    await product.save();
    return res.status(200).json({
      status: Success.SUCCESS,
      message: Success.CREATED_PRODUCT_DATA,
      product: product,
    });
} catch (err) {
    console.error(err)
    return res.status(403).json({
      status: Errors.FAILED,
      error: Errors.DUPLICATE_PRODUCT
    });
  }
};

module.exports.getProduct = async (req, res) => {
  await Product.findOne(
    {
      productName: req.params.productName
    },
    {
      _id: 1,
      createdAt: 0,
      updatedAt: 0,
      __v: 0,
    },
    (error, product) => {
      if (error || !product) {
        return res.status(403).json({
          status: Errors.FAILED,
          message: Errors.PRODUCT_NOT_EXISTS,
        });
      }
      return res.status(200).json({
        status: Success.SUCCESS,
        message: Success.FETCHED_PRODUCT_DATA,
        product: product,
      });
    }
  );
};


module.exports.deleteProduct = async (req, res) => {
  var result = await Product.deleteOne({ productName: req.params.productName }, async (error) => {
    if (error)
      return res.status(403).json({
        status: Errors.FAILED,
        message: Errors.ACC_DELETE_FAILED,
      });
  });
  console.log(result)
  return res.status(200).json({
    status: Success.SUCCESS,
    message: Success.DELETED_PRODUCT_DATA,
    result : {
      itemCount: result.n, 
      deletedCount: result.deletedCount
    }
  });
}

module.exports.getAllProducts = async (req, res) => {
  await Product.find(
    {},
    (error, product) => {
      if (error || !product) {
        return res.status(403).json({
          status: Errors.FAILED,
          message: Errors.PRODUCT_NOT_EXISTS,
        });
      }
      return res.status(200).json({
        status: Success.SUCCESS,
        message: Success.FETCHED_PRODUCT_DATA,
        products: product,
      });
    }
  );
};