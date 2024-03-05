import PlantsServices from "../services/plants.js";

function getPlants(req, res) {
    PlantsServices.getPlants(req.query)
        .then(function (plants) {
            res.status(200).json(plants);
        });
}

function getAdminPlants(req, res) {
    PlantsServices.getAdminPlants(req.query)
        .then(function (plants) {
            res.status(200).json(plants);
        });
}

function getPlantByID(req, res) {
    const { idPlant } = req.params;
    PlantsServices.getPlantById(idPlant)
        .then(function (plant) {
            return res.status(200).json(plant);
        })
        .catch(function (err) {
            if (err?.code) {
                res.status(err.code).json({ msg: err.msg });
            }
            else {
                res.status(500).json({ msg: "No se pudo traer en el archivo" });
            }
        });
}

async function createPlant(req, res) {
    return PlantsServices.createPlant(req.body)
        .then(function (plant) {
            res.status(201).json(plant);
        })
        .catch(function (err) {
            res.status(500).json({ msg: err.msg });
        })
}

function updatePlantByID(req, res) {
    const { idPlant } = req.params;

    PlantsServices.updatePlantByID(idPlant, req.body)
        .then(function (plant) {
            res.status(200).json(plant);
        })
        .catch(function (err) {
            res.status(500).json({ msg: err });
        })
}

function deletePlantById(req, res) {
    const { idPlant } = req.params;
    PlantsServices.deletePlantById(idPlant)
        .then(function (plant) {
            res.status(200).json(plant);
        })
        .catch(function (err) {
            res.status(500).json({ msg: err.msg });
        })
}

export default {
    getPlantByID,
    getPlants,
    createPlant,
    updatePlantByID,
    deletePlantById,
    getAdminPlants
}

//OK

