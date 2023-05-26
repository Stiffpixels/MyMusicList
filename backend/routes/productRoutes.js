const express = require("express")
const router = express.Router()
const {isAuthorizedUser, authorizeRoles} = require("../middleware/auth")

const { getProducts, ProductsStatic, getProductDetail, addProduct,updateProducts, deleteProducts } = require("../controllers/productController")

router.route("/products").get(getProducts)
router.route("/productsStatic").get(ProductsStatic)
router.route("/productDetail").get(getProductDetail)

router.route("/product/new").post(isAuthorizedUser,authorizeRoles('admin'),addProduct)

router.route("/products/update").put(isAuthorizedUser,authorizeRoles('admin'),updateProducts)
router.route("/products/delete").delete(isAuthorizedUser, authorizeRoles('admin'), deleteProducts)

module.exports = router