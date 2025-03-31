import express from 'express';
import type { Request, Response } from "express";
import dotenv from 'dotenv';
import cors from 'cors';
import chalk from 'chalk';
import router from './modules/index.js';

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());
app.use('/api', router);

app.get('/', (req, res) => {
    res.status(200).send('Hello World !');
})

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