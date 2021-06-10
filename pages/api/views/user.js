var express = require('express');
var router = express.Router();

var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })


var userController = require('../controllers/user.js');

router.post('/loginUser', jsonParser, async (req, res) => {
  var resultado = await userController.consultarUsuario(req.body);
  await res.send(resultado);
});

module.exports = router;