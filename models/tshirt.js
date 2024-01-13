const mongoos = require('mongoose');

const tshirtSchema = new mongoose.Schema({
    name: {type : String, required: true},
    size:{ type :String, enum:['xs','s','m','l','xl','xxl'], required: true},
    color: {type: String, enum:['red','blue','green','black','white','yellow'] ,required: true},
    logo: {type: String, required: true}, //emojis kunnen we hier opslaan
});