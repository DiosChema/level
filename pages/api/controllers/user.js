async function consultarUsuario(query)
{
  var generalesModel = require('../models/generales.js');

  if(query == null || query.user == null || query.password == null)
  {
    return generalesModel.manejarRespuesta(3)
  }
  
  var mongoClient = require("mongodb").MongoClient;
  var conexionModel = require('../models/conexion.js');
  var usuarioModel = require('../models/user.js');
  
  try 
  {
    
    var client = await conexionModel.crearConexion(mongoClient);
    var dbo = await conexionModel.conexionDB(client);
    let respuesta = {}
    
    let usuario = await usuarioModel.consultarUsuario(dbo, query);

    if(!usuario)
    {
      respuesta = await generalesModel.manejarRespuesta(100); 
    }
    else
    {
      respuesta = await generalesModel.manejarRespuesta(0);
      respuesta.usuario = usuario;
    }
    
    return await respuesta;
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
  consultarUsuario: consultarUsuario
}