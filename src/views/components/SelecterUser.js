import React, { Component } from 'react';
export default class SelecterUser extends Component {

    render() {
        return (
            <div>
                <select ref={this.props.refer} className="inputter" onChange={this.props.functionName} required>
                    <option value='' disabled selected>Selecione uma opção</option>
                    {this.props.dados.map(dado => {
                        return <option key={dado.id} value={dado.id}> {dado.email}</option>
                    })}
                    <option value='add'>ADICIONAR MEMBRO AO SETOR</option>
                </select>
            </div>
        )
    }
}