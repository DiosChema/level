
import { Typography } from "@material-ui/core";
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
const axios = require('axios').default;
import Image from 'next/image'
import Input from '@material-ui/core/Input';
import {useState} from 'react'

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function Sales(props)
{

  let values = {}
  
  props.inventory.forEach
  (element =>
    {
      values[element.id] = "0"
    }
  )

  //console.info(values)

  const [state, setState] = useState(values);

  function onChange(event) {
    const { name, value } = event.target;
    setState(prevState => ({ ...prevState, [name]: value }));
  }

  //const [emailText, setEmailText] = useState('')

  const postSale = (e) =>  {

    let query = {}
    query.items = []

    props.inventory.forEach
    (element =>
      {
        console.info(state[element.id])
        if(state[element.id] > 0)
        {
          let item = 
          {
            id:element.id,
            amount:state[element.id]
          }
          query.items.push(item)
        }
      }
    )

    console.info(query)

    axios.post('http://localhost:3000/api/sale/newSale', {
      items: query.items
    })
    .then(response => {
      /*if(response.data.usuario)
      {
        router.push('/sales')
      }*/
    });
  }

  return (
    <Container maxWidth="sm">

      <Box m={0.5} pt={3} class="container" width="100%">
        <h1>Nueva Venta</h1>

        <TableContainer component={Paper}>
          <Table id="table" aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Image</TableCell>
                <TableCell align="right">id</TableCell>
                <TableCell align="right">Nombre</TableCell>
                <TableCell align="right">Existencia</TableCell>
                <TableCell align="right">Precio</TableCell>
                <TableCell align="right">Articulos a comprar</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {props.inventory.map((item) => (
                <TableRow key={item.name}>
                   <TableCell component="th" scope="row">
                    <div>
                      <Image
                        src= {`/item${item.id}.jpg`}
                        width={80}
                        height={80}/>
                    </div>
                  </TableCell>
                  <TableCell align="right">{item.id}</TableCell>
                  <TableCell align="right">{item.name}</TableCell>
                  <TableCell align="right">{item.stock}</TableCell>
                  <TableCell align="right">${item.prices}</TableCell>
                  <TableCell align="right">
                    <div>
                    <Input 
                      name={item.id}
                      type="number"
                      pattern="[0-9]*"
                      min="0"
                      maxlength="5"
                      placeholder="Cantidad"
                      required=""
                      value={state[item.id]}
                      onChange={onChange}/>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        
      </Box>

      <Box pt={2}>
        <Button onClick={postSale} variant="contained" color="primary">
          Terminar venta
        </Button>
      </Box>

    </Container>    

  )
  
  
}

export async function getStaticProps() {
  
  let inventory = []

  await axios.get('http://localhost:3000/api/inventory/inventory', {})
  .then(response => {
    if(response.data.inventory)
    {        
      inventory = response.data.inventory
    }
  });
  
  return {
    props: {
      inventory: inventory,
    },
  }
}