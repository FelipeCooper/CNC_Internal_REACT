import React, { Component } from 'react';
export default class Selecter extends Component {

    render() {
        return (
            <div>
                <select className="inputter" onChange={this.props.functionName}>
                    {this.props.dados.map( dado =>{
                        return <option key={dado.id} value={dado.id}> {dado.titulo}</option>
                    })}
                </select>
            </div>
        )
    }
}