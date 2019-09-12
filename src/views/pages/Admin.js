import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import Grafico from '../components/Grafico';
import SetorMembroADM from '../components/AdminSetorMembro';
import Header from '../components/Header';
export default function Admin() {
    return (
        <div className="container active" id="cnt-cadastro">
            <Header titulo='Painel de Admin' />
            <div className='box' style={{ margin: '10px', width: '200px', height: '400px' }}>
                <Grafico titulo='batata' height='200' dados={[{ y: 3, label: 'teste' }]} />
            </div>
            <SetorMembroADM />
           
        </div>
    )
}
