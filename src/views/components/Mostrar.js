import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import '../style/style.css';
import Header from './Header';
import CNC from '../../services/CNC';
import Getter from '../../services/Getter';
export default class Mostrar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dados: [],
      titulo: ''
    }
  }
  async componentDidMount() {
    let autentication = await Getter.autentication();
    console.log(autentication);
    this.setState({ estado: autentication.estado })
    this.setState({ dados: await CNC({ setor_id: autentication.setor_id }) })
    this.setState({ titulo: 'CADASTROS DO SETOR' })
  }
  render() {
    if (this.state.estado == 'naoAutorizado') {
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
            <input type="month" id="data" className="inputter" />
          </section>
        </div>
      )
    }
  }
}