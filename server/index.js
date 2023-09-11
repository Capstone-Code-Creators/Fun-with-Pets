const express = require("express");
const app = express();
const PORT = 3009;

app.get('/', (req, res) => {
  res.send('<h1>Hello World, Choo Choo!</h1>')
})

app.listen(PORT, (err) => {
  if(!err){
    console.log(`listening on port ${PORT}`)
  }else{
    console.log('no work')
  }
})