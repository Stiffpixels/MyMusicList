const Product = require('../models/productModel')
const ErrorHandler = require('../utils/errorHandler')


const getProducts = async (req, res, next)=>{
    const { name, price, fields, category, numFilters } = req.query;
    const qParams = {}

    

    if(name){
        qParams.name = { $regex:name, $options:'i' }
    }

    if(category){
        qParams.category ={ $in: category.split(',') }
    }
    
    if(numFilters){
        const operatorMap ={
            ">":"$gt",
            ">=":"$gte",
            "==":"$eq",
            "<":"$lt",
            "<=":"$lte"
        }

        const re = /\b(>|>=|==|<+|<)\b/g

        const mongoNumFilters = numFilters.replace(re, (match)=>`-${operatorMap[match]}-`)
        
        mongoNumFilters.split(",").map((filter)=>{
            
            const [ field, operator, value ] = filter.split('-')
            qParams[field] = { [operator]:Number(value) }
        })
        
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
    const { id, field } = req.query
    let status;
    const newValues = req.body
    const fieldQuery = {}

    if(id){
         status = await Product.findOneAndUpdate({_id:req.query.id}, newValues, { new:true })
    }
    if(field){
        const fieldList = field.split(",")

        switch(fieldList[0]){
            case 'name':
                fieldQuery.name = fieldList[1]
                break;
            case 'price':
                fieldQuery.price = fieldList[1]
                break;
            case 'category':
                fieldQuery.category = fieldList[1]
                break;
            case 'rating':
                fieldQuery.rating = fieldList[1]
        }
        
        console.log(fieldQuery)
        status = await Product.updateMany( fieldQuery, {$set:newValues},{ multi:true }) 
    }
    

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

        switch(fieldList[0]){
            case 'name':
                if(fieldList[1]==='notexists'){
                    fieldQuery.name = { $exists:false }
                }else{
                    fieldQuery.name = fieldList[1]
                }
                break;
            case 'price':
                fieldQuery.price = fieldList[1]
                break;
            case 'category':
                fieldQuery.category = fieldList[1]
                break;
            case 'rating':
                fieldQuery.rating = Number(fieldList[1])
        }
        
        product.products = await Product.deleteMany(fieldQuery)
    }
    res.status(200).json({
        success:true,
        product
    })

}

module.exports = { getProducts, ProductsStatic, getProductDetail, addProduct, updateProduct, deleteProducts }