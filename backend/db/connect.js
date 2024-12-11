import mongoose from 'mongoose'

// config
import {configuration} from '../config/config.js'


const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

export const ConnectDB = async () => {
  try {
    // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
    await mongoose.connect(configuration.MONGODB, clientOptions);
    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  }catch(error){
    if(configuration.IS_DEV_ENV){
        console.log('Error in Register Function\n'+error)
    }
    else {
        console.log('Unable to connect with database', error)
    }
  }
}