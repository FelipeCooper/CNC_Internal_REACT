import React, { Component } from 'react';
import '../style/style.css';
import Header from './Header';
import Selecter from './Selecter'
const setores = require('../../services/Setores');

export default class Registro extends Component {
    constructor(props) {
        super(props);
        this.state = {
            setores: [],
            motivos: [],
            subMotivos: []
        }
    }
    async componentDidMount() {
        this.setState({ setores: await setores() })
        console.log(this.state.setores);
    }
    render() {
        return (


            <div class="container active" id="cnt-cadastro">
                <Header titulo="Cadastrar Não Conformidade"/>
                <div class="box">
                    <form id='formRegistro'>
                        <Selecter dados={this.state.setores}/>
                        <input class='inputter' type='text' id="condominio" name='condominio' placeholder='Condominio' />
                        <textarea name="obs" id='obs' class="obs" placeholder="Observações"></textarea>
                        <input type='submit' value='Registrar' />
                    </form>
                </div>
            </div>






        )
    }
}