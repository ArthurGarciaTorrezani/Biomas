import { userQueries } from "../queries/userQueries.js";
import { executeQueries } from "../queries/executeQueries.js";
import { validations } from "../validations/validations.js";
import bcrypt from "bcryptjs";

async function users(req, res) {
  const query = userQueries.SELECT_ALL_USERS;
  const resposta = await executeQueries.elements(query);
  return res.json(resposta);
}
async function user(req, res) {
  const { usuario_id } = req.body;
  const query = userQueries.SELECT_USER;
  const resposta = await executeQueries.element(usuario_id, query);
  return res.json(resposta);
}

async function userCreate(req, res) {
  const { nome, email, senha } = req.body;
  const data = req.body;

  const valid = validations.userValidation(data);
  if (valid) {
    return res.status(valid.status).json(valid.error);
  }

  const queryE = userQueries.SELECT_USER_WITH_EMAIL;
  const emailExist = await validations.emailExist(email, queryE);
  if (emailExist.success == false) {
    return res.status(emailExist.status).json(emailExist.error);
  }

  const senha_hash = crypt(senha);

  const correctData = [nome, email, senha_hash];
  const query = userQueries.INSERT;
  const resposta = await executeQueries.elementCreate(correctData, query);
  return res.json(resposta);
}

async function userUpdate(req, res) {
  const { nomeNovo, emailAtual, emailNovo, senhaNova, usuario_id } = req.body;
  const data = req.body;

  const valid = validations.userUpdateValidation(data);

  if (valid) {
    return res.status(valid.status).json(valid.error);
  }

  if (emailAtual !== emailNovo) {
    const queryE = userQueries.SELECT_USER_WITH_EMAIL;
    const emailExist = await validations.emailExist(emailNovo, queryE);
    if (emailExist.success == false) {
      return res.status(emailExist.status).json(emailExist.error);
    }
  }

  const senha_hash = crypt(senhaNova);

  const correctData = [nomeNovo, emailNovo, senha_hash, usuario_id];

  const queryU = userQueries.UPDATE_ALL;
  const resposta = await executeQueries.elementUpdate(correctData, queryU);
  return res.json(resposta);
}

async function crypt(senha) {
  let salt = await bcrypt.genSalt(10);
  let senha_hash = await bcrypt.hash(senha, salt);
  return senha_hash;
}

export const userController = {
  users,
  user,
  userCreate,
  userUpdate,
};
