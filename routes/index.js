const { Router } = require('express');
const router = Router();
const shoes = require('./routesShoes.js')
const users = require('./routesUsers.js')
const brands = require('./routesBrand.js')

router.use('/shoes', shoes)
router.use('/users', users)
router.use('/brands', brands)


module.exports = router;