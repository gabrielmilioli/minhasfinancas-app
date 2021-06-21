const ConstantUtils = {
  API_ROOT: 'http://localhost:8080/api',
  MESES: [
    { value: 1, description: 'Janeiro' },
    { value: 2, description: 'Fevereiro' },
    { value: 3, description: 'Março' },
    { value: 4, description: 'Abril' },
    { value: 5, description: 'Maio' },
    { value: 6, description: 'Junho' },
    { value: 7, description: 'Julho' },
    { value: 8, description: 'Agosto' },
    { value: 9, description: 'Setembro' },
    { value: 10, description: 'Outubro' },
    { value: 11, description: 'Novembro' },
    { value: 12, description: 'Dezembro' },
  ],
  ANOS: [
    { value: 2021, description: '2021' },
    { value: 2020, description: '2020' },
    { value: 2019, description: '2019' }
  ],
  TIPOS_LANCAMENTO: [
    { value: 'RECEITA', description: 'Receita' },
    { value: 'DESPESA', description: 'Despesa' },
  ],
  STATUS_LANCAMENTO: [
    { value: 'PENDENTE', description: 'Pendente' },
    { value: 'EFETIVADO', description: 'Efetivado' },
    { value: 'CANCELADO', description: 'Cancelado' },
  ]
};

export default ConstantUtils;