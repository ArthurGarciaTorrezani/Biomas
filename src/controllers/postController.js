import { biomsQueries } from "../queries/biomsQueries.js";
import { executeQueries } from "../queries/executeQueries.js";
import { postQueries } from "../queries/postQueries.js";
import { comentQueries } from "../queries/comentQueries.js";
import { userQueries } from "../queries/userQueries.js";
import { validations } from "../validations/validations.js";

async function posts(req, res) {
  const posts = await executeQueries.elements(postQueries.SELECT_ALL_POSTS);
  return res.json(posts);
}

async function postscoments(req, res) {
  const posts = await executeQueries.elements(postQueries.SELECT_ALL_POSTS);

  let postComents = [];

  for (const post of posts.data) {
   
    const coments = await executeQueries.elements(comentQueries.SELECT_COMENTS_BY_ID, [post.post_id]);
    
    postComents.push({
      post: post,
      comentarios: coments,
    });
  }

  return res.json(postComents);
}

async function postCreate(req, res) {
  const { titulo, conteudo, bioma_id, usuario_id } = req.body;
  const data = req.body;

  if (req.session.user.id != usuario_id) {
    return res.json({ "dados incorretos": "id diferente" });
  }

  const valid = validations.postValidation(data);
  if (valid) {
    return res.status(valid.status).json(valid.error);
  }

  const queryU = userQueries.SELECT_USER_WITH_ID;
  const userExist = await validations.userExist(usuario_id, queryU);

  if (userExist.success == false) {
    return res.status(userExist.status).json(userExist.error);
  }

  const queryB = biomsQueries.SELECT_BIOM;
  const biomExist = await validations.biomExist(bioma_id, queryB);

  if (biomExist.success == false) {
    return res.status(biomExist.status).json(biomExist.error);
  }

  const correctData = [titulo, conteudo, bioma_id, usuario_id];
  const queryP = postQueries.INSERT;
  const resposta = await executeQueries.elementCreate(correctData, queryP);
  return res.json(resposta);
}

async function postUpdate(req, res) {
  const { post_id, titulo, conteudo, bioma_id, usuario_id } = req.body;
  const data = req.body;

  if (req.session.user.id != usuario_id) {
    return res.json({ "dados incorretos": "id diferente" });
  }

  const valid = validations.postValidation(data);

  if (valid) {
    return res.status(valid.status).json(valid.error);
  }

  const queryU = userQueries.SELECT_USER_WITH_ID;
  const userExist = await validations.userExist(usuario_id, queryU);

  if (userExist.success === false) {
    return res.status(userExist.status).json(userExist.error);
  }

  const queryB = biomsQueries.SELECT_BIOM;
  const biomExist = await validations.biomExist(bioma_id, queryB);

  if (biomExist.success === false) {
    return res.status(biomExist.status).json(biomExist.error);
  }

  const queryCheckPost = postQueries.SELECT_POST_WITH_ID_AND_USER;
  let correctData = [post_id, usuario_id];
  const postExist = await executeQueries.checkPostExist(
    correctData,
    queryCheckPost
  );

  if (postExist.error || postExist.exists == false) {
    return res.status(404).json({
      error: "Post não encontrado ou usuário não autorizado a editar este post",
    });
  }

  correctData = [titulo, conteudo, bioma_id, usuario_id, post_id];
  const queryP = postQueries.UPDATE_ALL;
  const resposta = await executeQueries.elementUpdate(correctData, queryP);
  return res.json(resposta);
}

async function post(req, res) {
  const { post_id } = req.body;
  const query = postQueries.SELECT_POST;
  const resposta = await executeQueries.element(post_id, query);
  return res.json(resposta);
}

export const postController = {
  posts,
  post,
  postCreate,
  postUpdate,
  postscoments,
};
