import React, { Component } from "react";
import CanvasJSReact from '../../plugin/canvas/canvasjs.react';
import CNC from '../../services/CNC';
import { Redirect } from 'react-router-dom'
import Getter from '../../services/Getter';
import Grafico from "../components/Grafico";
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default class Graphs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dados: []
    }
    this.render = this.render.bind(this)
    this.setData = this.setData.bind(this);
  }
  async componentDidMount(){
    let autentication = await Getter.autentication();
    this.setState({ estado: autentication.resultado, setor_id: autentication.setor_id });

  }
  async componentWillMount() {
        setInterval(
      async function () {
        let data = await CNC.mostrar(this.state.setor_id, this.state.data_inicio, this.state.data_fim)
        this.setState({ dados: await this.setData(data) });
        console.log(this.state.dados)
      }.bind(this), 5000)
  }
  async setData(data) {
    let setores = data.map(linha => linha.setor);
    let setoresUnicos = [], setoresContagem = [];
    setores.map(setor => {
      let index = setoresUnicos.indexOf(setor)
      if (index === -1) {
        setoresUnicos.push(setor);
        setoresContagem.push(1);
      } else {
        setoresContagem[index] += 1
      }
    })
    data = setoresUnicos.map((setor, i) => {
      return { y: setoresContagem[i], label: setor }
    })
    return data;
  }
  render() {
    if (this.state.estado == 'NaoAutorizado') {
      return (<Redirect to='acessoNegado' />)
    } else {
      return (
        <div>
          <Grafico titulo='Nao Conformidade Mensal' height='600' dados={this.state.dados} />
        </div>
      );
    }
  }
}
