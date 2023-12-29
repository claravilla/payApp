const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const url = require('url');  

const app = express();
app.use(
    cors({
      origin: [process.env.ORIGIN, "http://localhost:3000"],
    })
  );
  
  app.use(bodyParser.json());
  app.use(express.urlencoded({ extended: true }));

app.post('/', (req,res)=> {
    const params = req.body;
   const uri = encodeURI(JSON.stringify(params));
    res.redirect(`http://localhost:3000/redirect/${uri}`);
})


app.listen(process.env.PORT || 8080, function () {
    console.log("server is listening on port 8080");
  });