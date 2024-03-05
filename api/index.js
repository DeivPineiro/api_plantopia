import PlantRoute from './routes/plants.js'
import PlagueRoute from './routes/plagues.js'
import AccountRoute from './routes/account.js'
import express from 'express';
import bodyParser from 'body-parser';
import admin from 'firebase-admin';
import cors from 'cors';
import serviceAccount from './plantopia-157e3-firebase-adminsdk-907g7-e8b15ce5bc.json' assert { type: 'json' };
import chalk from 'chalk';


admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://plantopia-157e3-default-rtdb.firebaseio.com/'
});

const app = express();

const port = 3000;

app.use(bodyParser.json());
app.use(cors());
app.use(PlantRoute);
app.use(PlagueRoute);
app.use('/api', AccountRoute);

app.listen(port, () => {
    console.clear();
    console.log(chalk.green(`API Server `) + chalk.bgGreenBright(`//`) + chalk.bgBlue(` ##==>`) + chalk.red(` http://localhost:${port} `) + chalk.bgBlue(`<==## `) + chalk.bgGreenBright(`//`));
    console.log(chalk.yellow(' /\\_/\\'));
    console.log(chalk.yellow('( o.o )'));
    console.log(chalk.yellow(' > ^ <'));
});



