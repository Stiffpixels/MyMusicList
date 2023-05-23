const express = require("express")
const router = express.Router()
const isAuthorizedUser = require("../middleware/auth")

const { getProducts, ProductsStatic, getProductDetail, addProduct,updateProducts, deleteProducts } = require("../controllers/productController")

router.route("/products").get(isAuthorizedUser, getProducts)
router.route("/productsStatic").get(ProductsStatic)
router.route("/productDetail").get(getProductDetail)

router.route("/product/new").post(addProduct)

router.route("/products/update").put(updateProducts)
router.route("/products/delete").delete(deleteProducts)

module.exports = router