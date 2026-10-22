// Dados dos 20 alunos extraídos da planilha
const studentData = [
  { uso: 'copia_alteracoes', compreensao: 'Dificuldade para explicar' },
  { uso: 'copia_sem_alteracoes', compreensao: 'Dificuldade para explicar' },
  { uso: 'apenas_duvidas', compreensao: 'Compreendo boa parte' },
  { uso: 'escrevo_proprias', compreensao: 'Compreendo algumas partes' },
  { uso: 'escrevo_proprias', compreensao: 'Compreendo boa parte' },
  { uso: 'copia_alteracoes', compreensao: 'Compreendo boa parte' },
  { uso: 'copia_alteracoes', compreensao: 'Compreendo algumas partes' },
  { uso: 'escrevo_proprias', compreensao: 'Compreendo boa parte' },
  { uso: 'copia_alteracoes', compreensao: 'Compreendo boa parte' },
  { uso: 'escrevo_proprias', compreensao: 'Compreendo muito bem' },
  { uso: 'nao_utiliza', compreensao: 'Não utiliza' },
  { uso: 'copia_alteracoes', compreensao: 'Compreendo algumas partes' },
  { uso: 'escrevo_proprias', compreensao: 'Compreendo boa parte' },
  { uso: 'nao_utiliza', compreensao: 'Não utiliza' },
  { uso: 'escrevo_proprias', compreensao: 'Compreendo boa parte' },
  { uso: 'apenas_duvidas', compreensao: 'Dificuldade para explicar' },
  { uso: 'copia_alteracoes', compreensao: 'Não se preocupa' },
  { uso: 'copia_alteracoes', compreensao: 'Compreendo boa parte' },
  { uso: 'apenas_duvidas', compreensao: 'Compreendo algumas partes' },
  { uso: 'escrevo_proprias', compreensao: 'Não se preocupa' }
];

let pieChart, barChart;

window.onload = function() {
  // Gráfico de Pizza
  const ctxPie = document.getElementById('chartPie').getContext('2d');
  pieChart = new Chart(ctxPie, {
    type: 'pie',
    data: {
      labels: [
        'Copio c/ alterações',
        'Uso como base / Reescrevo',
        'Apenas p/ dúvidas',
        'Não utilizo IA',
        'Copio s/ alterações'
      ],
      datasets: [{
        data: [7, 7, 3, 2, 1],
        backgroundColor: ['#42a5f5', '#66bb6a', '#ffa726', '#bdbdbd', '#ef5350']
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { position: 'bottom', labels: { boxWidth: 12, font: { size: 10 } } }
      }
    }
  });

  // Gráfico de Barras
  const ctxBar = document.getElementById('chartBar').getContext('2d');
  barChart = new Chart(ctxBar, {
    type: 'bar',
    data: {
      labels: [
        'Muito Bem',
        'Boa Parte',
        'Algumas Partes',
        'Dificuldade p/ Explicar',
        'Não se Preocupa'
      ],
      datasets: [{
        label: 'Nº de Alunos',
        data: [1, 8, 4, 3, 2],
        backgroundColor: '#5c6bc0'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: { beginAtZero: true, ticks: { stepSize: 1 } }
      },
      plugins: {
        legend: { display: false }
      }
    }
  });

  updateDashboard();
};

function updateDashboard() {
  const selectedFilter = document.getElementById('useFilter').value;
  
  let filtered = studentData;
  if (selectedFilter !== 'todos') {
    filtered = studentData.filter(d => d.uso === selectedFilter);
  }

  const counts = {
    'Compreendo muito bem': 0,
    'Compreendo boa parte': 0,
    'Compreendo algumas partes': 0,
    'Dificuldade para explicar': 0,
    'Não se preocupa': 0
  };

  filtered.forEach(d => {
    if (counts[d.compreensao] !== undefined) {
      counts[d.compreensao]++;
    }
  });

  barChart.data.datasets[0].data = [
    counts['Compreendo muito bem'],
    counts['Compreendo boa parte'],
    counts['Compreendo algumas partes'],
    counts['Dificuldade para explicar'],
    counts['Não se preocupa']
  ];
  barChart.update();

  const textElem = document.getElementById('hypothesisText');
  if (selectedFilter === 'todos') {
    textElem.innerHTML = "<b>Análise Geral:</b> Apenas 1 aluno entre os 20 domina perfeitamente o assunto (5%). A maior parte da turma compreende apenas parcialmente.";
  } else if (selectedFilter === 'copia_alteracoes' || selectedFilter === 'copia_sem_alteracoes') {
    textElem.innerHTML = "<b>Hipótese Confirmada!</b> Ao filtrar por alunos que apenas copiam as respostas (com ou sem alterações), <b>nenhum aluno alcança o nível 'Compreendo Muito Bem'</b>, demonstrando baixa retenção autônoma do conteúdo.";
  } else if (selectedFilter === 'escrevo_proprias') {
    textElem.innerHTML = "<b>Uso Ativo:</b> Alunos que utilizam a IA como base e reescrevem com as próprias palavras apresentam a maior taxa de retenção e compreensão profunda do conteúdo.";
  } else {
    textElem.innerHTML = "<b>Uso Específico:</b> Alunos que usam a IA apenas para tirar dúvidas demonstram compreensão parcial, sem abandono do esforço de estudo.";
  }
}