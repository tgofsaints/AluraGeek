const camposDoFormulario = document.querySelectorAll("[required]");
const formulario = document.querySelector("[data-formulario]");

formulario.addEventListener("submit", async (e) => {
  e.preventDefault();

  const nome = e.target.elements["name"].value;
  const preco = e.target.elements["price"].value;
  const imagem = e.target.elements["image"].value;

  try {
    await conectaAPI.novoGame(nome, preco, imagem);
    localStorage.setItem(
      "cadastro",
      JSON.stringify({ nome, preco, imagem })
    );
    window.location.href = "index.html";
  } catch (error) {
    alert(error.message);
  }
});

camposDoFormulario.forEach((campo) => {
  campo.addEventListener("blur", () => verificaCampo(campo));
  campo.addEventListener("invalid", (evento) => evento.preventDefault());
});

const tiposDeErro = [
  "valueMissing",
  "typeMismatch",
  "patternMismatch",
  "tooShort",
  "customError",
];

const mensagens = {
  name: {
    valueMissing: "O campo de nome não pode estar vazio.",
    patternMismatch: "Por favor, preencha um nome válido.",
    tooShort: "Por favor, preencha um nome válido.",
  },
  price: {
    valueMissing: "O campo de preço não pode estar vazio.",
    typeMismatch: "Por favor, preencha um preço válido.",
    tooShort: "Por favor, preencha um preço válido.",
  },
  image: {
    valueMissing: "O campo de imagem não pode estar vazio.",
    typeMismatch: "Por favor, preencha uma URL válida.",
    tooShort: "Por favor, preencha uma URL válida.",
    customError: "A URL deve começar com https://",
  },
};

function verificaCampo(campo) {
  let mensagem = "";
  campo.setCustomValidity("");

  if (
    campo.name === "image" &&
    campo.value &&
    !campo.value.startsWith("https://")
  ) {
    campo.setCustomValidity(mensagens.image.customError);
  }

  tiposDeErro.forEach((erro) => {
    if (campo.validity[erro]) {
      mensagem = mensagens[campo.name][erro] || "";
      console.log(mensagem);
    }
  });

  const mensagemErro = campo.parentNode.querySelector(".mensagem-erro");
  const validadorDeInput = campo.checkValidity();

  if (!validadorDeInput) {
    mensagemErro.textContent = mensagem;
  } else {
    mensagemErro.textContent = "";
  }
}
