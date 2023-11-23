import PlaguesServices from "../services/plagues.js";

function getPlagues(req, res) {
    PlaguesServices.getPlagues(req.query)
        .then(function (plagues) {
            res.status(200).json(plagues);
        });
}

function getPlagueByID(req, res) {
    const { idPlague } = req.params;
    PlaguesServices.getPlagueById(idPlague)
        .then(function (plague) {
            return res.status(200).json(plague);
        })
        .catch(function (err) {
            if (err?.code) {
                res.status(err.code).json({ msg: err.msg });
            }
            else {
                res.status(500).json({ msg: "No se pudo guardar en el archivo" });
            }
        });
}

async function createPlague(req, res) {
    return PlaguesServices.createPlague(req.body)
        .then(function (plague) {
            res.status(201).json(plague);
        })
        .catch(function (err) {
            res.status(500).json({ msg: err.msg });
        })
}

function updatePlagueByID(req, res) {
    const { idPlague } = req.params;

    PlaguesServices.updatePlagueByID(idPlague, req.body)
        .then(function (plague) {
            res.status(200).json(plague);
        })
        .catch(function (err) {
            res.status(500).json({ msg: err });
        })
}

function deletePlagueById(req, res) {
    const { idPlague } = req.params;
    PlaguesServices.deletePlagueById(idPlague)
        .then(function (plague) {
            res.status(200).json(plague);
        })
        .catch(function (err) {
            res.status(500).json({ msg: err.msg });
        })
}

export {
    getPlagues,
    getPlagueByID,
    createPlague,
    updatePlagueByID,
    deletePlagueById

}
export default {
    getPlagues,
    getPlagueByID,
    createPlague,
    updatePlagueByID,
    deletePlagueById
}

//OK

