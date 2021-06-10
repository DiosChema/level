

import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { useRouter } from 'next/router'
const axios = require('axios').default;

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

  const router = useRouter()

  const newSale = (e) =>  {
    router.push('/sales/newSale')
  }

  return (
    <Container maxWidth="sm">

      <Box m={0.5} pt={3} class="container" width="100%">
        <h1>Ventas</h1>
      </Box>

      <TableContainer component={Paper}>
        <Table id="table" aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="right">id</TableCell>
              <TableCell align="right">total</TableCell>
              <TableCell align="right">items</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.sales.map((item) => (
              <TableRow key={item.name}>
                <TableCell align="right" component="th" scope="row">{item.id}</TableCell>
                <TableCell align="right">{item.total}</TableCell>
                <TableCell align="right">{item.totalItems}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box pt={2}>
        <Button onClick={newSale} variant="contained" color="primary">
          Nueva Venta
        </Button>
      </Box>

    </Container>    

  )
  
  
}

export async function getStaticProps() {
  
  let sales = []

  await axios.get('http://localhost:3000/api/sale/sales', {})
  .then(response => {
    if(response.data.sales)
    {        
      sales = response.data.sales
    }
  });
  
  return {
    props: {
      sales: sales,
    },
  }
}