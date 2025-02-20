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
  const { nomeNovo, emailNovo, senhaNova, usuario_id } = req.body;

  if (req.session.user.id != usuario_id) {
    return res.json({ error: "ID do usuário incorreto" });
  }

  const valid = validations.userUpdateValidation(req.body);
  if (valid) {
    return res.status(valid.status).json(valid.error);
  }

  const queryV = userQueries.SELECT_USER;
  const userExist = await executeQueries.element(usuario_id, queryV);

  if (userExist.error) {
    return res.status(userExist.status).json(userExist.error);
  }

  if (userExist.data.email !== emailNovo) {
    const queryE = userQueries.SELECT_USER_WITH_EMAIL;
    const emailExist = await validations.emailExist(emailNovo, queryE);
    if (!emailExist.success) {
      return res.status(emailExist.status).json(emailExist.error);
    }
  }

  const senha_hash = senhaNova ? crypt(senhaNova) : userExist.senha;
  const correctData = [nomeNovo, emailNovo, senha_hash, usuario_id];

  const queryU = userQueries.UPDATE_ALL;
  const updateResult = await executeQueries.elementUpdate(correctData, queryU);

  return res.json(updateResult);
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
