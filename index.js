const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = 8080; // You can choose any available port

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/NODE');
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Middleware
app.use(bodyParser.json());

// Routes
// Create your models and routes here

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
    app.get('/tshirt' ,(req,res)=>{
        res.status(200).send({
            tshirt: '👕',
            size: 'large'
        })
    });
    
    app.post('/tshirt/:id', (req,res)=>{
        const {id}= req.params;
        const{logo}=req.body;
        //req zorgt ervoor dat we aan de parameters kunnen
        //res zorgt ervoor dat we een response kunnen geven
        if(!logo){
            res.status(418).send({message: 'We need a logo!'})
        }
        res.send({
            tshirt: `👕 with your ${logo} and ID of ${id}`,
        })

    });

//connecten met MongoDB


