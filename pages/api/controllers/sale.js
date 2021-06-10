async function newSale(query)
{
  var generalesModel = require('../models/generales.js');
  var mongoClient = require("mongodb").MongoClient;
  var conexionModel = require('../models/conexion.js');
  var saleModel = require('../models/sale.js');
  var inventoryModel = require('../models/inventory.js');
  
  try 
  {
    var client = await conexionModel.crearConexion(mongoClient);
    var dbo = await conexionModel.conexionDB(client);
    let response = {}
    
    query.idVenta = await generalesModel.getNextSequenceValue(dbo,'Sales');
    let inventory = await inventoryModel.getInventorySale(dbo, query);
    let sale = await saleModel.newSale(dbo, query, inventory);

    if(!sale)
    {
      response = await generalesModel.manejarRespuesta(100); 
    }
    else
    {
      inventoryModel.updateStockInventory(dbo, query)
      response = await generalesModel.manejarRespuesta(0);
    }
    
    return await response;
  }
  catch (e)
  {
    console.error(e);
    return await generalesModel.manejarRespuesta(1); 
  }
  finally
  {
    await client.close();
  }
}

async function getSales(query)
{
  var generalesModel = require('../models/generales.js');
  var mongoClient = require("mongodb").MongoClient;
  var conexionModel = require('../models/conexion.js');
  var salesModel = require('../models/sale.js');
  
  try 
  {
    
    var client = await conexionModel.crearConexion(mongoClient);
    var dbo = await conexionModel.conexionDB(client);
    let response = {}
    
    let sales = await salesModel.getSales(dbo);

    if(!sales)
    {
      response = await generalesModel.manejarRespuesta(100); 
    }
    else
    {
      response = await generalesModel.manejarRespuesta(0);
      response.sales = sales;
    }
    
    return await response;
  }
  catch (e)
  {
    console.error(e);
    return await generalesModel.manejarRespuesta(1); 
  }
  finally
  {
    await client.close();
  }
}

module.exports = 
{
  newSale: newSale,
  getSales: getSales
}