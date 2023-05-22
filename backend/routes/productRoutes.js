const express = require("express")
const router = express.Router()

const { getProducts, ProductsStatic, getProductDetail, addProduct,updateProducts, deleteProducts } = require("../controllers/productController")

router.route("/products").get(getProducts)
router.route("/productsStatic").get(ProductsStatic)
router.route("/productDetail").get(getProductDetail)

router.route("/product/new").post(addProduct)

router.route("/products/update").put(updateProducts)
router.route("/products/delete").delete(deleteProducts)

module.exports = router