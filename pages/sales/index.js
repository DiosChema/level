
import React, { Component } from 'react';    

import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { useRouter } from 'next/router'
const axios = require('axios').default;
import { Typography } from "@material-ui/core";

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import { withRouter } from 'next/router'

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

class Sales extends Component 
{
  constructor(props) {
    super(props);

    this.state = {}
    this.state.sales = props.sales
    
    this.newSale = this.newSale.bind(this);
  };

  newSale()
  {
    this.props.router.push({
      pathname: '/sales/newSale',
      query: { user: this.props.router.query.user },
    })
  }

  /*componentDidMount()
  {
    if(!this.props.router.query.user)
    {
      this.props.router.replace('/users')
    }
  }*/

  render() {
    /*if(!this.props.router.query.user)
    {
      return (
        <h1></h1>
      )
    }*/
    return ( 
      <Container maxWidth="sm">

        <Box m={0.5} pt={3} component="div" display="flex">
          <Box>
            <Typography paragraph variant="h3">Ventas</Typography>
          </Box>
          
          <Box ml="auto">
            <Button onClick={this.newSale} variant="contained" color="primary">
              Nueva Venta
            </Button>
          </Box>
          
        </Box>

        <TableContainer component={Paper}>
          <Table id="table" aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="right">id</TableCell>
                <TableCell align="right">total</TableCell>
                <TableCell align="right">items</TableCell>
                <TableCell align="right">Estado</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.sales.map((item) => (
                <TableRow key={item.id}>
                  <TableCell align="right" component="th" scope="row">{item.id}</TableCell>
                  <TableCell align="right">{item.total}</TableCell>
                  <TableCell align="right">{item.totalItems}</TableCell>
                  <TableCell align="right">{item.pagado ? 'Pagado' : 'Por cobrar: ' + (item.total - item.pago).toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

      </Container> 
    );
  }

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
  
export default withRouter(Sales)