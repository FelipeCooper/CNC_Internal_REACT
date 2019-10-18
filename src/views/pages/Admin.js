import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import Grafico from '../components/Grafico';
import SetorMembroADM from '../components/AdminSetorMembro';
import MotivosAdmin from '../components/AdminMotivo';
import Header from '../components/Header';
import Getter from '../../services/Getter';
export default function Admin() {
    const [estado,setEstado] = useState();
    useEffect(async ()=>{
        let result = await Getter.autentication();
        setEstado(result.resultado)
        console.log(result)
    },[])
    if (estado == 'NaoAutorizado' || estado == "user") {
        return (<Redirect to='acessoNegado' />)
    } else {
        return (
            <div className="container active" id="cnt-cadastro">
                <Header titulo='Painel de Admin' />
                <div style={{ marginTop: '60px' }}>
                    <SetorMembroADM />
                    <MotivosAdmin />
                </div>
            </div>
        )
    }
}
