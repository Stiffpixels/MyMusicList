const Product = require('../models/productModel')
const ErrorHandler = require('../utils/errorHandler')


const getProducts = async (req, res, next)=>{
    const { name, price, fields, category } = req.query;
    const qParams = {}

    if(name){
        qParams.name = { $regex:name, $options:'i' }
    }

    if(category){
        qParams.category ={ $in: category.split(',') }
    }

    let results = Product.find(qParams)
    
    if(price){
        results = results.sort( {price:Number(price)} )
    }
    if(fields){
        results = results.select(fields)
    }
    
    const products = await results

    if(products.length===0){
        throw new ErrorHandler("No products found", 404)
    }

    res.status(200).json(products)
}

const getProductDetail = async (req, res)=>{
    const { id } = req.query
    const product = await Product.findById(id)
    if(!product){
        throw new ErrorHandler("No product found with that id", 404)
    }
    res.status(200).json(product)
}

const ProductsStatic = async(req, res)=>{
    const productsFetched = await Product.find()
    res.status(200).json(productsFetched)
}

const addProduct = async (req, res)=>{
    const product = await Product.create(req.body)

    if(!product){
        throw new ErrorHandler("No product found with that id", 404)
    }

    res.status(200).json({
        success:true,
        product
    })
}

const updateProduct = async (req, res)=>{
    const status = await Product.findOneAndUpdate({_id:req.query.id}, req.body, { new:true })

    res.status(200).json({
        success:true,
        status
    })
}

const deleteProducts = async (req, res)=>{
    const { id, field } = req.query
    const product = {}
    
    if(id){
        product.oneProduct = await Product.findOneAndDelete({_id:id})
    }
    if(field){
        const fieldList = field.split(",")
        const fieldQuery = {}
        fieldQuery[fieldList[0]] = fieldList[1]

        product.products = await Product.deleteMany(fieldQuery)
    }
    res.status(200).json({
        success:true,
        product
    })

}

module.exports = { getProducts, ProductsStatic, getProductDetail, addProduct, updateProduct, deleteProducts }