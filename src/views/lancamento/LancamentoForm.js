import React from 'react';
import { Col, Form, Button, Modal, InputGroup, Badge } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import LancamentoService from '../../services/LancamentoService';
import Select from '../../directives/Select';
import ConstantUtils from '../../utils/ConstantUtils';
import StorageUtils from '../../utils/StorageUtils';
import NotificationUtils from '../../utils/NotificationUtils';
import ModalConfirm from '../../directives/ModalConfirm';

class LancamentoForm extends React.Component {

  constructor(props) {
    super(props);

    this.show = props.show || false;
    this.onClose = props.onClose;

    this.service = new LancamentoService();
    this.usuarioLogado = StorageUtils.getUsuario();

    this.select = {
      mes: ConstantUtils.MESES,
      ano: ConstantUtils.ANOS,
      tipo: ConstantUtils.TIPOS_LANCAMENTO
    };
  }

  state = {
    show: this.show,
    item: {},
    modalConfirmarRemover: false,
    itemToDelete: {},
    editando: false,
    title: 'Adicionando lançamento',
    formInvalido: false
  };

  static getDerivedStateFromProps (props, state) {
    if (props.show !== state.show) {
      return { show: props.show };
    }

    if (props.item !== state.item) {
      const item = props.item || {};
      return {
        item: item || {},
        editando: !!item.id,
        title: (!!item.id ? 'Editando' : 'Adicionando') + ' lançamento'
      };
    }
    
    return null;
  }

  salvar = () => {
    const item = this.state.item;
    item.usuario = this.usuarioLogado.id;

    if (!this.service.validar(item)) {
      this.setState({ formInvalido: true });
      return;
    }

    this.setState({ formInvalido: false });

    this.service.salvar(item)
      .then(response => {
        NotificationUtils.show('success', 'O lançamento foi ' + (this.state.editando ? 'alterado' : 'adicionado') + '.');
        this.close();
      }).catch(error => {
        NotificationUtils.show('error', error);
      });
  };

  deletar = () => {
    this.service.deletar(this.state.itemToDelete.id)
      .then(response => {
        NotificationUtils.show('success', 'O lançamento ' + this.state.itemToDelete.descricao + ' foi removido.');
        this.close();
      }).catch(error => {
        NotificationUtils.show('error', error);
      });

    this.setState({
      modalConfirmarRemover: false,
      itemToDelete: {}
    });
  };

  openModalConfirm = () => {
    this.setState({
      modalConfirmarRemover: true,
      itemToDelete: this.state.item
    });
  };

  close = () => {
    if (this.onClose) {
      this.onClose();
    }
  }

  onChangeCampo = (e) => {
    let value = e.target.value;
    const name = e.target.name;
    const item = this.state.item || {};
    item[name] = value;
    this.setState({ item: item });
  };

  render() {
    return (
      <>
        <ModalConfirm title="Confirmar exclusão"
          show={this.state.modalConfirmarRemover}
          onConfirm={this.deletar}>
          Deseja realmente remover o lançamento?
        </ModalConfirm>

        <Modal show={this.state.show} size="lg" onHide={this.close}>
          <Form validated={this.state.formInvalido}>
            <Modal.Header closeButton>
              <Modal.Title as="h5">{this.state.title}</Modal.Title>
              {this.state.editando &&
                <Badge pill variant="secondary" className="modal-header-badge">{this.state.item.status}</Badge>
              }
            </Modal.Header>
            <Modal.Body>
              <Form.Row>
                <Form.Group as={Col} controlId="fgDescricao">
                  <Form.Label>Descrição</Form.Label>
                  <Form.Control type="text" placeholder="Descrição" name="descricao"
                    onChange={this.onChangeCampo}
                    value={this.state.item.descricao}
                    required={true}
                    isInvalid={this.state.formInvalido} />
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col} controlId="fgMes">
                  <Form.Label>Mês</Form.Label>
                  <Select placeholder="Mês" name="mes"
                    onChange={this.onChangeCampo} value={this.state.item.mes}
                    required={true}
                    values={this.select.mes}
                    isInvalid={this.state.formInvalido} />
                </Form.Group>
                <Form.Group as={Col} controlId="fgAno">
                  <Form.Label>Ano</Form.Label>
                  <Select placeholder="Ano" name="ano"
                    onChange={this.onChangeCampo} value={this.state.item.ano}
                    required={true}
                    values={this.select.ano}
                    isInvalid={this.state.formInvalido} />
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col} controlId="fgValor">
                  <Form.Label>Valor</Form.Label>
                  <InputGroup>
                    <InputGroup.Prepend>
                      <InputGroup.Text>R$</InputGroup.Text>
                    </InputGroup.Prepend>
                    <Form.Control type="text" placeholder="Valor" name="valor"
                      pattern="[+-]?\d+(?:[.,]\d+)?"
                      className="text-right"
                      onChange={this.onChangeCampo}
                      value={this.state.item.valor}
                      required={true}
                      isInvalid={this.state.formInvalido} />
                  </InputGroup>
                </Form.Group>
                <Form.Group as={Col} controlId="fgTipo">
                  <Form.Label>Tipo</Form.Label>
                  <Select placeholder="Tipo" name="tipo"
                    onChange={this.onChangeCampo} value={this.state.item.tipo}
                    required={true}
                    values={this.select.tipo}
                    isInvalid={this.state.formInvalido} />
                </Form.Group>
              </Form.Row>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="primary" className="primary" onClick={this.salvar}>
                Salvar
              </Button>
              {this.state.editando &&
                <Button variant="danger" onClick={this.openModalConfirm}>
                  Remover
                </Button>
              }
              <Button variant="link" className="primary-text" onClick={this.close}>
                Cancelar
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>
      </>
    );
  }
}

export default withRouter(LancamentoForm);