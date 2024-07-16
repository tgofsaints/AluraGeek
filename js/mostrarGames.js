import { conectaAPI } from "./conectaAPI.js";

const formulario = document.querySelector("[data-formulario]");
const cards = document.querySelector("[data-card]");

async function novosGames(evento) {
  evento.preventDefault();

  const nome = document.querySelector("[data-name]").value;
  const preco = document.querySelector("[data-price]").value;
  const imagem = document.querySelector("[data-image]").value;

  try {
    await conectaAPI.novoGame(nome, preco, imagem);
    limparInputs();
    carregarGames(); // Recarregar os jogos para incluir o novo
  } catch (e) {
    alert(e.message);
  }
}

formulario.addEventListener("submit", novosGames);

function constroiCard(id, nome, preco, imagem) {
  const game = document.createElement("li");
  game.className = "lista-card";
  game.innerHTML = `
    <div class="card">
      <img class="poster-card" src="${imagem}" alt="${nome} ">
      <h1 class="nome-card">${nome}</h1>
      <div class="preco-card">
        <p>$ ${preco}</p>
        <img src="/assets/🦆 icon _trash 2_.svg" alt="trash icon" class="delete-icon" data-id="${id}">
      </div>
    </div>`;

  const deleteIcon = game.querySelector(".delete-icon");
  deleteIcon.addEventListener("click", async () => {
    try {
      await conectaAPI.excluirGame(id);
      carregarGames(); // Recarregar os jogos após a exclusão
    } catch (e) {
      alert(e.message);
    }
  });

  return game;
}

async function carregarGames() {
  cards.innerHTML = ""; // Limpa os cards existentes antes de carregar novos
  try {
    const listaApi = await conectaAPI.games();
    listaApi.forEach((elemento) =>
      cards.appendChild(
        constroiCard(
          elemento.id,
          elemento.nome,
          elemento.preco,
          elemento.imagem
        )
      )
    );
  } catch (e) {
    alert(e.message);
    cards.innerHTML = `<div class="formulario">
      <h1>Tente novamente</h1>
      <form class="form-container" data-formulario>
        <input data-name type="text" placeholder="nome">
        <input data-price type="text" placeholder="preço">
        <input data-image type="text" placeholder="url-imagem">
        <div class="btn-formulario-container">
          <button type="submit" class="button-submit" id="button">Enviar</button>
          <button type="reset" class="button-clean" id="button"><span>Limpar</span></button>
        </div>
      </form>
    </div>`;
  }
}

function limparInputs() {
  document.querySelector("[data-name]").value = "";
  document.querySelector("[data-price]").value = "";
  document.querySelector("[data-image]").value = "";
}

carregarGames();
