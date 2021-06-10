async function newSale(dbo, query, inventory){
  
  let items = []
  let total = 0.0
  let totalItems = 0

  for(let i = 0; i < query.items.length; i++)
  {
    for(let y = 0; y < inventory.length; y++)
    {
      if(query.items[i].id == inventory[y].id)
      {
        let item = 
        {
          id: query.items[i].id,
          amount: query.items[i].amount,
          prices: inventory[y].prices
        }
        totalItems += parseInt(query.items[i].amount)
        total += query.items[i].amount * inventory[y].prices
        items.push(item)
      }
    }
  }

  let sale = 
  {
    id: query.idVenta,
    total: parseFloat(parseFloat(total).toFixed(2)),
    items: items,
    totalItems: totalItems
  }

  let dato = await dbo.collection("Sales").insertOne(sale);

  return await dato;
}

async function getSales(dbo){
  
  let dato = await dbo.collection("Sales").find().toArray();

  return await dato;
}

module.exports = 
{
  newSale: newSale,
  getSales: getSales
}