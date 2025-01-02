import clientDataBase from "../config/connectionDataBase.js";

const INSERT = "INSERT INTO Usuarios(nome, email, senha_hash) VALUES($1,$2,$3)";
const SELECT_ALL_USERS = "SELECT * FROM Usuarios";
const SELECT_USER = "SELECT * FROM Usuarios WHERE usuario_id = $1";
const SELECT_USER_WITH_EMAIL = "SELECT * FROM Usuarios WHERE email = $1";


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
  const user = await execQuery(query, params);
  console.log("Usuario devolvido com sucesso");
  return user.rows;
}

// CREATE USER 
async function userCreate(data){
     const query = INSERT;
     const {nome, email, senha_hash} = data;
     const params = [nome, email, senha_hash];
     await execQuery(query,params);
     const res = "Usuário criado com sucesso"
     return res;
}

// CHECK EMAIL
async function emailExist(email) {
     const query = SELECT_USER_WITH_EMAIL;
     const params = [email];
     const res = await execQuery(query, params);
     return res.rows.length > 0;
}
   

export const userQueries = {
  users,
  user,
  userCreate,
  emailExist
};
