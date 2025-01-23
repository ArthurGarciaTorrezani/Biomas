import { comentQueries } from "../queries/comentQueries.js";
import { executeQueries } from "../queries/executeQueries.js";
import { validations } from "../validations/validations.js";

async function coments(req, res) {
  const query = comentQueries.SELECT_ALL_COMENTS;
  const resposta = await executeQueries.elements(query);
  return res.json(resposta);
}

async function coment(req, res) {
  const { comentario_id } = req.body;
  const query = comentQueries.SELECT_COMENT;
  const resposta = await executeQueries.element(comentario_id, query);
  return res.json(resposta);
}

async function comentCreate(req, res) {
  const { titulo, conteudo, usuario_id, comentario_pai_id, post_id } = req.body;
  const data = req.body;

  const notValid = validations.comentValidation(data);
  if (notValid) {
    return res.status(valid.status).json(valid.error);
  }

  const queryC = comentQueries.INSERT;
  const correctData = [
    titulo,
    conteudo,
    usuario_id,
    comentario_pai_id,
    post_id,
  ];
  const resposta = await executeQueries.elementCreate(correctData, queryC);
  return res.json(resposta);
}

async function comentUpdate(req,res) {
  const {
    titulo,
    conteudo,
    usuario_id,
    comentario_pai_id,
    post_id,
    comentario_id,
  } = req.body;
  const data = req.body;

  const notValid = validations.comentValidation(data);
  if (notValid) {
    return res.status(valid.status).json(valid.error);
  }

  const queryC = comentQueries.UPDATE_ALL;
  const correctData = [
    titulo,
    conteudo,
    usuario_id,
    comentario_pai_id,
    post_id,
    comentario_id,
  ];
  const resposta = await executeQueries.elementUpdate(correctData, queryC);
  return res.json(resposta);
}

async function comentDelete(req,res) {
  const {comentario_id} = req.body;
  const data = [comentario_id];
  const queryD = comentQueries.DELETE;
  const resposta = await executeQueries.elementDelete(data,queryD);
  return res.json(resposta);
}

export const comentController = {
  coments,
  coment,
  comentCreate,
  comentUpdate,
  comentDelete
};
