import VotesServices from '../services/votes.js';

function getVotes(req, res) {
    const { idGame } = req.params;
    VotesServices.findVotes(idGame)
        .then(function (votes) {
            res.json(votes);
        })
        .catch(function (err) {
            res.status(500).json({ msg: err.msg });
        })
}

function createVote(req, res) {
    const { idGame } = req.params;
    VotesServices.createVote(idGame, req.body)
        .then(function (vote) {
            res.json(vote);
        })
        .catch(function (err) {
            res.status(500).json({ msg: err.msg });
        })
}

function getVoteByJudge(req, res) { 
    const { idJudge } = req.params;
    VotesServices.getVoteByJudge(idJudge)
    .then(function(votes){
        res.status(200).json(votes);
    })
    .catch(function(err){
        res.status(500).json({msg: err.msg});
    })

}

export default {
    getVotes,
    createVote,
    getVoteByJudge
}