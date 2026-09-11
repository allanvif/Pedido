const frasesNao = [
  "Tem certeza, gatinha?",
  "Pensa bem, meu anjo!",
  "Erro 404: Opção Inválida!",
  "Tente novamente, docinho!",
  "Nem pense nisso, benzinho!",
  "Olha o outro botão, meu amor!",
  "Clica no verde, denguinho!",
  "Você tá tentando mesmo?",
  "Sem chance, gatinha!",
  "Acho que sua mão escorregou, docinho...",
  "Sistema recusa essa opção!",
  "Não foi dessa vez, benzinho!",
  "Ops, errou a direção, meu anjo!",
  "Clica no SIM logo, meu amor ❤️",
  "Resposta incorreta, denguinho!",
  "Aperte o botão verde, gatinha!",
  "Tentativa negada com sucesso!",
  "Você é o meu mundo, clica no SIM!",
  "Não é esse botão, docinho!",
  "Achou mesmo que dava pra dizer não, benzinho?"
];

let contadorNao = 0;

// 1. Data de início da história (16 de Junho de 2026 às 17:00)
const dataInicioHistoria = new Date(2026, 5, 16, 17, 0, 0); 

// 2. Data do SIM oficial (Preencha aqui DEPOIS do pedido para salvar na nuvem!)
const dataSimOficial = null;

// Lógica do Botão Fugitivo
function furaBotao() {
  const btnNao = document.getElementById("btnNao");
  const maxWidth = window.innerWidth - btnNao.offsetWidth - 20;
  const maxHeight = window.innerHeight - btnNao.offsetHeight - 20;

  const randomX = Math.max(10, Math.floor(Math.random() * maxWidth));
  const randomY = Math.max(10, Math.floor(Math.random() * maxHeight));

  btnNao.style.position = "fixed";
  btnNao.style.left = `${randomX}px`;
  btnNao.style.top = `${randomY}px`;

  btnNao.innerText = frasesNao[contadorNao % frasesNao.length];
  contadorNao++;
}

// Ação ao Clicar em SIM
function aceitou() {
  if (!localStorage.getItem("dataSimLocal")) {
    const agora = new Date().toISOString();
    localStorage.setItem("dataSimLocal", agora);
  }

  exibirPaginaCronometros();

  confetti({
    particleCount: 150,
    spread: 70,
    origin: { y: 0.6 }
  });
}

function exibirPaginaCronometros() {
  document.getElementById("mainCard").classList.add("hidden");
  document.getElementById("successCard").classList.remove("hidden");
}

function voltarParaPedido() {
  document.getElementById("successCard").classList.add("hidden");
  document.getElementById("mainCard").classList.remove("hidden");
}

function irParaCronometros() {
  exibirPaginaCronometros();
}

// Funções de Modal (Zoom na Foto)
function abrirModal(src) {
  const modal = document.getElementById("imageModal");
  const imgDisplay = document.getElementById("imgModalDisplay");
  modal.style.display = "block";
  imgDisplay.src = src;
}

function fecharModal() {
  document.getElementById("imageModal").style.display = "none";
}

// Cálculo de Tempo Decorrido
function calcularTempo(dataInicial) {
  const agora = new Date();
  let diff = Math.floor((agora - dataInicial) / 1000);

  if (diff < 0) return "Ainda não chegou a data!";

  const dias = Math.floor(diff / (3600 * 24));
  diff -= dias * 3600 * 24;
  const horas = Math.floor(diff / 3600);
  diff -= horas * 3600;
  const minutos = Math.floor(diff / 60);
  const segundos = diff % 60;

  return `${dias}d ${horas}h ${minutos}m ${segundos}s`;
}

// Atualização dos Cronômetros a cada segundo
setInterval(() => {
  // Cronômetro 1: História
  const elHistoria = document.getElementById("cronometroHistoria");
  if (elHistoria) {
    elHistoria.innerText = calcularTempo(dataInicioHistoria);
  }

  // Cronômetro 2: Namoro
  const elNamoro = document.getElementById("cronometroNamoro");
  if (elNamoro) {
    const dataLocalSalva = localStorage.getItem("dataSimLocal");
    const dataEfetiva = dataSimOficial || (dataLocalSalva ? new Date(dataLocalSalva) : null);

    if (dataEfetiva) {
      elNamoro.innerText = calcularTempo(dataEfetiva);
    } else {
      elNamoro.innerText = "Aguardando o SIM do meu anjo... ❤️";
    }
  }
}, 1000);

// Lógica para Gerar Corações Flutuantes no Fundo
function criarCoracoesDeFundo() {
  const container = document.createElement("div");
  container.id = "heartsContainer";
  document.body.appendChild(container);

  const simbolos = ["❤️", "💖", "💕", "💗", "💓"];

  setInterval(() => {
    const heart = document.createElement("div");
    heart.classList.add("bg-heart");
    
    heart.innerText = simbolos[Math.floor(Math.random() * simbolos.length)];
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.fontSize = Math.random() * 20 + 15 + "px";
    
    const duracao = Math.random() * 4 + 4;
    heart.style.animationDuration = duracao + "s";
    heart.style.opacity = Math.random() * 0.5 + 0.3;

    container.appendChild(heart);

    setTimeout(() => {
      heart.remove();
    }, duracao * 1000);
  }, 300);
}

// Inicia os corações de fundo assim que o DOM carregar
window.addEventListener("DOMContentLoaded", criarCoracoesDeFundo);
