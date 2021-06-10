async function getNextSequenceValue(dbo,sequenceName){

  var query = {_id: sequenceName}
  var incrementarSecuencia = 
    {
      $inc: 
      {
        sequence_value:1
      }
    }

  var dato = await dbo.collection("Secuencias").findOneAndUpdate(query,incrementarSecuencia)

  return await dato.value.sequence_value;
  
}

function manejarRespuesta(error)
{
  var respuesta = {status : error, mensaje: ''}

  switch(error)
  {
    case 0:
      respuesta.mensaje = ""
      break
    case 1:
      respuesta.mensaje = "Error interno del sistema, si el error continua comuniquese con el equipo de desarrollado y reporte esta falla."
      break
    case 2:
      respuesta.mensaje = "Error al obtener la base de datos, si el error continua comuniquese con el equipo de desarrollado y reporte esta falla."
      break
    case 3:
      respuesta.mensaje = "Erro de datos, vuelva a intentar."
      break
    case 99:
      respuesta.mensaje = "Usuario ya registrado, intente con un correo diferente."
      break
    case 100:
      respuesta.mensaje = "Usuario / contraseña invalida."
      break
    default:
      respuesta.mensaje = "Error en el sistema, si el error continua comuniquese con el equipo de desarrollado y reporte esta falla."
      break
  }

  return respuesta

}

module.exports = 
{
  getNextSequenceValue: getNextSequenceValue,
  manejarRespuesta: manejarRespuesta
}