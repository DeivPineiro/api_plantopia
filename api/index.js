import dotenv from 'dotenv';
import PlantRoute from './routes/plants.js'
import PlagueRoute from './routes/plagues.js'
import AccountRoute from './routes/account.js'
import express from 'express';
import bodyParser from 'body-parser';
import admin from 'firebase-admin';
import cors from 'cors';
// import serviceAccount from './plantopia-157e3-firebase-adminsdk-907g7-486a0ef523.json' assert { type: 'json' };
import chalk from 'chalk';

dotenv.config();
admin.initializeApp({
    credential: admin.credential.cert({
        type: process.env.FIREBASE_TYPE,
        project_id: process.env.FIREBASE_PROJECT_ID,
        private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
        private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
        client_email: process.env.FIREBASE_CLIENT_EMAIL,
        client_id: process.env.FIREBASE_CLIENT_ID,
        auth_uri: process.env.FIREBASE_AUTH_URI,
        token_uri: process.env.FIREBASE_TOKEN_URI,
        auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
        client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL,
        universe_domain: process.env.FIREBASE_UNIVERSE_DOMAIN
    }),
    databaseURL: process.env.FIREBASE_DATABASE_URL
});


const app = express();

const port = 2023;

app.use(bodyParser.json());
app.use(cors());
app.use(PlantRoute);
app.use(PlagueRoute);
app.use('/api', AccountRoute);

app.listen(port, () => {
    // console.clear();
    console.log(chalk.green(`API Server `) + chalk.bgGreenBright(`//`) + chalk.bgBlue(` ##==>`) + chalk.red(` http://localhost:${port} `) + chalk.bgBlue(`<==## `) + chalk.bgGreenBright(`//`));
    console.log(chalk.yellow(' /\\_/\\'));
    console.log(chalk.yellow('( o.o )'));
    console.log(chalk.yellow(' > ^ <'));
});



