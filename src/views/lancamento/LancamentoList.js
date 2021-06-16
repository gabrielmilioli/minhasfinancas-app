import React from 'react';
import { BsTrash, BsPencil } from 'react-icons/bs';
import { Card, Form, Button, Table, Badge, OverlayTrigger, Tooltip, Container } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import LancamentoService from '../../services/LancamentoService';
import ConstantUtils from '../../utils/ConstantUtils';
import StorageUtils from '../../utils/StorageUtils';
import NotificationUtils from '../../utils/NotificationUtils';
import NumberUtils from '../../utils/NumberUtils';
import Select from '../../directives/Select';
import ModalConfirm from '../../directives/ModalConfirm';
import Tramitar from '../../directives/Tramitar';
import LancamentoForm from '../../views/lancamento/LancamentoForm';

class LancamentoList extends React.Component {

  constructor() {
    super();
    this.service = new LancamentoService();
    this.columns = [
      { label: 'Código', model: 'id', show: true },
      { label: 'Descrição', model: 'descricao', show: true },
      { label: 'Mês/Ano', model: 'mes', show: true },
      { label: 'Valor', subLabel: 'R$', model: 'valor', show: true },
      { label: 'Usuário', model: 'usuario', show: true },
      { label: 'Status', model: 'status', show: true }
    ];
    this.params = {};
    this.usuarioLogado = StorageUtils.getUsuario();
    this.select = {
      mes: ConstantUtils.MESES,
      status: ConstantUtils.STATUS_LANCAMENTO
    };
  }

  state = {
    descricao: '',
    mes: '',
    items: [],
    modalConfirmarRemover: false,
    modalAdicionar: false,
    itemToManipulate: {}
  };

  buscar = () => {
    const params = {
      descricao: this.state.descricao,
      mes: this.state.mes,
      usuario: this.usuarioLogado.id
    };

    this.service.buscar(params)
      .then(response => {
        this.setState({ items: response.data });
      }).catch(error => {
        NotificationUtils.show('error', error);
      });
  };

  componentDidMount() {
    this.buscar();
  }

  onChangeDescricao = (e) => {
    this.setState({ descricao: e.target.value });
  };

  onChangeMes = (e) => {
    this.setState({ mes: e.target.value });
  };

  deletar = () => {
    this.service.deletar(this.state.itemToManipulate.id)
      .then(response => {
        NotificationUtils.show('success', 'O lançamento ' + this.state.itemToManipulate.descricao + ' foi removido.');
        this.onCloseModalConfirm();
        this.buscar();
      }).catch(error => {
        NotificationUtils.show('error', error);
      });
  };

  tramitar = (item, status) => {
    this.service.atualizaStatus(item.id, { status: status.value })
      .then(response => {
        NotificationUtils.show('success', 'O lançamento ' + item.descricao + ' foi tramitado.');
        this.buscar();
      }).catch(error => {
        NotificationUtils.show('error', error);
      });
  };

  openModalConfirm = (item) => {
    this.setState({
      modalConfirmarRemover: true,
      itemToManipulate: item
    });
  };

  openModalAdicionar = (item) => {
    this.setState({
      modalAdicionar: true,
      itemToManipulate: item
    });
  };

  onCloseModalAdicionar = () => {
    this.setState({
      modalAdicionar: false,
      itemToManipulate: {}
    });
    this.buscar();
  };

  onCloseModalConfirm = () => {
    this.setState({
      modalConfirmarRemover: false,
      itemToManipulate: {}
    });
  };

  render() {
    return (
      <>
        <ModalConfirm title="Confirmar exclusão"
          show={this.state.modalConfirmarRemover}
          onConfirm={this.deletar}>
          Deseja realmente remover o lançamento?
        </ModalConfirm>

        <LancamentoForm item={this.state.itemToManipulate}
          show={this.state.modalAdicionar} onClose={this.onCloseModalAdicionar} />

        <Card>
          <Card.Header as="h5">Lançamentos</Card.Header>
          <Card.Body>
            <Form noValidate>
              <Form.Group controlId="fgDescricao">
                <Form.Label>Descrição</Form.Label>
                <Form.Control type="text" placeholder="Filtrar pela descrição"
                  onChange={this.onChangeDescricao} />
              </Form.Group>
              <Form.Group controlId="fgMes">
                <Form.Label>Mês</Form.Label>
                <Select placeholder="Mês"
                  onChange={this.onChangeMes}
                  value={this.state.mes}
                  values={this.select.mes} />
              </Form.Group>
            </Form>
          </Card.Body>
          <Card.Footer>
            <Button variant="primary" className="primary" onClick={this.buscar}>Buscar</Button>
            <Button variant="link" className="primary-text" onClick={this.limpar}>Limpar filtros</Button>
            <Button variant="primary" className="float-right primary" onClick={() => this.openModalAdicionar()}>Adicionar</Button>
          </Card.Footer>
        </Card>

        <Container fluid className="list-container">
          <>
            {!this.state.items.length ?
              <h5 className="text-center">Nenhum item encontrado</h5>
              :
              <Table hover>
                <thead>
                  <tr>
                    {this.columns.map((column, index) => (
                      column.show &&
                      <th key={index}>{column.label}
                        {column.subLabel && <small className="text-muted"> ({column.subLabel})</small>}
                      </th>
                    ))}
                    <th style={{ width: '120px' }}></th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.items.map((item, index) => (
                    <tr key={index}>
                      <td><Badge pill variant="primary" className="full-width primary">{item.id}</Badge></td>
                      <td>{item.descricao} <Badge pill variant="secondary">{item.tipo}</Badge></td>
                      <td>{item.mes}/{item.ano}</td>
                      <td>{NumberUtils.format(item.valor)}</td>
                      <td>{item.usuario.nome}</td>
                      <td>
                        {item.status === 'EFETIVADO' && <Badge pill variant="success">{item.status}</Badge>}
                        {item.status === 'CANCELADO' && <Badge pill variant="danger">{item.status}</Badge>}
                        {item.status === 'PENDENTE' && <Badge pill variant="secondary">{item.status}</Badge>}
                      </td>
                      <td>
                        <OverlayTrigger placement="bottom"
                          overlay={<Tooltip>Tramitar</Tooltip>}>
                          <Tramitar item={item}
                            values={this.select.status}
                            onTramitar={this.tramitar}>
                          </Tramitar>
                        </OverlayTrigger>
                        <OverlayTrigger placement="bottom"
                          overlay={<Tooltip>Editar</Tooltip>}>
                          <Button size="sm" className="primary-text" variant="link" onClick={() => this.openModalAdicionar(item)}>
                            <BsPencil />
                          </Button>
                        </OverlayTrigger>
                        <OverlayTrigger placement="bottom"
                          overlay={<Tooltip>Remover</Tooltip>}>
                          <Button size="sm" className="primary-text" variant="link" onClick={() => this.openModalConfirm(item)}>
                            <BsTrash />
                          </Button>
                        </OverlayTrigger>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            }
          </>
        </Container>
      </>
    );
  }
}

export default withRouter(LancamentoList);