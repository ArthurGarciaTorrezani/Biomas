import { userQueries } from "../queries/userQueries.js";
import { validations } from "../validations/validations.js";
import bcrypt from "bcryptjs";

async function users(req, res) {
  const resposta = await userQueries.users();
  return res.json(resposta);
}
async function user(req, res) {
  const { usuario_id } = req.body;
  const resposta = await userQueries.user(usuario_id);
  return res.json(resposta);
}
async function userCreate(req, res) {
  const { nome, email, senha } = req.body;
  const data = req.body;

  const valid = validations.userValidation(data);
  if (valid) {
    return res.status(valid.status).json(valid.error);
  }
  const emailExist = await validations.emailExist(email);
  if (emailExist) {
    return res.status(emailExist.status).json(emailExist.error);
  }

  const senha_hash = crypt(senha);

  const correctData = [nome, email, senha_hash];

  const resposta = await userQueries.userCreate(correctData);
  return res.json(resposta);
}

async function userUpdate(req, res) {
  const {
    nomeAtual,
    nomeNovo,
    emailAtual,
    emailNovo,
    senhaAtual,
    senhaNova,
    usuario_id,
  } = req.body;
  const data = req.body;

  const valid = validations.userUpdateValidation(data);

  if (valid) {
    return res.status(valid.status).json(valid.error);
  }

  if (!emailAtual == emailNovo) {
    const emailExist = await validations.emailExist(emailNovo);
    if (emailExist) {
      return res.status(emailExist.status).json(emailExist.error);
    }
  }

  const senha_hash = crypt(senhaNova);

  const correctData = [nomeNovo, emailNovo, senha_hash, usuario_id];

  const resposta = await userQueries.userUpdate(correctData);
  return res.json(resposta);
}

function crypt(senha) {
  let salt = bcrypt.genSaltSync(10);
  let senha_hash = bcrypt.hashSync(senha, salt);
  return senha_hash;
}

export const userController = {
  users,
  user,
  userCreate,
  userUpdate,
};
