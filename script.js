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

let donutChart, barChart;

window.onload = function() {
  // Gráfico de Rosca (Donut)
  const ctxDonut = document.getElementById('chartDonut').getContext('2d');
  donutChart = new Chart(ctxDonut, {
    type: 'doughnut',
    data: {
      labels: [
        'Copio c/ alterações',
        'Reescrevo autoralmente',
        'Apenas p/ dúvidas',
        'Não utilizo',
        'Cópia direta'
      ],
      datasets: [{
        data: [7, 7, 3, 2, 1],
        backgroundColor: ['#4318ff', '#6ad2ff', '#ffb800', '#e0e5f2', '#ff5630'],
        borderWidth: 0
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { position: 'bottom' }
      },
      cutout: '65%'
    }
  });

  // Gráfico de Barras Horizontais
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
        label: 'Alunos',
        data: [1, 8, 4, 3, 2],
        backgroundColor: '#4318ff',
        borderRadius: 8
      }]
    },
    options: {
      indexAxis: 'y', // Define o gráfico como horizontal
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: { beginAtZero: true, ticks: { stepSize: 1 } }
      },
      plugins: { legend: { display: false } }
    }
  });

  updateAnalysis('todos');
};

function setFilter(filterValue, element) {
  document.querySelectorAll('.btn-filter').forEach(btn => btn.classList.remove('active'));
  element.classList.add('active');
  updateAnalysis(filterValue);
}

function updateAnalysis(selectedFilter) {
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

  const insightElem = document.getElementById('insightText');
  if (selectedFilter === 'todos') {
    insightElem.innerHTML = "<b>Visão Geral:</b> Dos 20 alunos, 90% utilizam a IA de alguma forma[cite: 1]. Porém, apenas 1 aluno (5%) afirma ter compreensão total da matéria[cite: 1].";
  } else if (selectedFilter === 'copia_alteracoes' || selectedFilter === 'copia_sem_alteracoes') {
    insightElem.innerHTML = "<b>Resultado Chave:</b> Alunos que apenas copiam as respostas (com ou sem alterações) não atingem o nível máximo de compreensão[cite: 1]. A maioria fica retida em apenas entender partes do conteúdo[cite: 1].";
  } else if (selectedFilter === 'escrevo_proprias') {
    insightElem.innerHTML = "<b>Melhor Prática:</b> O grupo que usa a IA como apoio e reescreve o conteúdo com as próprias palavras é o único onde há relatos de domínio completo do assunto[cite: 1].";
  } else {
    insightElem.innerHTML = "<b>Uso Pontual:</b> O uso da IA focado em sanar dúvidas pontuais demonstra uma retenção intermediária, sem prejuízo direto à tentativa de aprender[cite: 1].";
  }
}