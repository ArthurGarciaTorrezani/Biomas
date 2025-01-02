import { userQueries } from "../queries/userQueries.js";

function userValidation(data) {
  const { nome, email, senha } = data;

  if (!nome || typeof nome !== "string" || nome.trim() === "") {
    return {
      error: "Nome é obrigatório e deve ser uma string não vazia.",
      status: 400,
    };
  }
  if (!email || typeof email !== "string" || !email.includes("@")) {
    return {
      error: "Email é obrigatório e deve ser um email válido.",
      status: 400,
    };
  }
  if (!senha|| typeof senha !== "string" || senha.length < 6) {
    return {
      error: "Senha é obrigatória e deve ter pelo menos 6 caracteres.",
      status: 400,
    };
  }
}

async function emailExist(email) {
  const emailExist = await userQueries.emailExist(email);
  if (emailExist) {
    return {
      error: "E-mail já em uso, tente outro.",
      status: 400,
    };
  }
}

export const validations = {
  userValidation,
  emailExist
};
