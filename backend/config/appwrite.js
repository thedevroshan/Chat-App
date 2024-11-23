import { Client, Storage } from 'node-appwrite'
import { configuration } from './config.js'

const client = new Client()

client
    .setEndpoint(configuration.APPWRITE_ENDPOINT)
    .setProject(configuration.APPWRITE_PROJECT_ID)
    .setKey(configuration.APPWRITE_API_KEY)


export const storage = new Storage(client)