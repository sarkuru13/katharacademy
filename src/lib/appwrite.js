// src/lib/appwrite.js
import { Client, Account, Databases, Storage } from 'appwrite';

// Get your Appwrite config from .env variables
const endpoint = import.meta.env.VITE_APPWRITE_ENDPOINT;
const projectId = import.meta.env.VITE_APPWRITE_PROJECT_ID;

// Initialize the Appwrite Client
const client = new Client();

client
    .setEndpoint(endpoint)
    .setProject(projectId);

// Initialize and export the Appwrite services you will use
export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);