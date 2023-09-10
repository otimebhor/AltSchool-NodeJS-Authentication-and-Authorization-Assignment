const express = require('express');
const bodyParser = require('body-parser');
const itemRouter = require('./items/itemRouter');
const userRouter = require('./users/userRouter');

const PORT = 4000;
const app = express();


// app.use(express.static('public'));

app.use(bodyParser.json());



//router
app.use('/items',itemRouter);
app.use('/users',userRouter);
//server
app.listen(PORT, ()=>{
    console.log(`Server listening on ${PORT}...`)
});
