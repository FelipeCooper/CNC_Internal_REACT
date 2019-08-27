import React, { Component } from 'react';
export default class Header extends Component {

    render() {
        return (
            <div>
                <ul class="menu">
                    <li title="home"><a class="menu-button home">menu</a></li>
                    <li title="Pesquisar NC"><a onclick="redirecionaMostrar()" class="search">Pesquisar NC</a></li>
                    <li title="Cadastro de Franquias"><a href="registrar" class="pencil">Cadastro de Nao Conformidade</a></li>
                </ul>
                <ul class="menu-bar open">
                    <li><a class="menu-button">{this.props.titulo}</a></li>
                </ul>
            </div>
        )
    }
}