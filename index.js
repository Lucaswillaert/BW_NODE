import express from 'express';
import playerRoutes from './routes/players.js'; // import usersRoutes
import bodyParser from 'body-parser'; //body-parser is a piece of express middleware that reads a form's input and stores it as a javascript object accessible through req.body

const app = express(); // Create express app
const PORT = 8080; // You can choose any available port

// Middleware
app.use(bodyParser.json()); //json parser voor data door te sturen 

app.use('/players', playerRoutes); //zetten startingpad voor alle routes in de players.js

// Start server met callback functie
app.listen(PORT, () => {
    console.log(`Server is Running on http://localhost:${PORT}`);
  });


// Routes
// Create your models and routes here
app.get('/' ,(req,res)=>{res.send('Hello World')});


    



