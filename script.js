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
  // Gráfico 1: Rosca
  const ctxDonut = document.getElementById('chartDonut').getContext('2d');
  donutChart = new Chart(ctxDonut, {
    type: 'doughnut',
    data: {
      labels: [
        'Copio c/ alterações',
        'Reescrevo autoralmente',
        'Apenas p/ dúvidas',
        'Não utilizo IA',
        'Cópia direta'
      ],
      datasets: [{
        data: [7, 7, 3, 2, 1],
        backgroundColor: ['#2563eb', '#06b6d4', '#f59e0b', '#94a3b8', '#ef4444'],
        borderWidth: 0
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { position: 'bottom', labels: { boxWidth: 10, font: { size: 10 } } } },
      cutout: '60%'
    }
  });

  // Gráfico 2: Barras
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
        backgroundColor: '#2563eb',
        borderRadius: 6
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: { y: { beginAtZero: true, ticks: { stepSize: 1 } } },
      plugins: { legend: { display: false } }
    }
  });
};

function setFilter(filterValue, element) {
  document.querySelectorAll('.btn-filter').forEach(btn => btn.classList.remove('active'));
  element.classList.add('active');

  let filtered = studentData;
  if (filterValue !== 'todos') {
    filtered = studentData.filter(d => d.uso === filterValue);
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

  // Atualização dinâmica dos textos de hipótese e conclusão
  const hypElem = document.getElementById('hypothesisText');
  
  if (filterValue === 'todos') {
    hypElem.innerHTML = "Ao acionar os filtros, observa-se que a hipótese está <strong>parcialmente correta</strong>. No geral, apenas 1 aluno (5%) compreende muito bem o conteúdo.";
  } else if (filterValue === 'copia_alteracoes' || filterValue === 'copia_sem_alteracoes') {
    hypElem.innerHTML = "<strong>Hipótese Confirmada para este filtro!</strong> Alunos que apenas copiam as respostas (com ou sem alterações) não atingem a compreensão 'Muito bem'.";
  } else if (filterValue === 'escrevo_proprias') {
    hypElem.innerHTML = "<strong>Hipótese Refutada para uso ativo!</strong> Ao filtrar quem reescreve com as próprias palavras, identificamos o único aluno com compreensão total do conteúdo.";
  } else {
    hypElem.innerHTML = "<strong>Uso Pontual:</strong> Alunos que utilizam a IA apenas para sanar dúvidas apresentam retenção intermediária.";
  }
}