import { MongoClient, ObjectId } from "mongodb";
import { GameCollection } from "./games.js";


const client = new MongoClient('mongodb://127.0.0.1:27017');
const db = client.db("GameJam");
export const VotesCollection = db.collection('Votes');
const JudgesCollection = db.collection('Judges');

async function findVotes(idGame) {
    await client.connect();
    return VotesCollection.find({ game_id: new ObjectId(idGame) }).toArray();
}

async function createVote(idGame, vote) {
   
    try {    
        const judge = await JudgesCollection.findOne({ _id: new ObjectId(vote.idJudge) });
        console.log("JUEZ: ", judge);        
        if (!judge) {
            throw new Error('Juez inexistente');
        }
        const game = await GameCollection.findOne({ _id: new ObjectId(idGame) });
        console.log("Game: ", game);
        if (!game) {
            throw new Error('Juego inexistente');
        }

        await client.connect();
        const puntaje = parseInt(vote.Afinidad_tematica) + parseInt(vote.Arte) + parseInt(vote.Jugabilidad) + parseInt(vote.Sonido);
        const newVote = {
            ...vote, judge_id: new ObjectId(vote.idJudge),
            game_id: new ObjectId(idGame),
            puntaje: puntaje
        }

        await VotesCollection.insertOne(newVote);
        return newVote;
    }
    catch (err){
        console.log("Error: ",err);
        return "ERROR: Revise id del juego o juez ingresado ya que no figuran en la base de datos";
    }

}

async function getVoteByJudge(idJudge) {
    await client.connect();

    const judgeId = new ObjectId(idJudge);

    return VotesCollection.aggregate([
        {
            $match: {
                judge_id: judgeId
            }
        },
        {
            $lookup: {
                from: "Games",
                localField: "game_id",
                foreignField: "_id",
                as: "game"
            }
        },
        {
            $unwind: "$game"
        },
        {
            $project: {
                judge_id: 1,
                Nombre_juego: "$game.name",
                Jugabilidad: "$Jugabilidad",
                Arte: "$Arte",
                Sonido: "$Sonido",
                Afinidad_tematica: "$Afinidad_tematica"
            }
        }
    ]).toArray();
}

export default {
    findVotes,
    createVote,
    getVoteByJudge
}