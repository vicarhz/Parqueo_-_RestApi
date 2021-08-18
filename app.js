const express = require('express')
const app = express()
var cors = require('cors')
const port = 3000

//import { returSpace } from './functions.js';
//import {returSpace} from './functions.js';
//const { returSpace } = require("functions.js");

app.use(cors())

//var arrayParqueos = ["free", "in-use", "free"]
var arrayParqueos = ["Parqueo 1", "Parqueo 2", "Parqueo 3", "Parqueo 4", "Parqueo 5", "Parqueo 6"]

app.get('/spaces', (req, res) => {  
    var jsonResponse = JSON.stringify(Object.assign({}, arrayParqueos))
    res.send(jsonResponse);
})

//Con Paginacion
app.get('/spaces_paginacion', (req, res) => {  
  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);
  res.send(resultadosPaginados(page, limit));
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

// ========================================================================================================
function returSpace(id){
  return "Hola id: " + id;
}

// Para la paginación
function resultadosPaginados(page, limit)
{
    var skipIndex = (page - 1) * limit;
    const results = {};    
    let arrayResult = [];
    try {
      results.results = arrayParqueos;
      let counter = 0;
      while (counter < limit) {
        arrayResult.push(arrayParqueos[skipIndex]);
        skipIndex++;
        counter++;        
      }
      return JSON.stringify(Object.assign({}, arrayResult));

    } catch (e) {
      res.status(405).json({ message: "Error Occured"});
    }
}
