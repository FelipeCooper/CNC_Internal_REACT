import React, { Component } from 'react';
export default class Selecter extends Component {

    render() {
        return (
            <div>
                <select ref={this.props.refer} className="inputter" onChange={this.props.functionName} required>
                    <option value='' disabled selected>Selecione uma opção</option>
                    {this.props.dados.map(dado => {
                        return <option key={dado.id} value={dado.id}> {dado.titulo}</option>
                    })}
                </select>
            </div>
        )
    }
}