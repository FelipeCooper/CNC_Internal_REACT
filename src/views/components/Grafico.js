import React, { Component } from 'react';
import CanvasJSReact from '../../plugin/canvas/canvasjs.react';
const CanvasJSChart = CanvasJSReact.CanvasJSChart;
export default class Grafico extends Component {
    constructor(props){
        super(props);
    }
    render() {
        const dados = this.props.dados;
        const titulo = this.props.titulo;
        const height = this.props.height;
        const options = {
          animationEnabled: true,
          exportEnabled: true,
          height: height,
          theme: "light1", // "light1", "dark1", "dark2"
          title: {
            text: titulo
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