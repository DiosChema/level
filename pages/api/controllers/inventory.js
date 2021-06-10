async function getInventory(query)
{
  var generalesModel = require('../models/generales.js');
  var mongoClient = require("mongodb").MongoClient;
  var conexionModel = require('../models/conexion.js');
  var inventoryModel = require('../models/inventory.js');
  
  try 
  {
    
    var client = await conexionModel.crearConexion(mongoClient);
    var dbo = await conexionModel.conexionDB(client);
    let response = {}
    
    let inventory = await inventoryModel.getInventory(dbo, query);

    if(!inventory)
    {
      response = await generalesModel.manejarRespuesta(100); 
    }
    else
    {
      response = await generalesModel.manejarRespuesta(0);
      response.inventory = inventory;
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
  getInventory: getInventory
}