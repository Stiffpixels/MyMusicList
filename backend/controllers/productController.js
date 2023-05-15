const Product = require('../models/productModel')

const getProducts = async (req, res)=>{
    const { name,price } = req.query;
    const qParams = {}
    

    if(name){
        qParams.name = { $regex:name, $options:'i' }
    }

    let results = Product.find()
    if(price){
        results = Product.find(qParams).sort( {price:Number(price)} )
    }
    
    results = await results
    res.status(200).json(results)
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