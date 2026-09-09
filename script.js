const frasesNao = [
  "Tem certeza?",
  "Pensa bem!",
  "Erro 404: Opção Inválida",
  "Tente novamente!",
  "Nem pense nisso!",
  "Olha o outro botão!",
  "Clica no verde do lado!",
  "Você tá tentando mesmo?",
  "Sem chance!",
  "Acho que sua mão escorregou...",
  "Sistema recusa essa opção!",
  "Não foi dessa vez!",
  "Ops, errou a direção!",
  "Clica no SIM logo ❤️",
  "Resposta incorreta!",
  "Aperte o botão verde!",
  "Tentativa negada com sucesso!",
  "Esse botão é meramente ilustrativo!",
  "Volte duas casas e clique no SIM",
  "Você realmente achou que dava pra clicar aqui?"
];

let contadorNao = 0;

// 1. Data de início da história (16 de Junho de 2026 às 17:00)
const dataInicioHistoria = new Date(2026, 5, 16, 17, 0, 0); 

// 2. Data do SIM oficial
// Exemplo de preenchimento futuro: const dataSimOficial = new Date("2026-09-20T20:15:00");
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
  // Salva no LocalStorage no exato segundo do clique
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
    // Prioridades:
    // 1º Data fixa do GitHub (const dataSimOficial)
    // 2º Data gravada no navegador do celular/PC (localStorage)
    const dataLocalSalva = localStorage.getItem("dataSimLocal");
    const dataEfetiva = dataSimOficial || (dataLocalSalva ? new Date(dataLocalSalva) : null);

    if (dataEfetiva) {
      elNamoro.innerText = calcularTempo(dataEfetiva);
    } else {
      elNamoro.innerText = "Aguardando o SIM... ❤️";
    }
  }
}, 1000);