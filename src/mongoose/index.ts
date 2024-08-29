import mongoose from 'mongoose';
import { MongoDB_NAME, MongoDB_URI } from '../env.config';

const mongoURI : string = `${MongoDB_URI}/${MongoDB_NAME}`

async function mongodbConnect() {
    await mongoose.connect(`${mongoURI}`);
    console.log(`✅ Connected to MongoDB: ${mongoURI}`)
}

async function mongodbDisconnect() {
    return await mongoose.disconnect();
}

export { mongodbConnect, mongodbDisconnect };