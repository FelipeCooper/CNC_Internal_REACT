import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import '../style/style.css';
import Header from '../components/Header';
import CNC from '../../services/CNC';
import Getter from '../../services/Getter';
export default class Mostrar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dados: [],
      titulo: ''
    }
    this.setMonth = this.setMonth.bind(this);
  }
  async componentDidMount() {
    let autentication = await Getter.autentication();
    this.setState({ estado: autentication.resultado, setor_id: autentication.setor_id });
    this.setState({ dados: await CNC(this.state.setor_id, this.state.data_inicio, this.state.data_fim) });
    this.setState({ titulo: 'CADASTROS DO SETOR' });
    console.log(this.state)
  }
  async setMonth(ev) {
    let mes = ev.target.value.split('-');
    this.setState({ data_inicio: await new Date(mes[0], mes[1] - 1, 1).toISOString().slice(0, 10).replace(/-/g, '/') });
    this.setState({ data_fim: await new Date(mes[0], mes[1], 0).toISOString().slice(0, 10).replace(/-/g, '/') });
    this.setState({ dados: await CNC(this.state.setor_id, this.state.data_inicio, this.state.data_fim) });
  }
  render() {
    if (this.state.estado == 'NaoAutorizado') {
      return (<Redirect to='acessoNegado' />)
    } else {
      return (
        <div id="sectioncnc" className="sectioncnc">
          <Header titulo={this.state.titulo}></Header>
          <section>
            <div className="tbl-header">
              <table cellPadding="0" cellSpacing="0" border="0">
                <thead>
                  <tr>
                    <th style={{ width: '65px' }}>Data</th>
                    <th style={{ width: '65px' }}>Franquia</th>
                    <th style={{ width: '65px' }}>Setor</th>
                    <th style={{ width: '65px' }}>Motivo </th>
                    <th style={{ width: '65px' }}>Sub-motivo </th>
                    <th style={{ width: '65px' }}>Condominio</th>
                    <th style={{ width: '65px' }}>Responsavel</th>
                    <th style={{ width: '300px' }}>Observaçoes</th>
                  </tr>
                </thead>
              </table>
            </div>
            <div className="tbl-content">
              <table cellPadding="0" cellSpacing="0" border="0">
                <tbody id='cnc-tblcontent'>
                  {this.state.dados.map(dado => {
                    return (
                      <tr>
                        <td style={{ width: '65px' }} > {dado.data}  </td>
                        <td style={{ width: '65px' }} > {dado.franquia}  </td>
                        <td style={{ width: '65px' }} > {dado.setor}  </td>
                        <td style={{ width: '65px' }} > {dado.motivo}  </td>
                        <td style={{ width: '65px' }} > {dado.submotivo}  </td>
                        <td style={{ width: '65px' }} > {dado.condominio}  </td>
                        <td style={{ width: '65px' }} > {dado.responsavel}  </td>
                        <td style={{ width: '300px' }} > {dado.observacoes}  </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
            <input type="month" id="data" onChange={(ev) => { ev.persist(); this.setMonth(ev); }} className="inputter" />
          </section>
        </div>
      )
    }
  }
}