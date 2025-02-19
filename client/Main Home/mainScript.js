const greetingElement = document.getElementById("greeting");

// Obtém a hora atual do sistema
const currentHour = new Date().getHours();

// Definindo a saudação com base na hora
const greetingMessage =
  currentHour >= 5 && currentHour < 12
    ? "Bom dia!"
    : currentHour >= 12 && currentHour < 18
    ? "Boa tarde!"
    : "Boa noite!";

greetingElement.textContent = greetingMessage;

document.getElementById("menu-btn").addEventListener("click", () => {
    const menu = document.getElementById("dropdown-menu");
    menu.classList.toggle("hidden");
    menu.style.display = menu.style.display === "block" ? "none" : "block";
});

document.addEventListener("DOMContentLoaded", () => {
  const biomas = document.querySelectorAll(".bioma");

  // Criar tooltip para exibir o nome do bioma
  const tooltip = document.createElement("div");
  tooltip.id = "bioma-tooltip";
  tooltip.style.position = "absolute";
  tooltip.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
  tooltip.style.color = "#fff";
  tooltip.style.padding = "5px";
  tooltip.style.borderRadius = "5px";
  tooltip.style.display = "none";
  tooltip.style.pointerEvents = "none";
  document.body.appendChild(tooltip);

  biomas.forEach((bioma) => {
      bioma.addEventListener("mouseenter", (event) => {
        tooltip.textContent = event.target.getAttribute("data-bioma");
        tooltip.style.display = "block";
        tooltip.style.left = event.pageX + "px";
        tooltip.style.top = event.pageY + "px";
      });

      bioma.addEventListener("mousemove", (event) => {
        tooltip.style.left = event.pageX + "px";
        tooltip.style.top = event.pageY + "px";
      });

      bioma.addEventListener("mouseleave", () => {
          bioma.style.fill = "";  // Retorna à cor original
          tooltip.style.display = "none";
      });

      bioma.addEventListener("click", () => {
          const biomaId = bioma.dataset.bioma.toLowerCase().replace(" ", "");
          window.location.href = `../${biomaId}/bioma${biomaId}.html`;
      });
  });
});