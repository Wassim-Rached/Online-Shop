const productsModule = require('../models/products.model')

exports.getProduct = (req, res, next) => {
    productsModule.getFirstProduct().then(product => {
        res.render('product', {
            product: product,
            isUser: req.session.isUser,
            isAdmin: req.session.isAdmin
        })
    })
}

exports.getProductById = (req, res, next) => {
    let id = req.params.id
    productsModule.getProductsById(id).then(product => {
        res.render('product', {
            product: product,
            isUser: req.session.isUser,
            isAdmin: req.session.isAdmin,
            validationError: req.flash('validationErrors')[0],
            pageTitle: product.name
        })
    })

}