const express = require('express');
const router = express.Router();
const config  = require('../config')
const cors = require('cors')


const userController = require('../controllers/userController');
const microcController = require('../controllers/microcController');
const {checkAuth} = require("../middlewares/auth");

router.post('/login',cors(config.corsOptions),userController.login);
router.post('/logout',cors(config.corsOptions),checkAuth,userController.logout);
router.get('/api/user/listbadge',cors(config.corsOptions),checkAuth,userController.getListBadge);
router.get('/listaccess',cors(config.corsOptions),checkAuth,userController.getListAccess);


router.get('/user/listobject',checkAuth,cors(config.corsOptions),microcController.getData);

module.exports = router;