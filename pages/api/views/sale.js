var express = require('express');
var router = express.Router();

var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })


var saleController = require('../controllers/sale.js');

router.post('/newSale', jsonParser, async (req, res) => {
  var resultado = await saleController.newSale(req.body);
  await res.send(resultado);
});

router.get('/sales', urlencodedParser, async (req, res) => {
  var resultado = await saleController.getSales(req.query);
  await res.send(resultado);
});

module.exports = router;