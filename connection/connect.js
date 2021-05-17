
import mongoose from  'mongoose';
const url = `mongodb://localhost:27017/${process.env.DB_NAME}`;
mongoose.connect(url, { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false },(err, res) =>{
    if(err) console.log("mongoose error",err);
    else console.log(`connected to the database ${process.env.DB_NAME}`)
})

export default mongoose;