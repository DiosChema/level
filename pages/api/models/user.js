async function consultarUsuario(dbo, usuario){

  var query = 
  {
    email: usuario.user,
    password: usuario.password
  }
  
  let dato = await dbo.collection("Users").findOne(query);

  return await dato;
}

module.exports = 
{
  consultarUsuario: consultarUsuario
}