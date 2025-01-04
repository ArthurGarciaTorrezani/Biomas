import clientDataBase from "../config/connectionDataBase.js";

const INSERT = "INSERT INTO Usuarios(nome, email, senha_hash) VALUES($1,$2,$3)";
const SELECT_ALL_USERS = "SELECT * FROM Usuarios";
const SELECT_USER = "SELECT * FROM Usuarios WHERE usuario_id = $1";
const SELECT_USER_WITH_EMAIL = "SELECT * FROM Usuarios WHERE email = $1";
const SELECT_USSER_WITH_ID = "SELECT * FROM Usuarios WHERE usuario_id = $1";
const UPDATE_ALL =
  "UPDATE Usuarios SET nome = $1, email = $2, senha_hash = $3 WHERE usuario_id = $4";

async function execQuery(query, params) {
  try {
    const res = await clientDataBase.query(query, params);
    return res;
  } catch (err) {
    console.error("Erro ao executar a query:", err.message);
    throw err;
  }
}

// GET USERS
async function users() {
  const query = SELECT_ALL_USERS;
  console.log("asdfsafas");
  const users = await execQuery(query);
  return users.rows;
}

// GET USER
async function user(usuario_id) {
  const query = SELECT_USER;
  const params = [usuario_id];
  const result = await execQuery(query, params);
  if (result.rows.length === 0) {
    const msg = "Usuário não encontrado";
    return msg;
  }
  return result.rows[0];
}

// CREATE USER
async function userCreate(data) {
  const query = INSERT;
  const params = data;
  await execQuery(query, params);
  const res = "Usuário criado com sucesso";
  return res;
}

// UPDATE USER
async function userUpdate(data) {
  const query = UPDATE_ALL;
  await execQuery(query,data);
  const res = "Usuário atualizado com sucesso";
  return res;
}



// CHECK EMAIL FOR CREATE
async function emailExist(email) {
  const query = SELECT_USER_WITH_EMAIL;
  const params = [email];
  const res = await execQuery(query, params);
  return res.rows.length > 0;
}

// CHECK EMAIL FOR UPDATE
async function emailExistU(emailA, emailN) {
  const query = SELECT_USER_WITH_EMAIL;
  const params = [email];
  const res = await execQuery(query, params);
  return res.rows.length > 0;
}
export const userQueries = {
  users,
  user,
  userCreate,
  userUpdate,
  emailExist,
  emailExistU
};
