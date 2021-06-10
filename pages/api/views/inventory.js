var express = require('express');
var router = express.Router();

var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })

var inventoryController = require('../controllers/inventory.js');

router.get('/inventory', urlencodedParser, async (req, res) => {
  var resultado = await inventoryController.getInventory(req.query);
  await res.send(resultado);
});

module.exports = router;