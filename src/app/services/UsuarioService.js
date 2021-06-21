import ApiService from './ApiService';

class UsuarioService extends ApiService {
  constructor() {
    super('usuarios');
  }

  salvar(params) {
    return this.post('', params);
  }

  autenticar(params) {
    return this.post('autenticar', params);
  }

  saldo(id) {
    return this.get(id + '/saldo');
  }
}

export default UsuarioService;