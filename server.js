const path = require('path');
const express = require('express');
const next = require('next')


const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })

const handle = app.getRequestHandler()
//const app = new express();
console.log('I am running!');

//app.set('port', process.env.PORT || 4000);

//app.use('/scripts', express.static('./scripts/'));
//app.use(express.static("public"));
//app.use(favicon(__dirname + '/favicon.ico'));

/*var bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));*/

//var users = require('./api/views/user.js');

//app.use('/api/user', users);

/*app.listen(app.get('port'), () => {
  console.log('Puerto:' + app.get('port'))
});*/

const server = express()
var users = require('./pages/api/views/user.js');
var inventory = require('./pages/api/views/inventory.js');
var sale = require('./pages/api/views/sale.js');

server.use('/api/user', users);
server.use('/api/inventory', inventory);
server.use('/api/sale', sale);

app.prepare()
.then(() => {
  
  server.get('*', (req, res) => {
    return handle(req, res)
  })
    
  server.listen(3000, (err) => {
    if (err) throw err
    console.log('> Ready on http://localhost:3000')
  })

})
.catch((ex) => {
  console.error(ex.stack)
  process.exit(1)
})