const INSERT = "INSERT INTO Usuarios(nome, email, senha_hash) VALUES($1,$2,$3)";
const SELECT_ALL_USERS = "SELECT * FROM Usuarios";
const SELECT_USER = "SELECT * FROM Usuarios WHERE usuario_id = $1";
const SELECT_USER_WITH_EMAIL = "SELECT * FROM Usuarios WHERE email = $1";
const SELECT_USER_WITH_ID = "SELECT * FROM Usuarios WHERE usuario_id = $1";
const UPDATE_ALL =
  "UPDATE Usuarios SET nome = $1, email = $2, senha_hash = $3 WHERE usuario_id = $4";

export const userQueries = {
  INSERT,
  SELECT_ALL_USERS,
  SELECT_USER,
  UPDATE_ALL,
  SELECT_USER_WITH_EMAIL,
  SELECT_USER_WITH_ID
};
