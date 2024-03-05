import accountService from '../services/account.js';

//*###########################//*Register*//*###########################*//

function createAccount(req, res) {
    accountService.createAccount(req.body)
        .then(() => {
            res.status(201).json({ msg: "Cuenta creada correctamente", status: 201 });
        })
        .catch(() => {
            res.status(500).json({ msg: "Error al crear la cuenta", status: 500 });
        })
}

//*###########################//*Session*//*###########################*//

function login(req, res) {
    accountService.createSession(req.body)
        .then((session) => {
            res.status(200).json(session);
        })
        .catch(() => {
            res.status(500).json({ msg: "Error al iniciar sesión" });
        })
}

function logout(req, res) {
    accountService.deleteSession(req.token)
        .then(() => {
            res.status(200).json({});
        })
        .catch((err) => {
            res.status(500).json({ msg: `Fallo al cerrar la session ${err}` , err });
        })
}

export default {
    createAccount,
    login,
    logout
}