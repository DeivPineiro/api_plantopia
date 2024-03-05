import { createPlagueSchema } from "../schema/plagues.js";

 async function validateCreatePlague(req, res, next) {

    createPlagueSchema.validate(req.body, {
        stripUnknown: true,
        abortEarly: false
    })
        .then(async function (plague) {
            req.body = plague;
            next();
        })
        .catch(function (err) {
            res.status(400).json(err);
        });
}

export default validateCreatePlague;