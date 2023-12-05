import { accountSchema } from "../schema/account.js";
import accountServices from '../services/account.js'

export function validateAccount(req, res, next) {
  accountSchema.validate(req.body, {
    stripUnknown: true,
    abortEarly: false
  })
    .then(async function (data) {
      req.body = data;
      next();
    })
    .catch(function (err) {
      res.status(400).json(err);
    });
}

export function verifySession(req, res, next) {
  const token = req.headers['token'];
  if (!token) {
    return res.status(401).json({ msg: "Token inexistente" });
  }
  accountServices.verifyToken(token)
    .then((payload) => {
      req.token = token;
      req.session = payload;
      next();
    })
    .catch(() => {
      return res.status(401).json({ msg: "El Token no es valido" });
    });
}

