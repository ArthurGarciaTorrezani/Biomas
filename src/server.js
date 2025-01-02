import app from "./app.js";
import clientDataBase from "./config/connectionDataBase.js";

async function startServer() {
     try {
       // Conecta ao banco de dados
       await clientDataBase.connect();
       console.log("Conectado ao banco de dados");
   
       // Inicia o servidor
       app.listen(8080, () => {
         console.log("Servidor rodando na porta 8080");
       });
     } catch (err) {
       console.error("Erro ao conectar ao banco de dados:", err);
       process.exit(1); // Encerra a aplicação caso haja erro crítico
     }
   }
   
   startServer();
   