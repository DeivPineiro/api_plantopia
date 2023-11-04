import express from 'express';
import GameRoute from './routes/games.js';
import VoteRoute from './routes/votes.js';

const app = express();

app.use(express.json());

app.use(GameRoute);
app.use(VoteRoute);


app.listen(2022, function(){
    console.log("Server ON, http://localhost:2022")
});