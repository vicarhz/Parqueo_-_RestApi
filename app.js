const express = require('express')
const app = express()
var cors = require('cors')
const port = 3000

app.use(cors())

//var arrayParqueos = ["free", "in-use", "free"]

/**
 * Nota: este array se usa para los métodos de filtrado y paginacion creados para la Investigación#1,
 * para los demás metodos se utiliza el array anterior, está pendiente corregir esto para tener un único array
 */
var arrayParqueos = [{name:"Parqueo 1", status:"free"},
                     {name:"Parqueo 2", status:"in-use"},
                     {name:"Parqueo 3", status:"in-use"},
                     {name:"Parqueo 4", status:"free"},
                     {name:"Parqueo 5", status:"in-use"}, 
                     {name:"Parqueo 6", status:"free"}];

app.get('/spaces', (req, res) => {  
    var jsonResponse = JSON.stringify(Object.assign({}, arrayParqueos))
    res.send(jsonResponse);
})

/**
 * Request con paginacion
 * Url: http://localhost:3000/spaces_paginacion?page=1&limit=3
 *      http://localhost:3000/spaces_paginacion?page=2&limit=3
 *      http://localhost:3000/spaces_paginacion?page=3&limit=3
 *      http://localhost:3000/spaces_paginacion?page=1&limit=2
 *      http://localhost:3000/spaces_paginacion?page=2&limit=2
 *      http://localhost:3000/spaces_paginacion?page=3&limit=2
 */
app.get('/spaces_paginacion', (req, res) => {  
  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);
  res.send(resultadosPaginados(page, limit));
})


/**
 * Request con filtro
 * Url: http://localhost:3000/spaces_filtro?filtro=free
 *      http://localhost:3000/spaces_filtro?filtro=in-use
 */
app.get('/spaces_filtro', (req, res) => {  
  const status = req.query.filtro.toString();
  //console.log("status: " + status); // Just for testing
  //console.log("salida-> " + resultadosFiltrados(status));
  res.send(resultadosFiltrados(status));
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
    let counter = 0;
    while (counter < limit) {
      arrayResult.push(arrayParqueos[skipIndex]);
      skipIndex++;
      counter++;        
    }
      return JSON.stringify(arrayResult);   
}

function resultadosFiltrados(status)
{
  let temp = JSON.stringify(arrayParqueos.filter(item=> {
    return item.status == status;
  }));

  return temp;

  // Funciona, pero no usa filter, si no que busca de forma manual
  /* var newArray = [];  
  for (let index = 0; index < arrayParqueos.length; index++) 
  {    
    if(arrayParqueos[index].status == status)
    {
      newArray.push(arrayParqueos[index]);    
    }
  }
  //console.log(newArray);
  return newArray; */

  // Filtra basado en el parámetro status
}