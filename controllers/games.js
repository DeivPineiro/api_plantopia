import GamesServices from "../services/games.js";

function getVoteByJudge(req, res) {

    GamesServices.getVoteByJudge(req.body)

    const { idJudge } = req.params;

    console.log(idJudge);

}

function getGames(req, res) {

    GamesServices.getGames(req.query)
        .then(function (Games) {
            res.status(200).json(Games);
        });

}

function getGameByID(req, res) {
    const { idGame } = req.params;
    GamesServices.getGameById(idGame)
        .then(function (Game) {
            return res.status(200).json(Game);
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

async function createGame(req, res) {
    return GamesServices.createGame(req.body)
        .then(function (game) {
            res.status(201).json(game);
        })
        .catch(function (err) {
            res.status(500).json({ msg: err.msg });
        })
}

function updateGameByID(req, res) {
    const { idGame } = req.params;
    
    GamesServices.updateGameByID(idGame, req.body)
        .then(function (game) {
            res.status(200).json(game);
        })
        .catch(function (err) {
            res.status(500).json({ msg: err });
        })
}

function getJudgesByGame(req, res) {
    const { idGame } = req.params;
    GamesServices.getJudgesByGame(idGame)
        .then(function (judges) {
            res.status(200).json(judges);
        })
        .catch(function (err) {
            res.status(500).json({ msg: err.msg });
        })
}

function deleteGameById(req, res){    
    const { idGame } = req.params;
    GamesServices.deleteGameById(idGame)   
    .then(function (game) {
        res.status(200).json(game);
    })
    .catch(function (err) {
        res.status(500).json({ msg: err.msg });
    })
}

export {
    getGames,
    getGameByID,
    createGame,
    updateGameByID,
    getJudgesByGame,
    deleteGameById

}
export default {
    getGameByID,
    getGames,
    createGame,
    updateGameByID,
    getJudgesByGame,
    deleteGameById

}

//OK

