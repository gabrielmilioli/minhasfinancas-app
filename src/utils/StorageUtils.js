class StorageUtils {

  /* MÉTODOS PADRÕES */
  static _getItem(chave) {
    return JSON.parse(localStorage.getItem(chave));
  };
  static _setItem(chave, item) {
    localStorage.setItem(chave, JSON.stringify(item));
  };

  /* INCLUIR MÉTODOS DE GET E/OU SET ABAIXO */
  static getUsuario() {
    return this._getItem('usuario');
  };
  static setUsuario(item) {
    this._setItem('usuario', item);
  };

}

export default StorageUtils;