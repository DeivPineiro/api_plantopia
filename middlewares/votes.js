import { votesCreateSchema } from "../schema/votes.js";
import { VotesCollection } from "../services/votes.js";
import { ObjectId } from "mongodb";

export async function validateCreateVote(req, res, next) {
    const idGame = req.params.idGame;
    const idJudge = req.body.idJudge
    const Vote = await VotesCollection.findOne({ judge_id: new ObjectId(idJudge), game_id: new ObjectId(idGame) });
    if (Vote) {
        return res.status(400).json({ error: "El juez ya realizó una votación en este juego." })
    }
    votesCreateSchema.validate(req.body, {
        stripUnknown: true,// Solo datos del schema
        abortEarly: false// para mostrar todos los errores, y no cortar en el primero que encuentre
    })
        .then(async function (vote) {
            req.body = vote;
            next();
        })
        .catch(function (err) {
            res.status(400).json(err);
        });

}