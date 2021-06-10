async function crearConexion(mongoClient) 
{
  const uri = require("../auth.json").token;
  const client = new mongoClient(uri);
  
  try {
      // Connect to the MongoDB cluster
      await client.connect();
      
      return await client;
  } catch (e) {
      console.error(e);
      await client.close();
  }
}

async function conexionDB(client)
{
  return await client.db("level");
}

module.exports = {
    crearConexion: crearConexion,
    conexionDB: conexionDB
}