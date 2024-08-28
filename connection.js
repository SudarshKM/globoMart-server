const mongoose = require('mongoose')

const connectionString = process.env.DATABASE;

mongoose.connect(connectionString).then(()=>{
    console.log("connnected to mongoDb");
    
}).catch((err)=>{
    console.log(err);
    
})