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

  const correctData = { nome, email, senha_hash };

  const resposta = await userQueries.userCreate(correctData);
  return res.json(resposta);
}
async function userUpdate(req, res) {
  const { nome, email, senha, usuario_id } = req.body;

  const userExist = await validations.usuarioExist(usuario_id);
  if (!userExist) {
    const msg = "Usuário não encontrado";
    return res.json(msg);
  }
  if (email) {
    const emailExist = await validations.emailExist(email);
    if (emailExist) {
      return res.status(emailExist.status).json(emailExist.error);
    }
  }
  let senha_hash;
  if (senha) {
    senha_hash = crypt(senha);
  }

  let correctData = [nome, email, senha_hash, usuario_id];
  let resposta;
  if (nome && email && senha) {
    resposta = await userQueries.userUpdate(correctData, 1);
  } else {
    if (nome) {
      correctData = [nome, usuario_id];
      resposta = await userQueries.userUpdate(correctData, 2);
    }
    if (email) {
      correctData = [email, usuario_id];
      resposta = await userQueries.userUpdate(correctData, 3);
    }
    if (senha) {
      correctData = [senha_hash, usuario_id];
      resposta = await userQueries.userUpdate(correctData, 4);
    }
  }

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
