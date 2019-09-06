import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import Header from './Header';
export default class Admin extends Component {
    render() {
        return (
            <div className="container active" id="cnt-cadastro">
                <Header />
                <div className='box' style={{width:'10%', height:'20%' }}> 
                    <h2>Beleza</h2>
                </div>
                <div className='box'> 
                    <h2>ata</h2>
                </div>
                <div className='box'> 
                    <h2>ata</h2>
                </div>
            </div>
        )
    }
}