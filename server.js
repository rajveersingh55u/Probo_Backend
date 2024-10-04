// const http=require('http');

// const appr=http.createServer((req,res)=>{
//   console.log(req.url,req.method);
  
// })

const express = require("express");
const cors = require('cors');

const app=express();

//starting price
let currentPrice = 100;

app.use(cors());


//updating Price
const updatePrice=() =>{
    currentPrice += (Math.random() - 0.5) * 5;
}
//every second price is updated
setInterval(updatePrice, 1000);


app.get('/api/stock-price', (req,res) =>{
    res.json({
        price:currentPrice.toFixed(2)
    });
});

const PORT = 3001;
app.listen(PORT,()=>{
    console.log("successfully working");
    console.log(`Server is running on http://localhost:${PORT}`);
    
});