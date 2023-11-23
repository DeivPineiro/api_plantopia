import express from 'express';
import plaguesController from '../controllers/plagues.js';

const route = express.Router();

route.get('/plagues', [] , plaguesController.getPlagues); //ok
route.post('/plagues', plaguesController.createPlague); // ok

route.get('/plagues/:idPlague', plaguesController.getPlagueByID); // ok
route.put('/plagues/:idPlague', plaguesController.updatePlagueByID);// ok
route.patch('/plagues/:idPlague', plaguesController.updatePlagueByID);// lo mismo que put... pero por si las agrego la ruta
route.delete('/plagues/:idPlague', plaguesController.deletePlagueById);// ok

export default route;