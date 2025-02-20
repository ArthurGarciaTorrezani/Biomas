import { executeQueries } from "../queries/executeQueries";
import { userQueries } from "../queries/userQueries";
import { validations } from "../validations/validations";

async function sessionCreate(req, res) {
  const { email, senha } = req.body;

  const queryU = userQueries.SELECT_USER_WITH_EMAIL;
  const user = await executeQueries.element(email, queryU);

  if (user.error != undefined) {
    return res.status(user.status).json(user.error);
  }

  const checkPassword = await validations.checkPassword(email, senha, queryU);

  if (checkPassword.success === false) {
    return res.status(checkPassword.status).json(checkPassword.error);
  }
  
  const { nome, usuario_id } = user.data;
  req.session.user = {
    nome: nome,
    id: usuario_id,
  }; 
  
  return res.json({success: true});
}

function sessionLogout(req, res) {
  req.session.user = undefined;
  return res.json({'logout': 'ok'})
}

export const sessionController = {
  sessionCreate,
  sessionLogout,
};
