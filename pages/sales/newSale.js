
import React, { Component } from 'react';    
//import './App.css';    
import { render } from 'react-dom';   

import { Typography } from "@material-ui/core";
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
const axios = require('axios').default;
import Image from 'next/image'
import Input from '@material-ui/core/Input';
import {useState} from 'react'
import NumberFormat from 'react-number-format';

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

class Sales extends Component {

  constructor(props) {
    super(props);

    let values = 
    {
      pago: '0',
      totalPago: 'Total: $ 0.0'
    }

    props.inventory.forEach
    (element =>
      {
        values[element.id] = "0"
      }
    )

    this.state = values
    this.state.inventory = props.inventory

    this.updateState = this.updateState.bind(this);
    this.postSale = this.postSale.bind(this);
  };

  /*componentDidMount()
  {
    if(!this.props.router.query.user)
    {
      this.props.router.replace('/users')
    }
  }*/

  async updateState(e) 
  {
    await this.setState({[e.target.name]: e.target.value});
    if(e.target.name != 'totalPago')
    {
      await this.updateTotal()
    }
  }

  async updateTotal(e)
  {
    let total = 0.0

    await this.state.inventory.forEach
    (element =>
      {
        if(this.state[element.id] > 0)
        {
          total += (this.state[element.id] * element.prices)
        }
      }
    )

    await this.setState({totalPago: "Total: $ " + parseFloat(total).toFixed(2)});
  }

  async postSale(){

    let query = {}
    query.items = []

    await this.state.inventory.forEach
    (element =>
      {
        if(this.state[element.id] > 0)
        {
          let item = 
          {
            id:element.id,
            amount:this.state[element.id]
          }
          query.items.push(item)
        }
      }
    )
    

    query.pago = this.state.pago

    axios.post('http://localhost:3000/api/sale/newSale', {
      items: query.items,
      pago: query.pago
    }).then(response => {
      this.props.router.reload()
    });
  }

  render() {  
    /*if(!this.props.router.query.user)
    {
      return (
        <h1></h1>
      )
    }*/
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
                {this.state.inventory.map((item) => (
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
                          value={this.state[item.id]}
                          onChange={this.updateState}>
                        </Input>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <h4>Enganche</h4>
          <NumberFormat
            name="pago"
            thousandSeparator={true}
            prefix={'$'}
            value={this.state.pago}
            onChange={this.updateState}
            placeholder="$"
            isAllowed={({ floatValue }) => floatValue <= 999999}
          />

        </Box>

        <Typography name="totalPago" align="right" pt={2} paragraph variant="h5">{this.state.totalPago}</Typography>

        <Box pt={2}>
          <Button onClick={this.postSale} variant="contained" color="primary">
            Terminar venta
          </Button>
        </Box>

      </Container>
    );
  }
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

export default withRouter(Sales)