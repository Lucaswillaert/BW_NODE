import express from 'express';
import playerRoutes from './routes/players.js'; // import usersRoutes
import teamRoutes from './routes/teams.js';
import bodyParser from 'body-parser'; //body-parser is a piece of express middleware that reads a form's input and stores it as a javascript object accessible through req.body
import db from './database/database.js'; 

const app = express(); // Create express app
const PORT = 8080; // You can choose any available port

// Middleware
app.use(bodyParser.json());
app.use(express.json()); //json parser voor data door te sturen 
app.use((req, res , next)=>{
    req.mysql = db;
    next();
})

// Set Content-Type voor alle responses
app.use((req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    next();
});

// Start server met callback functie
app.listen(PORT, () => {
    console.log(`Server is Running on http://localhost:${PORT}`);
  });


// Routes
// Create your models and routes here

app.use('/players', playerRoutes); //zetten startingpad voor alle routes in de players.js
app.use('/teams',teamRoutes);


app.get('/', (req, res) => {
    res.send('Hello!');
  });