export const biomsQueries = {
     INSERT:
       "INSERT INTO Biomas(titulo, conteudo, bioma_id, usuario_id) VALUES($1,$2,$3,$4)",
     SELECT_ALL_BIOMS: "SELECT * FROM Biomas",
     SELECT_BIOM: "SELECT * FROM Biomas WHERE bioma_id = $1",
     UPDATE_ALL:
       "UPDATE Usuarios SET titulo = $1, conteudo = $2, bioma_id = $3, usuario_id = $4 WHERE post_id = $5",
   };
   