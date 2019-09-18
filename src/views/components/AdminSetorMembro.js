import React, { useState, useEffect } from 'react';
import Selecter from '../components/Selecter';
import SelecterUser from '../components/SelecterUser';
import Getter from '../../services/Getter';

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
        <div className='box' style={{ margin: '10px', width: '250px', height: '200px' }}>
            <center>
                <h2>Setor Membros</h2>
                <table className='noBorder'>
                    <tr>
                        <td style={{ width: '95%' }}><Selecter dados={setores} functionName={(ev) => { handleChangeSetores(ev.target) }} /></td>
                    </tr>
                    <tr>
                        <td style={{ width: '95%' }}><SelecterUser dados={users} functionName={(ev) => { handleChangeUsers(ev.target) }} /></td>
                        <td><a className='btn-delete' href="#" onClick={(ev) => { handleDeleteUser(ev) }}></a></td>
                    </tr>
                    {
                        cadastro.add === false ? null :
                            <tbody>
                                <tr>
                                    <td style={{ width: '95%' }}><input className='inputter' onChange={(ev) => { setCadastro({ ...cadastro, nome: ev.target.value }) }} placeholder="Nome" required /></td>
                                </tr>
                                <tr>
                                    <td style={{ width: '95%' }}><input className='inputter' onChange={(ev) => { setCadastro({ ...cadastro, email: ev.target.value }) }} placeholder="Email" required /></td>
                                </tr>
                                <tr>
                                    <td style={{ width: '95%' }}><button onClick={(ev) => { handleSubmitForm(ev) }} >Cadastrar</button></td>
                                </tr>
                            </tbody>
                    }
                </table>
            </center>
        </div >
    )
}