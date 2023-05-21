const Product = require('../models/productModel')
const ErrorHandler = require('../utils/errorHandler')


const getProducts = async (req, res, next)=>{
    const { name, price, fields, category, numFilters, page, limit } = req.query;
    const qParams = {}
    const newLimit = Number(limit) || 10
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
            if(qParams.hasOwnProperty(field)){
                const prevQuery = qParams[field]
                qParams[field] = {...prevQuery, [operator]:Number9=(value)}
                return
            }
            qParams[field] = { [operator]:Number(value) }
            
        })
        
    }

    let results = Product.find(qParams)
    
    if(Number(page)>1){
        const skipItems = page*newLimit
        console.log(skipItems)
        results = results.skip(skipItems)
    }

    results = results.limit(newLimit)

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

//function to generate a mongodb query using switch conditional
const getQuery = (field)=>{
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
            break;
        default:
            throw new ErrorHandler("Please provide a valid field either name, price, category, or rating")
    }

    return fieldQuery
}

//updates single or multiple products
const updateProducts = async (req, res)=>{
    const { id, field } = req.query
    let status;
    const newValues = req.body
    

    if(id){
         status = await Product.findOneAndUpdate({_id:req.query.id}, newValues, { new:true })
    }
    if(field){
        const fieldQuery = getQuery(field)
        const matchedProduct = await Product.find(fieldQuery)
        
        if(matchedProduct.length===0){
            throw new ErrorHandler("No product found with that field value", 404)
        }
        
        status = await Product.updateMany( fieldQuery, {$set:newValues},{ multi:true }) 
    }
    

    res.status(200).json({
        success:true,
        status
    })
}

//deletes single or multiple matched documents
const deleteProducts = async (req, res)=>{
    const { id, field } = req.query
    const product = {}
    
    if(id){
        product.oneProduct = await Product.findOneAndDelete({_id:id})
    }
    if(field){
        const fieldQuery = getQuery(field)
        const matchedProduct = await Product.find(fieldQuery)
        
        if(matchedProduct.length===0){
            throw new ErrorHandler("No product found with that field value", 404)
        }
        
        product.products = await Product.deleteMany(fieldQuery)
        
        
    }

    res.status(200).json({
        success:true,
        product
    })

}

module.exports = { getProducts, ProductsStatic, getProductDetail, addProduct, updateProducts, deleteProducts }