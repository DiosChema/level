async function consultarUsuario(dbo, usuario){

  var query = 
  {
    email: usuario.user,
    password: usuario.password
  }
  
  let dato = await dbo.collection("Users").findOne(query);

  return await dato.ops[0];
}

module.exports = 
{
  consultarUsuario: consultarUsuario
}