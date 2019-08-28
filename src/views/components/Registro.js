import React, { Component } from 'react';
import '../style/style.css';
import Header from './Header';
import Selecter from './Selecter'
const Setores = require('../../services/Setores');
const Motivos = require('../../services/Motivos');

export default class Registro extends Component {
    constructor(props) {
        super(props);
        this.state = {
            setores: [],
            motivos: [],
            subMotivos: []
        }
        this.motivos = this.motivos.bind(this)
    }
    async componentDidMount() {
        this.setState({ setores: await Setores() })
    }
    async motivos(ev){
        console.log(ev.target.value)
        this.setState({motivos: await Motivos('motivos', ev.target.value)});
    }
    render() {
        return (


            <div className="container active" id="cnt-cadastro">
                <Header titulo="Cadastrar Não Conformidade"/>
                <div className="box">
                    <form id='formRegistro'>
                        <Selecter dados={this.state.setores} functionName={this.motivos}/>
                        <Selecter dados={this.state.motivos} functionName={this.motivos}/>
                        <input className='inputter' type='text' id="condominio" name='condominio' placeholder='Condominio' />
                        <textarea name="obs" id='obs' className="obs" placeholder="Observações"></textarea>
                        <input type='submit' value='Registrar' />
                    </form>
                </div>
            </div>






        )
    }
}