const { Db } = require('mongodb')
const productsModule = require('../models/products.model')

exports.getHome = (req, res, next) => {
    let category = req.query.category
    let validCategories = ['PC', 'T-shirt', 'watches']
    let productsPromise
    if (category && validCategories.includes(category)) productsPromise = productsModule.getProductsByCategory(category)
    else productsPromise = productsModule.getAllProducts()
    productsPromise.then(products => {
        res.render('index', {
            products: products,
            isUser: req.session.userId,
            isAdmin: req.session.isAdmin,
            validationError: req.flash('validationErrors')[0],
            pageTitle: 'Home'
        })
    })
}
