import express from 'express';
const mysql = require('mysql');
import bodyParser from 'body-parser'; //body-parser is a piece of express middleware that reads a form's input and stores it as a javascript object accessible through req.body

const app = express(); // Create express app
const PORT = 8080; // You can choose any available port

// Middleware
app.use(bodyParser.json()); //json parser voor data door te sturen 

// Start server met callback functie
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });


// Routes
// Create your models and routes here


    app.get('/hello' ,(req,res)=>{
        res.send('Hello World!');
    });
    



