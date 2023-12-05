import express from 'express';
import PlantsController from '../controllers/plants.js';
import validateCreatePlant from'../middlewares/plants.js';
import { verifySession } from '../middlewares/account.js';
const route = express.Router();

route.get('/plants', PlantsController.getPlants); 
route.post('/plants', [validateCreatePlant, verifySession], PlantsController.createPlant); 

route.get('/plants/:idPlant', PlantsController.getPlantByID); 
route.put('/plants/:idPlant',[verifySession], PlantsController.updatePlantByID);
route.patch('/plants/:idPlant',[verifySession], PlantsController.updatePlantByID);
route.delete('/plants/:idPlant',[verifySession], PlantsController.deletePlantById);

export default route;

// OK