export const comentQueries = {
  INSERT:
    "INSERT INTO Comentarios(titulo, conteudo,usuario_id,comentario_pai_id,post_id) VALUES($1,$2,$3,$4,$5)",
  SELECT_ALL_COMENTS: "SELECT * FROM Comentarios",
  SELECT_COMENT: "SELECT * FROM Comentarios WHERE comentario_id = $1",
  UPDATE_ALL:
    "UPDATE Comentarios SET titulo = $1, conteudo = $2, usuario_id = $3, comentario_pai_id = $4 , post_id = $5 WHERE comentario_id = $6",
  DELETE: "DELETE FROM Comentarios WHERE comentario_id = $1",
  SELECT_COMENTS_BY_ID:"SELECT * FROM Comentarios WHERE post_id = $1"
};
