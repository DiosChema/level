async function getInventory(dbo){
  
  let dato = await dbo.collection("Inventory").find().toArray();

  return await dato;
}

async function getInventorySale(dbo, query){
  
  let listBuy = []
  for(i = 0; i < query.items.length; i++)
  {
    listBuy.push(query.items[i].id)
  }

  query = { id: { $in: listBuy } }

  let dato = await dbo.collection("Inventory").find(query).toArray();

  return await dato;
}

async function updateStockInventory(dbo, query){
  
  var listaDeItems = getQueryItems(query);
  let dato =  await dbo.collection("Inventory").bulkWrite( listaDeItems );  

  return await dato;
}

function getQueryItems(query)
{
    var updateQuery = [];   
    var updateQueryAux = "";   

    for(let i=0; query.items.length > i; i++)
    {
      updateQueryAux = {updateOne: {filter: { id: query.items[i].id}, update: { $inc: {stock: -parseInt(query.items[i].amount)} }}};
      updateQuery.push(updateQueryAux);
    }

    return updateQuery;
}

module.exports = 
{
  getInventory: getInventory,
  getInventorySale: getInventorySale,
  updateStockInventory: updateStockInventory
}