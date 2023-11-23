import PlantRoute from './routes/plants.js'
import PlagueRoute from './routes/plagues.js'
import express from 'express';
import bodyParser from 'body-parser';
import admin from 'firebase-admin';
import cors from 'cors'; 
import serviceAccount from './plantopia-157e3-firebase-adminsdk-907g7-e8b15ce5bc.json' assert { type: 'json' };


admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://plantopia-157e3-default-rtdb.firebaseio.com/'
});

const app = express();
const port = 2023;

app.use(bodyParser.json());
app.use(cors());
app.use(PlantRoute);
app.use(PlagueRoute);

app.listen(port,()=> {
    console.log(`Server run on http://localhost:${port}`)
});


