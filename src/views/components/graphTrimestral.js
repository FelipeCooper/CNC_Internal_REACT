import React, { Component } from "react";
import CanvasJSReact from '../../plugin/canvas/canvasjs.react';
import CNC from '../../services/CNC';
import Getter from '../../services/Getter';
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
  async componentWillMount() {
    let autentication = await Getter.autentication();
    this.setState({ estado: autentication.resultado, setor_id: autentication.setor_id });
    setInterval(
      async function () {
        let data = await CNC(this.state.setor_id, this.state.data_inicio, this.state.data_fim)
        this.setState({ estado: autentication.resultado, setor_id: autentication.setor_id, dados: await this.setData(data) });
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
    const dados = this.state.dados
    const options = {
      animationEnabled: true,
      exportEnabled: true,
      height: 600,
      theme: "light1", // "light1", "dark1", "dark2"
      title: {
        text: "Não Conformidades Mensal"
      },
      data: [{
        type: "pie",
        indexLabel: "{label}: {y}",
        startAngle: -90,
        dataPoints: dados
      }]
    }

    return (
      <div>
        <CanvasJSChart options={options} />
      </div>
    );
  }
}
