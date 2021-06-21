import ApiService from './ApiService';

class LancamentoService extends ApiService {
  constructor() {
    super('lancamentos');
  }

  salvar(params) {
    if (params.id) {
      return this.put(params.id, params);
    }
    return this.post('', params);
  }

  buscar(params) {
    return this.get('', params);
  }

  saldo(id) {
    return this.get(id + '/saldo');
  }

  atualizaStatus(id, params) {
    return this.put(id + '/atualiza-status', params);
  }

  deletar(id) {
    return this.delete(id);
  }

  validar(item) {
    if (!item || !item.descricao || !item.mes || !item.ano || item.valor === null
      || item.valor === undefined || !item.tipo || !item.usuario) {
      return false;
    }

    return true;
  }
}

export default LancamentoService;