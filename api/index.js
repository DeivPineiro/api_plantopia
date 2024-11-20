import dotenv from 'dotenv';
import PlantRoute from './routes/plants.js'
import PlagueRoute from './routes/plagues.js'
import AccountRoute from './routes/account.js'
import express from 'express';
import bodyParser from 'body-parser';
import admin from 'firebase-admin';
import cors from 'cors';
import chalk from 'chalk';

dotenv.config();
admin.initializeApp({
    credential: admin.credential.cert({
        type: process.env.FIREBASE_TYPE,
        project_id: process.env.FIREBASE_PROJECT_ID,
        private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
        private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDMeBq6HhDNp/hz\ncYc9lJcO3/dDV5cdrLQdNaEOefaqc0S+5o9tWoKjmBT/gi2JtVkBw4tmonUHoSAl\nxNg9nJKGnsInTzBmqhg533/SuPWk1MSI69bd2ZgMGtvZvS8jY0EZwKUoFb/EsJGV\noNoDPESQdaLn1QC82FjCgtopGg8TRP9s/QJFGQgmcTabZGueEKASk6OlEtVfRvdZ\nxbUIlGuDUfd/cCKR8tNi2SbIRm6wCQoh2wZQIcG8Cny4Ds7bsr08NBNfUgWKMr4X\nxe4+RQnO8wz0/IkQYAv5vjx1e/d03NtvSyj8T6waNtw3O9nz3ItcuDL8DFzQxsuk\nxOmgXEmJAgMBAAECggEACW+N+TKPvzPeEfLGZVO8/Fte0WligISyq6noyK6dcNyA\nqsggTJE5l+PZ7TgkUpdvN/b+kQIUgUGA5qlMutwlwWdkaZS8lLJLC6mqIA73zA9j\nEfgDOony+7UGGghiW2FWVOJIZN8LEmA9GbD6ep1+gwWgus7gObbIstI/z9eDZFXM\nuiEG4vyDKOkzwJwiHWvfZp17npdNHQJ5r9CosSvOXWHYl1O1SnBjTqKSZvYHrTwn\nyYHvGmZ92Wpv+/j9IZd9mVjnbgSYW8jdy8lxam+d+S3evnfyhvrPI6HBKwhCPWiT\n4OGAmBpo2c7ajvStGh8A7ASJ7CnWS4vKjnZ+vuaUkQKBgQDRVKRiAbIIQfrb/31r\neN/98/vMgQZjq9RnqoijrBJarvj7h0MPROvWTpigB6sw6EgMT321HhvnSoVSWBeS\n/c3NOXsbQ5qgMqX03nUe78+Pv6w/hxV0dFhIEXUJE2x0tc7m2IRwBt0aQkoeHm6l\nXMiuUEhGRuYMmN7EKwkXfhbDUQKBgQD6Df94w7D3qsm8t/NsqALChMUrXhRyb7vu\nr2kKZHm5oOsK36KgqDp2yXTt7rvBNmOoQ1OViiGC4qrEZ9x6IJsZkG34jHZTDuJC\nuvDTYTSCJmXn14DD+DZv7vCKctDnIeTIZZt1y03moRwqfbi6FTN/AWpaihByUby0\nAQkIHWXkuQKBgGgw5RETHvYVQTO3W0nfBD527mG/5to9cJ+YtiIhR5FzfeJUVQCI\noYot3LHqnz7cnt/hwQQhVGovIWT3C+TSB1mavre3UoNiMlBLWahoXLuD/8wvBHLO\nZhKY/dPiox0EUVN9eY35HJwxWorbQt9z6z84HoE8UMz8WgTyFrhmvhXBAoGBANiq\nXFx1o9dVwuuksGXLxmhpxrZnFGx76GlO0ENTAC4aAs8vK6jtW4sl0A2COGmYCQ35\nGGmQgKz6XmFEZUPlEL876C3e93/Me7y6YoWlymujfdU/Y7FqVzDx5rbv+ZbsRWJm\nuCd++4cEvnUK7o8+Y5p+zXqZ+tozfMCzzPGdF3bxAoGAEm2P0nZz/qzkuWGpZdaU\nDCWbv0F840VM65Y6S0aiYLQDKA5DC4GZmrXRqzTUsR5Y3thGf/5iPMzlnmXEI9P4\ninrj1a5ywbxd1x19e9RcoQ3Cjz8NOLNfWUvC8cKObNrMbXZWbD0dwCnNZn6owKa+\nh8NwVB4yAQB///2POlNK+6A=\n-----END PRIVATE KEY-----\n",
        client_email: process.env.FIREBASE_CLIENT_EMAIL,
        client_id: process.env.FIREBASE_CLIENT_ID,
        auth_uri: process.env.FIREBASE_AUTH_URI,
        token_uri: process.env.FIREBASE_TOKEN_URI,
        auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
        client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL,
        universe_domain: process.env.FIREBASE_UNIVERSE_DOMAIN
    }),
    databaseURL: "https://plantopia-157e3-default-rtdb.firebaseio.com/"
});

console.log("Clave: " + process.env.FIREBASE_PRIVATE_KEY);

const app = express();

const port = 2023;

app.use(bodyParser.json());
app.use(cors());
app.use(PlantRoute);
app.use(PlagueRoute);
app.use('/api', AccountRoute);

app.listen(port, () => {    
    console.log(chalk.green(`API Server `) + chalk.bgGreenBright(`//`) + chalk.bgBlue(` ##==>`) + chalk.red(` http://localhost:${port} `) + chalk.bgBlue(`<==## `) + chalk.bgGreenBright(`//`));
    console.log(chalk.yellow(' /\\_/\\'));
    console.log(chalk.yellow('( o.o )'));
    console.log(chalk.yellow(' > ^ <'));
});



