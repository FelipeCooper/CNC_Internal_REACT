import React, { Component } from 'react';
import '../style/style.css';
import Header from './Header';
const CNC = require('../../services/CNC');
export default class Mostrar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dados: [],
      titulo: ''
    }
  }
  async componentDidMount() {
    this.setState({ dados: await CNC({ usuario: 'usuario', setor_id: 1 }) })
    this.setState({titulo: 'CADASTROS DO SETOR: '+ this.state.dados[0].setorResponsavel})
    console.log(this.state.dados);
  }
  render() {
    return (
      <div id="sectioncnc" class="sectioncnc">
        <Header titulo={this.state.titulo}></Header>
        <section>
          <div class="tbl-header">
            <table cellpadding="0" cellspacing="0" border="0">
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
          <div class="tbl-content">
            <table cellpadding="0" cellspacing="0" border="0">
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
          <input type="month" id="data" class="inputter" />
        </section>
      </div>
    )
  }
}