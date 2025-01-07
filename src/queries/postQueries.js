export const postQueries = {
  INSERT:
    "INSERT INTO Posts(titulo, conteudo, bioma_id, usuario_id) VALUES($1,$2,$3,$4)",
  SELECT_ALL_POSTS: "SELECT * FROM Posts",
  SELECT_POST: "SELECT * FROM Posts WHERE post_id = $1",
  UPDATE_ALL:
    "UPDATE Usuarios SET titulo = $1, conteudo = $2, bioma_id = $3, usuario_id = $4 WHERE post_id = $5",
};
