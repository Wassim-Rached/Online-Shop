const router = require('express').Router();
const bodyParser = require('body-parser');
const check = require('express-validator').check

const authGuard = require('./guards/auth.guard')

const authController = require('../controllers/auth.controller');

router.get("/signup", authGuard.notAuth, authController.getSignup);

router.post(
    "/signup", authGuard.notAuth,
    bodyParser.urlencoded({ extended: true }),
    check('username').isLength({ min: 3 }).withMessage('username must be at least 3 characters long'),
    check('email').notEmpty().withMessage('email cannot be empty').isEmail().withMessage('invalid email. please try again'),
    check('password').isLength({ min: 6 }).withMessage('password must be at least 6 characters long'),
    check('confirmPassword').custom((value, { req }) => {
        if (value === req.body.password) return true
        else throw 'password confirm does not match!'
    }),
    authController.postSignup
)

router.get("/login", authGuard.notAuth, authController.getLogin)

router.post(
    "/login", authGuard.notAuth,
    bodyParser.urlencoded({ extended: true }), authController.postLogin
)

router.all('/logout', authGuard.isAuth, authController.logout)

module.exports = router;