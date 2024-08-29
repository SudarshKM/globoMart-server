const express = require('express')

const router =  new express.Router()

const productController = require('./controller/productController')

const userController = require('./controller/userController')

const wishlistController = require('./controller/wishlistController')

const cartController = require('./controller/cartController')

const jwt = require('./middelware/jwtMiddelware')


router.get('/all-product', productController.allProductController);


// perticular product

router.get('/product/:id',productController.getAproductController)

//register user

router.post('/register',userController.registerController)

router.post('/login',userController.loginController)

//wishlist

router.post('/add-wishlist',jwt,wishlistController.addToWishListController)

router.get('/wishlist-items',jwt,wishlistController.getItemsFromWishList)

router.delete('/wishlist-items/:id',wishlistController.removeItemsFromWishList)


//cart

router.post('/add-cart',jwt,cartController.addToCartController)

router.get('/cart-items',jwt,cartController.getItemsFromCart)

router.put('/decrement-cart',jwt,cartController.decrementCartItem)

router.delete('/delete-cart/:id',cartController.deleteCartItemController)

router.delete('/empty-cart',jwt,cartController.emptyCartController)

module.exports = router