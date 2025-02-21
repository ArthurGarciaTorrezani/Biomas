document.addEventListener("DOMContentLoaded", function () {
     loadPosts();
 });
 
 function loadPosts() {
     fetch("http://localhost:8080/postscoments")
         .then(response => response.json())
         .then(posts => {
             const postsContainer = document.querySelector(".posts");
             postsContainer.innerHTML = "<h2>Últimos Posts</h2>";
                
             for (let i = 0; i < posts.data.length; i++) {
                 const post = posts.data[i];
                 const postElement = document.createElement("div");
                 postElement.classList.add("post");
                 console.log(post)
                 postElement.innerHTML = `
                     <h3>Título do post: ${post.titulo_post}</h3>
                     <p>Conteúdo do post:${post.conteudo_post}</p>
                     <p>Título do comentario:${post.titulo_comentario}</p>
                     <p>Conteúdo do comentario:${post.conteudo_comentario}</p>
                     <form class="comment-form">
                         <textarea placeholder="Adicione um comentário..."></textarea>
                         <button type="submit">Comentar</button>
                     </form>
                 `;
                 postsContainer.appendChild(postElement);
             }
 
             const commentForms = document.querySelectorAll(".comment-form");
             for (let i = 0; i < commentForms.length; i++) {
                 commentForms[i].addEventListener("submit", function (event) {
                     event.preventDefault(); // Impede o envio padrão do formulário
                     console.log("Comentário enviado!");
                 });
             }
         })
         .catch(error => console.error("Erro ao buscar posts:", error));
 }
 