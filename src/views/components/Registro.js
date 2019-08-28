import React, { Component } from 'react';
import '../style/style.css';
import Header from './Header';
import Selecter from './Selecter'
const Getter = require('../../services/Getter');
const Registrar = require('../../services/Registrar');
//const Autentication = require('../../services/Autentication');

export default class Registro extends Component {
    constructor(props) {
        super(props);
        this.state = {
            setores: [],
            motivos: [],
            subMotivos: []
        }
        this.motivos = this.motivos.bind(this);
        this.submotivos = this.submotivos.bind(this);
        this.registrar = this.registrar.bind(this)
    }
    async componentDidMount() { 
        let autentication = await Getter.autentication();
        this.setState({ setores: await Getter.setores() })
        this.setState({ responsavel: autentication.nome })
        this.setState({ responsavel_id: autentication.id })
        this.setState({ setorResponsavel: autentication.setor_id })
    }
    async motivos(ev) {
        let setorId = ev.target.value
        this.setState({ setor_id: setorId })
        this.setState({ motivos: await Getter.motivos(setorId) });
        if (setorId == 16) {
            this.setState({ franquias: await Getter.franquias() })
        } else {
            this.setState({ franquia_id: null, franquias: undefined });
        }
    }
    async submotivos(ev) {
        this.setState({ motivo_id: ev.target.value })
        this.setState({ subMotivos: await Getter.subMotivos(ev.target.value) });
    }
    handleSubmotivoChange(ev) {
        this.setState({ submotivo_id: ev.target.value })
    }
    handleObsChange(ev) {
        this.setState({ obs: ev.target.value })
    }
    handleCondominioChange(ev) {
        this.setState({ condominio: ev.target.value })
    }
    handleFranquiaChange(ev) {
        this.setState({ franquia_id: ev.target.value })
    }
    async registrar(ev) {
        let st = this.state;
        let result = await Registrar(st.setor_id, st.motivo_id, st.submotivo_id, st.condominio, st.responsavel, st.responsavel_id, st.obs, st.setorResponsavel, st.franquia_id)
        console.log(result)
    }
    franquia(franquias) {
        if (typeof franquias != 'undefined') {
            return (
                <Selecter dados={this.state.franquias} functionName={(ev) => { ev.persist(); this.handleFranquiaChange(ev) }} />
            )
        } else {
            return null;
        }
    }
    render() {
        return (
            <div className="container active" id="cnt-cadastro">
                <Header titulo="Cadastrar Não Conformidade" />
                <div className="box">
                    <form>
                        <input className='inputter' type='text' onChange={(ev => { ev.persist(); this.handleCondominioChange(ev) })} placeholder='Condominio' />
                        <Selecter dados={this.state.setores} functionName={this.motivos} />
                        {this.franquia(this.state.franquias)}
                        <Selecter dados={this.state.motivos} functionName={(ev) => { ev.persist(); this.submotivos(ev) }} />
                        <Selecter dados={this.state.subMotivos} functionName={(ev) => { ev.persist(); this.handleSubmotivoChange(ev) }} />
                        <textarea className="obs" onChange={(ev => { ev.persist(); this.handleObsChange(ev) })} placeholder="Observações"></textarea>
                        <input type='submit' value='Registrar' onClick={(ev) => { ev.persist(); this.registrar(ev) }} />
                    </form>
                </div>
            </div>
        )
    }
}