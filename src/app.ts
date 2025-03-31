import express from 'express';
import type { Request, Response } from "express";
import dotenv from 'dotenv';
import cors from 'cors';
import chalk from 'chalk';
import router from './modules/index.js';

dotenv.config();

const app = express();

const originURL = process.env.NODE_ENV === 'development' ? 'http://localhost:3001' : 'https://kebikov.com';

app.use(express.json());
app.use(express.urlencoded({extended: false})); 
// Разрешить запросы с http://localhost:3001
app.use(cors({
    origin: originURL,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true // Если работаешь с cookie или сессиями
}));
app.use('/api', router);


app.get('/', (req, res) => {
    res.status(200).send(`
        Hello World ! 
        originURL: ${originURL}
        process.env.NODE_ENV: ${process.env.NODE_ENV}
    `);
});


const startServer = async () => {
    try {
        app.listen(process.env.PORT, () => {
            console.info(chalk.bgGreen.bold(`Server started on the port ${process.env.PORT}.`));
        });
    } catch(error) {
        console.error('Error in Function "startServer" >>> ', error);
        process.exit(1);
    }
}

startServer();