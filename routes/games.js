import express from 'express';
import GamesController from '../controllers/games.js';

const route = express.Router();

route.get('/games', [] , GamesController.getGames);
route.post('/games', GamesController.createGame);

route.get('/games/:idGame', GamesController.getGameByID);
route.put('/games/:idGame', GamesController.updateGameByID);
route.patch('/games/:idGame', GamesController.updateGameByID);// lo mismo que put... pero por si las agrego la ruta
route.delete('/games/:idGame', GamesController.deleteGameById);

route.get('/games/:idGame/judges', GamesController.getJudgesByGame);

export default route;


// OK