import React, { Component } from 'react';
export default class Header extends Component {

    render() {
        return (
            <div>
                <ul className="menu">
                    <li title="home"><a className="menu-button home">menu</a></li>
                    <li title="Pesquisar NC"><a href='/' className="search">Pesquisar NC</a></li>
                    <li title="Cadastro de Franquias"><a href="registrar" className="pencil">Cadastro de Nao Conformidade</a></li>
                </ul>
                <ul className="menu-bar open">
                    <li><a className="menu-button">{this.props.titulo}</a></li>
                </ul>
            </div>
        )
    }
}