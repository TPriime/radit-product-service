const router = require("express").Router();
const { internalServerError } = require("../utils/response");
const ProductControllers = require("../controllers/product");

router.get(
  "/all",
  async (req, res) => {
    try {
      await ProductControllers.getAllProducts(req, res);
    } catch (error) {
      internalServerError(res, error);
    }
  }
);


router.get(
  "/:productName",
  async (req, res) => {
    try {
      await ProductControllers.getProduct(req, res);
    } catch (error) {
      internalServerError(res, error);
    }
  }
);

router.put("/",
  async (req, res) => {
    try {
      await ProductControllers.createProduct(req, res);
    } catch (error) {
      internalServerError(res, error);
    }
  }
);

router.delete("/:productName",
  async (req, res) => {
    try {
      await ProductControllers.deleteProduct(req, res);
    } catch (error) {
      internalServerError(res, error);
    }
  }
);

module.exports = router;
