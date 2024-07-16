const API_URL = "http://localhost:3000/games";

const fetchData = async (url, options = {}) => {
  try {
    const response = await fetch(url, options);
    if (!response.ok) throw new Error("Erro na requisição ao servidor");
    return await response.json();
  } catch (error) {
    console.error(error);
    if (url === API_URL) return carregarDadosLocais(); // Carregar dados locais se falhar ao buscar jogos
    throw error;
  }
};

const games = () => fetchData(API_URL);

const novoGame = (nome, preco, imagem) =>
  fetchData(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nome, preco, imagem }),
  });

const excluirGame = (id) => fetchData(`${API_URL}/${id}`, { method: "DELETE" });

const carregarDadosLocais = async () => {
  const response = await fetch("db.json");
  const data = await response.json();
  return data.games;
};

export const conectaAPI = {
  games,
  novoGame,
  excluirGame,
};
