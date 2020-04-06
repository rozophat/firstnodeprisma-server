var express = require('express');
var router = express.Router();

let index = require('../controllers/index');
let user = require('../controllers/user');

router.get('/login', user.show_login);
router.get('/signup', user.show_signup);
router.post('/login', user.login);
router.post('/signup', user.signup);
/* GET home page. */
router.get('/', index.index);

module.exports = router;
