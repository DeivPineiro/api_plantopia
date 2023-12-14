import express from 'express';
import plaguesController from '../controllers/plagues.js';
import validateCreatePlague from '../middlewares/plagues.js'
import { verifySession } from '../middlewares/account.js';

const route = express.Router();

route.get('/plagues', plaguesController.getPlagues); 
route.get('/admin/plagues', plaguesController.getAdminPlagues); 
route.post('/plagues',[validateCreatePlague,verifySession], plaguesController.createPlague); 

route.get('/plagues/:idPlague', plaguesController.getPlagueByID); 
route.put('/plagues/:idPlague',[verifySession], plaguesController.updatePlagueByID);
route.patch('/plagues/:idPlague',[verifySession], plaguesController.updatePlagueByID);
route.delete('/plagues/:idPlague',[verifySession], plaguesController.deletePlagueById);

export default route;