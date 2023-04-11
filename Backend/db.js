const mongoose = require('mongoose');
const mongoURI = "mongodb://localhost:27017/inotebok"
const connectToMongo = ()=>{
mongoose.connect(mongoURI, ()=>{
console.log("Connected to Mongo Successfully");
})
}
module.exports = connectToMongo;


// mongodb://localhost:27017/inotebok?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false