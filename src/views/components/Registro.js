import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import '../style/style.css';
import Header from './Header';
import Selecter from './Selecter'
import Getter from '../../services/Getter';
import Registrar from '../../services/Registrar';

export default class Registro extends Component {
    constructor(props) {
        super(props);
        this.state = {
            setores: [],
            motivos: [],
            subMotivos: []
        }
        this.Refsubmotivos = React.createRef();
        this.Refmotivos = React.createRef();
        //binds//
        this.motivos = this.motivos.bind(this);
        this.submotivos = this.submotivos.bind(this);
        this.registrar = this.registrar.bind(this)
    }
    async componentDidMount() {
        let autentication = await Getter.autentication();
        this.setState({ estado: autentication.resultado })
        this.setState({ setores: await Getter.setores() })
        this.setState({ responsavel: autentication.nome })
        this.setState({ responsavel_id: autentication.id })
        this.setState({ setorResponsavel: autentication.setor_id })
    }
    async motivos(ev) {
        let setorId = ev.target.value
        this.Refsubmotivos.current.selectedIndex = 0;
        this.Refmotivos.current.selectedIndex = 0;
        this.setState({ setor_id: setorId })
        this.setState({ motivos: await Getter.motivos(setorId), motivo_id: null, submotivo_id: null });
        if (setorId == 16) {
            this.setState({ franquias: await Getter.franquias() })
        } else {
            this.setState({ franquia_id: null, franquias: undefined });
        }
    }
    async submotivos(ev) {
        this.setState({ motivo_id: ev.target.value })
        this.Refsubmotivos.current.selectedIndex = 0;
        this.setState({ subMotivos: await Getter.subMotivos(ev.target.value), submotivo_id: null });
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
        ev.preventDefault();
        let st = this.state;
        let result = await Registrar(st.setor_id, st.motivo_id, st.submotivo_id, st.condominio, st.responsavel, st.responsavel_id, st.obs, st.setorResponsavel, st.franquia_id)
        console.log(result.resultado)
        if(result.resultado){
            window.location.reload();
            return(
                alert('Registrado com sucesso!')
            )
        }else{
            alert('Houve algum problema, tente novamente')
        }
    }
    franquia(franquias) {
        if (typeof franquias != 'undefined') {
            return (<Selecter dados={this.state.franquias} functionName={(ev) => { ev.persist(); this.handleFranquiaChange(ev) }} />)
        } else { return null; }
    }
    render() {
        if (this.state.estado == 'NaoAutorizado') {
            return (<Redirect to='/acessoNegado' />)
        } else {
            return (
                <div className="container active" id="cnt-cadastro">
                    <Header titulo="Cadastrar Não Conformidade" />
                    <div className="box">
                        <form onSubmit={(ev) => { ev.persist(); this.registrar(ev)}}>
                            <input className='inputter' type='text' onChange={(ev => { ev.persist(); this.handleCondominioChange(ev) })} placeholder='Condominio'  required/>
                            <Selecter dados={this.state.setores} functionName={this.motivos} />
                            {this.franquia(this.state.franquias)}
                            <Selecter dados={this.state.motivos} refer={this.Refmotivos} functionName={(ev) => { ev.persist(); this.submotivos(ev) }} />
                            <Selecter dados={this.state.subMotivos} refer={this.Refsubmotivos} functionName={(ev) => { ev.persist(); this.handleSubmotivoChange(ev) }} />
                            <textarea className="obs" onChange={(ev => { ev.persist(); this.handleObsChange(ev) })} placeholder="Observações"></textarea>
                            <input  type='submit' value='Registrar'  required/>
                        </form>
                    </div>
                </div>
            )
        }
    }
}