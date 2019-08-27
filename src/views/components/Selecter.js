import React, { Component } from 'react';
export default class Selecter extends Component {

    render() {
        return (
            <div>
                <select>
                    {this.props.dados.map( dado =>{
                        return <option id ={dado.id}>{dado.titulo}</option>
                    })}
                </select>
            </div>
        )
    }
}