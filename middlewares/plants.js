import { createPlantSchema } from "../schema/plants.js";

async function validateCreatePlant(req, res, next) {
    createPlantSchema.validate(req.body, {
        stripUnknown: true,
        abortEarly: false
    })
        .then(plant => {
            req.body = plant;
            next();
        })
        .catch(err => {
            res.status(400).json(err);
        });
}
export { validateCreatePlant };
export default validateCreatePlant;