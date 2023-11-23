import express from 'express';
import PlantRoute from './routes/plants.js';

const app = express();

app.use(express.json());

app.use(PlantRoute);

app.listen(2022, function(){
    console.log("Server ON, http://localhost:2022")
});