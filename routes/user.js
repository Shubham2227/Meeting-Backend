const express = require('express');
const bodyParser = require('body-parser');
const cors = require('../config/cors');
const router = express();
const UserController = require('../controller/user').UserController;

router.use(bodyParser.json());

router.route('/login')
      .options(cors.corsWithOptions,(req,res) => res.sendStatus(200))
      .post(cors.corsWithOptions,UserController.login);

router.route('/signup')
      .options(cors.corsWithOptions,(req,res) => res.sendStatus(200))
      .post(cors.corsWithOptions,UserController.signup);

module.exports = router;