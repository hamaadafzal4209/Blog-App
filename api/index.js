const express = require('express')
const app = express();

const cors = require('cors') 

app.use(cors());

app.post('/register', (req, res) => {
    res.status(201).json("OK!");
})

app.listen(4000, () => {
    console.log('Server is running on port : 4000');
})