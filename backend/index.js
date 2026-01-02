
const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.get('/health',(req,res)=>res.json({ok:true}));
app.listen(5000,()=>console.log('Backend running on 5000'));
