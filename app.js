const { query } = require('express');
const express = require('express')
const app = express()
const port = 3000

app.get('/spaces', (req, res) => {
    res.send('Hello From Rest-Api');
})

app.get('/spaces/:id', (req, res) => {
  let id = req.params.id;
  res.send(`Hello from Rest-Api: ${id}`);
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})