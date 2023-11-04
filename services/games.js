import { MongoClient, ObjectId } from "mongodb";

const client = new MongoClient('mongodb://127.0.0.1:27017');
const db = client.db("GameJam");
export const GameCollection = db.collection('Games');

function filterQueryToMongo(filter) {//filter visto en clase
    const filterMongo = {};
    for (const filed in filter) {
        if (isNaN(filter[filed])) {
            filterMongo[filed] = filter[filed];
        }
    }
    return filterMongo
}

async function getGames(filter = {}) {// traer games
    await client.connect();

    if (filter.edition) {// filtrar por edicion /games?edition=AÑO
        const y = filter.edition;

        return GameCollection.aggregate([
            {
                $match: { edition: y }
            },
            {
                $lookup: {
                    from: "Votes",
                    localField: "_id",
                    foreignField: 'game_id',
                    as: "votes"
                }
            },
            {
                $addFields: {
                    totalScore: { $sum: "$votes.puntaje" }
                }
            },
            {
                $sort: { totalScore: -1 }
            }
        ]).toArray();
    } else if (filter.idGame) {// filtrar por idGame /games?idGame=game_id
        const id = new ObjectId(filter.idGame);
        return GameCollection.aggregate([
            { $match: { _id: id } },
            {
                $lookup: {
                    from: "Votes",
                    localField: "_id",
                    foreignField: "game_id",
                    as: "votes"
                }
            },
            {
                $unwind: "$votes"
            },
            {
                $group: {
                    _id: "$_id",
                    Jugabilidad: { $avg: { $toInt: "$votes.Jugabilidad" } },
                    Arte: { $avg: { $toInt: "$votes.Arte" } },
                    Sonido: { $avg: { $toInt: "$votes.Sonido" } },
                    Afinidad_tematica: { $avg: { $toInt: "$votes.Afinidad_tematica" } },
                    datos_Juego: { $first: "$$ROOT" }// similar al ...data// $$ROOT doc del juego matcheado con el id
                }
            },
            {
                $project: {// Uso que deseo proyectar, de esta manera no me muestra los votos
                   _id: 1,
                   name: 1,
                   Jugabilidad: 1,
                   Arte: 1,
                   Sonido: 1,
                   Afinidad_tematica: 1,
                   datos_Juego: {
                      _id: 1,
                      name: 1,
                      genre: 1,
                      members: 1,
                      edition: 1
                   }
                }
             }
        ]).toArray();
    }

    const filterMongo = filterQueryToMongo(filter);
    console.log(filterMongo)
    return GameCollection.find({$and:[filterMongo,{$or:[{ deleted: { $exists: false } },{ deleted: false }]}]})
    .toArray();//Usando operadores logicos utilizamos tando el filterMongo como que no este deleted
}

async function getGameById(id) {//Busca por id
    await client.connect();
    return GameCollection.findOne({ _id: new ObjectId(id) });
}

async function createGame(game) {// Crea un nuevo game
    await client.connect();
    const newGame = { ...game };

    await GameCollection.insertOne(newGame);
    return newGame;
}

async function updateGameByID(id, game) {// Actualizar game
    await client.connect();
    console.log("Service Update")       
    delete game._id;
    console.log("Body: ",game, "Id: ", id)
    return GameCollection.updateOne({ _id: new ObjectId(id) }, { $set: game });
}

async function deleteGameById(idGame){// Borra logiamente un game con campo deleted = true
    await client.connect();
    console.log("Service Delete");
    const id = new ObjectId(idGame)
   return GameCollection.updateOne({_id:id},  {$set:{deleted: true}});

}

async function getJudgesByGame(idGame) {// Busca que jueces lo votaron y sus calificaciones.
    await client.connect();

    const gameId = new ObjectId(idGame);
    return GameCollection.aggregate([
        {
            $match: {
                _id: gameId
            }
        },
        {
            $lookup: {
                from: "Votes",
                localField: "_id",
                foreignField: "game_id",
                as: "votes"
            }
        },
        {
            $unwind: "$votes"
        },
        {
            $lookup: {
                from: "Judges",
                localField: "votes.judge_id",
                foreignField: "_id",
                as: "judge"
            }
        },
        {
            $project: {
                Nombre_Juego: "$name",
                Nombre_Juez: "$judge.name",
                Jugabilidad: "$votes.Jugabilidad",
                Arte: "$votes.Arte",
                Sonido: "$votes.Sonido",
                Afinidad_tematica: "$votes.Afinidad_tematica"
            }
        }
    ]).toArray();
}

export {
    getGameById,
    getGames,
    createGame,
    updateGameByID,
    getJudgesByGame,
    deleteGameById
}
export default {
    getGameById,
    getGames,
    createGame,
    updateGameByID,
    getJudgesByGame,
    deleteGameById
}

//Ok