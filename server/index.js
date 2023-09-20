require('dotenv').config();
console.log('DATABASE_URL:', process.env.DATABASE_URL);
const express = require('express');
const dotenv = require('dotenv')
dotenv.config({ path: '../.env' });
const app = express();
const cors = require('cors')
const PORT = process.env.PORT
const jwt = require("jsonwebtoken");
const path = require("path");

app.use(cors({ origin: 'http://localhost:5173' }))
app.use(require("body-parser").json());


app.use(require("morgan")("dev"));
app.use(cors());

app.use((req, res, next) => {

    const auth = req.headers.authorization;
    const token = auth?.startsWith("Bearer ") ? auth.slice(7) : null;
    try{
      const decodedToken = jwt.verify(token, process.env.JWT);
      req.userId = decodedToken.id;
    }
    catch{
      req.userId = null;
    }
  
    next();
  });


app.use(express.static(path.join(__dirname, "..", "client/dist")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "client/dist/index.html"));
});

app.get("/register", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "client/dist/index.html"));
  });



app.use("/api", require("./api"));
app.use("/auth", require("./auth"));


app.listen(PORT, (err) => {
    if (!err){
        console.log(`listening on PORT ${PORT}` )
    }
    else{
        console.log(`something went wrong`)
    }
})