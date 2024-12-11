import mongoose from "mongoose";
import { configuration } from "../config/config.js";

export const ConnectDB = async () => {
    try {
        await mongoose.connect(configuration.MONGODB);
        console.log('Connected to database')
    } catch (error) {
        if(configuration.IS_DEV_ENV){
            console.log(error)
            return;
        }
        console.log('Some error occurred during connecting with database')
    }
}