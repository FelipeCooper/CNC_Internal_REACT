import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import Grafico from '../components/Grafico';
import Selecter from '../components/Selecter';
import Getter from '../../services/Getter';
import Header from '../components/Header';
export default function Admin() {
    const [franquias, setFranquias] = useState([]);
    const [users, setUsers] = useState([]);
    useEffect(async () => {
        setFranquias(await Getter.franquias())
    }, [])
    return (
        <div className="container active" id="cnt-cadastro">
            <Header titulo='Painel de Admin' />
            <div className='box' style={{ margin: '10px', width: '200px', height: '400px' }}>
                <Grafico titulo='batata' height='200' dados={[{ y: 3, label: 'teste' }]} />
            </div>
            <div className='box' style={{ margin: '10px', width: '200px', height: '400px' }}>
                <h2>Usuario</h2>
                <Selecter dados={franquias} />
                <Selecter dados={user} />
            </div>
        </div>
    )
}
