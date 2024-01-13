const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
const PORT = 8080; // You can choose any available port




// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });


// Middleware
app.use(bodyParser.json());

// Routes
// Create your models and routes here


    app.get('/hello' ,(req,res)=>{
        res.send('Hello World!');
    });
    



