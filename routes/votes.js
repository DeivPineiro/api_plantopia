import  express from 'express';
import VotesController from '../controllers/votes.js';
import { validateCreateVote } from '../middlewares/votes.js';

const route = express.Router();

route.get('/games/:idGame/votes', VotesController.getVotes);
route.post('/games/:idGame/votes',[validateCreateVote],VotesController.createVote);

route.route('/games/votes/:idJudge')
.get(VotesController.getVoteByJudge)

export default route;