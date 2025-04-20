const frm = document.querySelector("form");
const btnComparar = document.querySelector("#btnComparar");

// Obtém o contexto do canvas fora do evento de submit
const ctx = document.getElementById("grafico1");
let myGrafico; // Variável para armazenar a instância do gráfico
let dadosIniciais = {};
let dadosComparacao = null; // Inicializa como null

// Função para obter os valores dos inputs
function obterValoresInputs() {
  return {
    auditivo: parseInt(document.getElementById("inAuditivo").value),
    visual: parseInt(document.getElementById("inVisual").value),
    tato: parseInt(document.getElementById("inTato").value),
    movimento: parseInt(document.getElementById("inMovimento").value),
    posicao: parseInt(document.getElementById("inPosicao").value),
    oral: parseInt(document.getElementById("inOral").value),
    conduta: parseInt(document.getElementById("inConduta").value),
    socio: parseInt(document.getElementById("inSocio").value),
    atencao: parseInt(document.getElementById("inAtencao").value),
  };
}

// Função para obter a cor com base no valor e categoria
function getColor(value, categoria) {
  let color = "rgba(75, 192, 192, 0.8)"; // Cor padrão

  // Verifica a categoria e atribui a cor correspondente
  if (categoria === "auditivo") {
    if (value <= 2) color = "rgba(255, 251, 0, 0.8)"; // Amarelo
    else if (value <= 9) color = "rgba(255, 165, 0, 0.8)"; // Laranja
    else if (value <= 24) color = "rgba(0, 128, 0, 0.8)"; // Verde
    else if (value <= 31) color = "rgba(255, 0, 0, 0.8)"; // Vermelho claro
    else if (value <= 40) color = "rgba(139, 0, 0, 0.8)"; // Vermelho escuro
  }

  // Verifica a categoria e atribui a cor correspondente
  if (categoria === "visual") {
    if (value <= 4) color = "rgba(255, 251, 0, 0.8)"; // Amarelo
    else if (value <= 8) color = "rgba(255, 165, 0, 0.8)"; // Laranja
    else if (value <= 17) color = "rgba(0, 128, 0, 0.8)"; // Verde
    else if (value <= 21) color = "rgba(255, 0, 0, 0.8)"; // Vermelho claro
    else if (value <= 30) color = "rgba(139, 0, 0, 0.8)"; // Vermelho escuro
  }

  // Verifica a categoria e atribui a cor correspondente
  if (categoria === "tato") {
    if (value === 0) color = "rgba(255, 251, 0, 0.8)"; // Amarelo
    else if (value <= 7) color = "rgba(255, 165, 0, 0.8)"; // Laranja
    else if (value <= 21) color = "rgba(0, 128, 0, 0.8)"; // Verde
    else if (value <= 28) color = "rgba(255, 0, 0, 0.8)"; // Vermelho claro
    else if (value <= 55) color = "rgba(139, 0, 0, 0.8)"; // Vermelho escuro
  }

  // Verifica a categoria e atribui a cor correspondente
  if (categoria === "movimento") {
    if (value <= 1) color = "rgba(255, 251, 0, 0.8)"; // Amarelo
    else if (value <= 6) color = "rgba(255, 165, 0, 0.8)"; // Laranja
    else if (value <= 18) color = "rgba(0, 128, 0, 0.8)"; // Verde
    else if (value <= 24) color = "rgba(255, 0, 0, 0.8)"; // Vermelho claro
    else if (value <= 40) color = "rgba(139, 0, 0, 0.8)"; // Vermelho escuro
  }

  // Verifica a categoria e atribui a cor correspondente
  if (categoria === "posicao") {
    if (value === 0) color = "rgba(255, 251, 0, 0.8)"; // Amarelo
    else if (value <= 4) color = "rgba(255, 165, 0, 0.8)"; // Laranja
    else if (value <= 15) color = "rgba(0, 128, 0, 0.8)"; // Verde
    else if (value <= 19) color = "rgba(255, 0, 0, 0.8)"; // Vermelho claro
    else if (value <= 40) color = "rgba(139, 0, 0, 0.8)"; // Vermelho escuro
  }

  // Verifica a categoria e atribui a cor correspondente
  if (categoria === "oral") {
    if (value <= 7) color = "rgba(255, 165, 0, 0.8)"; // Laranja
    else if (value <= 24) color = "rgba(0, 128, 0, 0.8)"; // Verde
    else if (value <= 32) color = "rgba(255, 0, 0, 0.8)"; // Vermelho claro
    else if (value <= 50) color = "rgba(139, 0, 0, 0.8)"; // Vermelho escuro
  }

  // Verifica a categoria e atribui a cor correspondente
  if (categoria === "conduta") {
    if (value <= 1) color = "rgba(255, 251, 0, 0.8)"; // Amarelo
    else if (value <= 8) color = "rgba(255, 165, 0, 0.8)"; // Laranja
    else if (value <= 22) color = "rgba(0, 128, 0, 0.8)"; // Verde
    else if (value <= 29) color = "rgba(255, 0, 0, 0.8)"; // Vermelho claro
    else if (value <= 45) color = "rgba(139, 0, 0, 0.8)"; // Vermelho escuro
  }

  // Verifica a categoria e atribui a cor correspondente
  if (categoria === "socio") {
    if (value <= 2) color = "rgba(255, 251, 0, 0.8)"; // Amarelo
    else if (value <= 12) color = "rgba(255, 165, 0, 0.8)"; // Laranja
    else if (value <= 31) color = "rgba(0, 128, 0, 0.8)"; // Verde
    else if (value <= 41) color = "rgba(255, 0, 0, 0.8)"; // Vermelho claro
    else if (value <= 70) color = "rgba(139, 0, 0, 0.8)"; // Vermelho escuro
  }

  // Verifica a categoria e atribui a cor correspondente
  if (categoria === "atencao") {
    if (value === 0) color = "rgba(255, 251, 0, 0.8)"; // Amarelo
    else if (value <= 8) color = "rgba(255, 165, 0, 0.8)"; // Laranja
    else if (value <= 24) color = "rgba(0, 128, 0, 0.8)"; // Verde
    else if (value <= 31) color = "rgba(255, 0, 0, 0.8)"; // Vermelho claro
    else if (value <= 50) color = "rgba(139, 0, 0, 0.8)"; // Vermelho escuro
  }

  return color;
}
// Função para criar ou atualizar o gráfico
function atualizarGrafico(dadosIniciais, dadosComparacao) {
  const chaves = [
    "auditivo",
    "visual",
    "tato",
    "movimento",
    "posicao",
    "oral",
    "conduta",
    "socio",
    "atencao",
  ];

  const labels = [
    "Auditivo",
    "Visual",
    "Tato",
    "Movimentos",
    "Posição do Corpo",
    "Oral",
    "Conduta",
    "Socioemocional",
    "Atenção",
  ];

  const datasets = [
    {
      label: "Inicio",
      data: Object.values(dadosIniciais),
      backgroundColor: chaves.map((key, i) =>
        getColor(Object.values(dadosIniciais)[i], key)
      ),
      borderWidth: 1,
    },
  ];

  if (dadosComparacao) {
    datasets.push({
      label: "Final",
      data: Object.values(dadosComparacao),
      backgroundColor: chaves.map((key, i) =>
        getColor(Object.values(dadosComparacao)[i], key)
      ),
    });
  }

  const chartData = {
    labels: labels,
    datasets: datasets,
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    categoryPercentage: 0.8,
    barPercentage: 0.8,
    datasets: { bar: { maxBarThickness: 40 } },
    scales: {
      y: { beginAtZero: true, title: { display: true, text: "Pontuação" } },
      x: { title: { display: !!dadosComparacao, text: "Categoria Sensorial" } },
    },
    plugins: {
      title: { display: true, text: "Perfil Sensorial", font: { size: 20 } },
      legend: { display: !!dadosComparacao },
    },
  };

  let myGrafico = Chart.getChart(ctx); // Tenta obter a instância existente
  if (myGrafico) {
    myGrafico.data = chartData;
    myGrafico.options = chartOptions;
    myGrafico.update();
  } else {
    myGrafico = new Chart(ctx, {
      type: "bar",
      data: chartData,
      options: chartOptions,
    });
  }
}

// Inicializa o gráfico com valores padrão (zero) ao carregar a página
atualizarGrafico(
  {
    auditivo: 0,
    visual: 0,
    tato: 0,
    movimento: 0,
    posicao: 0,
    oral: 0,
    conduta: 0,
    socio: 0,
    atencao: 0,
  },
  null
);

// Adiciona um evento de submit ao formulário para dados iniciais
frm.addEventListener("submit", (e) => {
  e.preventDefault();
  dadosIniciais = obterValoresInputs();

  console.log("Dados Iniciais no Submit:", dadosIniciais); // ADICIONEI ESTA LINHA

  atualizarGrafico(dadosIniciais, dadosComparacao); // Altera o texto do botão de comparação

  btnComparar.innerText =
    dadosComparacao === null ? "Adicionar Comparação" : "Recalcular Comparação";
});

// Adiciona um evento de clique ao botão de comparação
btnComparar.addEventListener("click", () => {
  if (dadosComparacao === null) {
    dadosComparacao = obterValoresInputs();
    btnComparar.innerText = "Recalcular Comparação";
  } else {
    dadosComparacao = obterValoresInputs();
  }
  atualizarGrafico(dadosIniciais, dadosComparacao);
});
