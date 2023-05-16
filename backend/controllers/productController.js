const Product = require('../models/productModel')
const ErrorHandler = require('../utils/errorHandler')


const getProducts = async (req, res, next)=>{
    const { name,price,fields } = req.query;
    const qParams = {}

    if(name){
        qParams.name = { $regex:name, $options:'i' }
    }

    let results = Product.find(qParams)
    
    if(price){
        results = results.sort( {price:Number(price)} )
    }
    if(fields){
        results = results.select(fields)
    }
    
    const products = await results

    res.status(200).json(products)
}

const getProductsStatic = async(req, res)=>{
    /*await Product.insertMany([
        {
            name:'Chocolate',
            price:250,
            rating:4,
            category:'attar',
        },
        {
            name:'vanila',
            price:200,
            rating:4.5,
            category:'attar',
        },
        {
            name:'Strawberry',
            price:350,
            rating:5,
            category:'deodrant',
        }
    ])*/
    const productsFetched = await Product.find()
    res.status(200).json(productsFetched)
}

module.exports = { getProducts, getProductsStatic }