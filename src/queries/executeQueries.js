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
  try {
    const posts = await execQuery(query);
    return {
      success: true,
      data: posts.rows,
      status: 200
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
      status: 500
    };
  }
}

// GET ELEMENT
async function element(idEmail, query) {
  try {
    const params = [idEmail];
    const result = await execQuery(query, params);
    if (result.rows.length === 0) {
      return {
        success: false,
        error: "Elemento não encontrado",
        status: 404
      };
    }
    return {
      success: true,
      data: result.rows[0],
      status: 200
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
      status: 500
    };
  }
}

// CREATE ELEMENT
async function elementCreate(data, query) {
  try {
    const params = data;
    await execQuery(query, params);
    return {
      success: true,
      message: "Elemento criado com sucesso",
      status: 201
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
      status: 500
    };
  }
}

// UPDATE ELEMENT
async function elementUpdate(data, query) {
  try {
    await execQuery(query, data);
    return {
      success: true,
      message: "Elemento atualizado com sucesso",
      status: 200
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
      status: 500
    };
  }
}

async function elementDelete(data, query) {
  try {
    await execQuery(query, data);
    return {
      success: true,
      message: "Elemento deletado com sucesso",
      status: 200
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
      status: 500
    };
  }
}

async function elementExist(id, query) {
  try {
    const params = [id];
    const res = await execQuery(query, params);
    return {
      success: true,
      exists: res.rows.length > 0,
      status: 200
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
      status: 500
    };
  }
}

async function emailExist(email, query) {
  try {
    const params = [email];
    const res = await execQuery(query, params);
    return {
      success: true,
      exists: res.rows.length > 0,
      status: 200
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
      status: 500
    };
  }
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
