import mongoose from  'mongoose';
const url = `mongodb://localhost:27017/${process.env.DB_NAME}`
mongoose.connect(url, { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false ,autoIndex: false},(err, res) =>{
    if(err) console.log("mongoose error",err);
    else console.log(`connected to the database ${process.env.DB_NAME}`)
})
export default mongoose;

/*When your application starts up, Mongoose automatically calls createIndex for each defined index in your schema.
Mongoose will call createIndex for each index sequentially, and emit an 'index' event on the model when all the
createIndex calls succeeded or when there was an error. While nice for development, it is recommended this behavior
be disabled in production since index creation can cause a significant performance impact. Disable the behavior by
setting the autoIndex option of your schema to false, or globally on the connection by setting the option autoIndex
to false. */