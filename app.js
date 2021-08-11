const express = require('express')
const app = express()
var cors = require('cors')
const port = 3000

//import { returSpace } from './functions.js';
//import {returSpace} from './functions.js';
//const { returSpace } = require("functions.js");

app.use(cors())

var arrayParqueos = ["free", "in-use", "free"]

app.get('/spaces', (req, res) => {  
    var jsonResponse = JSON.stringify(Object.assign({}, arrayParqueos))
    res.send(jsonResponse);
})

app.get('/spaces/:id', (req, res) => {    
  let id = parseInt(req.params.id);
  var jsonResponse = JSON.parse(`{
  "${id}":"${arrayParqueos[id]}"
  }`);
  console.log(returSpace(id)); //testing
  res.send(jsonResponse);
})

app.post('/spaces',(req, res) => {
  arrayParqueos.push("free");
  console.log("Espacio agregado al parqueo, total de espacios: " +  arrayParqueos.length + "\n");
  res.send("Done!");
})

app.put('/spaces/:id',(req, res) => {
  let id = parseInt(req.params.id);  
  var newState = req.query?.state;
  console.log("Se cambiará el estado del espacio # " + id + " de " + arrayParqueos[id]+" a " + newState+"\n");
  arrayParqueos[id] = newState;
  //console.log("Espacio agregado al parqueo, total de espacios: " +  arrayParqueos.length + "\n");
  res.send("Done!");
})

app.delete('/spaces/:id',(req, res) => {
  let id = parseInt(req.params.id); 
  if (arrayParqueos[id] == "in-use"){
    console.log("Espacio en uso, no se puede borrar");
    res.send("Espacio en uso, no se puede borrar");
  }
  else{
    arrayParqueos.splice(id, 1);
    console.log("Eliminando el espacio: " + id + "\n");
    res.send("Eliminado!");
  }  
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}\n`)
})

// Configurar cabeceras y cors
/* app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});
 */
// ========================================================================================================
function returSpace(id){
  return "Hola id: " + id;
}