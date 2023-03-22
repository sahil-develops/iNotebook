const mongoose = require('mongoose');

const myVar = process.env.REACT_APP_MONGO_PASS
const mongoURI =`mongodb+srv://zambani_sahil:7yPMuwLo1RAzBZpa@cluster0.hqyet1n.mongodb.net/test`

const connectToMongo = ()=>{
    mongoose.connect(
        mongoURI,console.log("Connected to mongo ")
      ).catch((e) => {
        console.log("error connecting to mongoose!" + " " + e);
      });
      
    ; 
}

module.exports = connectToMongo;