import React, { useState, useEffect } from 'react';
import Selecter from '../components/Selecter';
import SelecterUser from '../components/SelecterUser';
import Getter from '../../services/Getter';
import { async } from 'q';

export default function SetorMembro() {
    const [setores, setSetores] = useState([]);
    const [users, setUsers] = useState([]);
    const [cadastro, setCadastro] = useState({ add: false, setor_id: null, setorMembro_id: null });
    useEffect(async () => {
        setSetores(await Getter.setores());
        console.log(setores)
    }, [])
    async function handleChangeSetores(ev) {
        setUsers(await Getter.membros(ev.value))
        setCadastro({ ...cadastro, setor_id: ev.value });
    }
    async function handleChangeUsers(ev) {
        ev.value === 'add' ? setCadastro({ ...cadastro, add: true }) : setCadastro({ ...cadastro, setorMembro_id: ev.value, add: false })
    }
    async function handleSubmitForm(ev) {
        ev.preventDefault();
        Getter.cadastrarSetorMembro(cadastro) != null ? alert('Cadastrado com sucesso') : alert('Erro ao cadastrar');
        window.location.reload();
    }
    async function handleDeleteUser(ev) {
        ev.preventDefault();
        let request = await Getter.deleteSetorMembro(cadastro);
        request.result ? alert('Deletado com sucesso') : alert('Erro ao deletar');
        window.location.reload();
    }
    return (
        <div className='box' style={{ margin: '10px', width: '200px', height: '400px' }}>
            <center>
                <h2>Setor Membros</h2>
                <Selecter dados={setores} functionName={(ev) => { handleChangeSetores(ev.target) }} />
                <SelecterUser dados={users} functionName={(ev) => { handleChangeUsers(ev.target) }} />
                {
                    cadastro.add == false ?
                        <button onClick={(ev) => { handleDeleteUser(ev) }}>Deletar Usuario</button> :
                        <form onSubmit={(ev) => { handleSubmitForm(ev) }}>
                            <input className='inputter' onChange={(ev) => { setCadastro({ ...cadastro, nome: ev.target.value }) }} placeholder="Nome" required />
                            <input className='inputter' onChange={(ev) => { setCadastro({ ...cadastro, email: ev.target.value }) }} placeholder="Email" required />
                            <button>Cadastrar</button>
                        </form>
                }
            </center>
        </div>
    )
}