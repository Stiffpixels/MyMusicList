const express = require("express")
const router = express.Router()
const {isAuthorizedUser, authorizeRoles} = require("../middleware/auth")

const { getProducts, ProductsStatic, getProductDetail, addProduct,updateProducts, deleteProducts, createUpdateReview } = require("../controllers/productController")

router.route("/products").get(getProducts)
router.route("/productsStatic").get(ProductsStatic)
router.route("/productDetail").get(getProductDetail)
router.route("/product/review").post(isAuthorizedUser, createUpdateReview)

router.route("/admin/product/new").post(isAuthorizedUser,authorizeRoles('admin'),addProduct)

router.route("/admin/products/update").put(isAuthorizedUser,authorizeRoles('admin'),updateProducts)
router.route("/admin/products/delete").delete(isAuthorizedUser, authorizeRoles('admin'), deleteProducts)

module.exports = router