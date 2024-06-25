import mongoose from 'mongoose';

const uri: string = 'mongodb://root:nodegmp@localhost:27017/shopdb?authSource=admin';

mongoose.connect(uri).then(() => {
  console.log("Succesfully connected to MongoDB");
}).catch((error: Error) => {
  console.log(`Error connecting to MongoDB: ${error.message}`);
});