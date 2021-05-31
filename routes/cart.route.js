const router = require('express').Router()
const bodyParser = require('body-parser')
const check = require('express-validator').check

const authGurad = require('./guards/auth.guard')

const cartController = require('../controllers/cart.controller')


router.get('/', authGurad.isAuth, cartController.getCart)

router.post('/', authGurad.isAuth, bodyParser.urlencoded({ extended: true }), check('amount').notEmpty().withMessage('please set up the amount').isInt({ min: 1 }).withMessage('Amount cant be less then 1'),
    cartController.postCart)

router.post('/save', authGurad.isAuth, bodyParser.urlencoded({ extended: true }), check('amount').notEmpty().withMessage('please set up the amount').isInt({ min: 1 }).withMessage('Amount cant be less then 1'),
    cartController.postSave)

router.post('/delete', authGurad.isAuth, bodyParser.urlencoded({ extended: true }),
    cartController.postDelete)

module.exports = router