import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import Grafico from '../components/Grafico';
import Selecter from '../components/Selecter';
import SelecterUser from '../components/SelecterUser';
import Getter from '../../services/Getter';
import Header from '../components/Header';
export default function Admin() {
    const [setores, setSetores] = useState([]);
    const [users, setUsers] = useState([]);
    useEffect(async () => {
        setSetores(await Getter.setores());
        console.log(setores)
    }, [])
    async function handleChangeSetores(ev){
        setUsers(await Getter.membros(ev.value))
        console.log(users+' : '+ ev.value);
    }
    async function addUser(){
        return null;
    }

    return (
        <div className="container active" id="cnt-cadastro">
            <Header titulo='Painel de Admin' />
            <div className='box' style={{ margin: '10px', width: '200px', height: '400px' }}>
                <Grafico titulo='batata' height='200' dados={[{ y: 3, label: 'teste' }]} />
            </div>
            <div className='box' style={{ margin: '10px', width: '200px', height: '400px' }}>
                <h2>Usuario</h2>
                <Selecter dados={setores} functionName={(ev)=>{handleChangeSetores(ev.target)}} />
                <SelecterUser dados={users} functionName={(ev)=>{handleChangeUsers(ev.target)}} />
            </div>
        </div>
    )
}
