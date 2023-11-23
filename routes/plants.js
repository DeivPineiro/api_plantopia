import express from 'express';
import PlantsController from '../controllers/plants.js';

const route = express.Router();

route.get('/plants', [] , PlantsController.getPlants); //ok
route.post('/plants', PlantsController.createPlant); // ok

route.get('/plants/:idPlant', PlantsController.getPlantByID); // ok
route.put('/plants/:idPlant', PlantsController.updatePlantByID);// ok
route.patch('/plants/:idPlant', PlantsController.updatePlantByID);// lo mismo que put... pero por si las agrego la ruta
route.delete('/plants/:idPlant', PlantsController.deletePlantById);// ok

export default route;


// OK