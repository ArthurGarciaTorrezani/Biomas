import clientDataBase from "../config/connectionDataBase.js";

async function execQuery(query, params) {
  try {
    const res = await clientDataBase.query(query, params);
    return res;
  } catch (err) {
    console.error("Erro ao executar a query:", err.message);
    throw err;
  }
}

// GET ELEMENTS
async function elements(query) {
  const posts = await execQuery(query);
  return posts.rows;
}

// GET ELEMENT
async function element(idEmail, query) {
  const params = [idEmail];
  const result = await execQuery(query, params);
  if (result.rows.length === 0) {
    return {
      error: "Elementro não encontrado.",
      status: 204,
    };
  }
  return result.rows[0];
}

// CREATE ELEMENT
async function elementCreate(data, query) {
  const params = data;
  await execQuery(query, params);
  const res = "Elemento criado com sucesso";
  return res;
}

// UPDATE ELEMENT
async function elementUpdate(data, query) {
  await execQuery(query, data);
  const res = "Elemento atualizado com sucesso";
  return res;
}

async function elementDelete(data, query) {
  await execQuery(query, data);
  const res = "Elemento deletado com sucesso";
  return res;
}

async function elementExist(id, query) {
  const params = [id];
  const res = await execQuery(query, params);
  return res.rows.length > 0;
}

// CHECK EMAIL FOR CREATE
async function emailExist(email, query) {
  const params = [email];
  const res = await execQuery(query, params);
  return res.rows.length > 0;
}


export const executeQueries = {
  elements,
  element,
  elementCreate,
  elementUpdate,
  emailExist,
  elementExist,
  elementDelete,
};
