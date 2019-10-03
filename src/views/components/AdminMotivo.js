import React, { useState, useEffect } from 'react';
import Selecter from '../components/Selecter';
import Getter from '../../services/Getter';
import { async } from 'q';

export default function SetorMembro() {
    const [setores, setSetores] = useState([]);
    const [motivos, setMotivos] = useState([]);
    const [submotivos, setSubmotivos] = useState([]);
    const [todosMotivos,setTodosMotivos] = useState([])
    const [Controll, setControll] = useState({ newMotivo: false, newSub: false, addMotivo: false, addSub: false })
    useEffect(async () => {
        setSetores(await Getter.setores())
        setTodosMotivos(await Getter.allMotivos())
    }, [])
    async function handleChangeSetores(ev) {
        let result = await Getter.motivos(ev.value);
        setMotivos(result);
        setControll({ ...Controll, setor_id: ev.value });
    }
    async function handleChangeMotivos(ev) {
        ev.value === 'add' ? setControll({ ...Controll, addMotivo: true }) : setControll({ ...Controll, motivo_id: ev.value })
        setSubmotivos(await Getter.subMotivos(ev.value));
    }
    async function handleChangeSubmotivos(ev) {
        ev.value === 'add' ? setControll({ ...Controll, addSub: true }) : setControll({ ...Controll, submotivo_id: ev.value })
    }
    async function handleSubmitMotivo(ev) {
        ev.preventDefault();
        let request = await Getter.cadastrarMotivo(Controll);
        request.result ? alert('Motivo registrado com sucesso') : alert('Erro ao registrar motivo');
    }
    async function handleChangeNewMotivo(ev){
        ev.value === 'add' ? setControll({ ...Controll, newMotivo: true }) : setControll({ ...Controll, motivo_id: ev.value })
    }
    async function handleSubmitNewMotivo(ev){
        ev.preventDefault();
        let request = await Getter.linkarMotivo(Controll);
        console.log(request)
        request.result ? alert('Motivo registrado com sucesso') : alert('Erro ao registrar motivo');
    }
    async function handleUnlinkMotivo(ev){
        let request = await Getter.unlinkMotivo(Controll);
        request.result ? alert('Motivo removido') :  alert("Problema ao remover");
    }
    return (
        <div className='box' style={{ margin: '10px', width: '250px', height: '200px' }}>
            <center>
                <h2>Motivos</h2>
                <table className='noBorder' cellspacing="0" cellpadding="0">
                    <tr>
                        <td style={{ width: '95%' }}><Selecter dados={setores} functionName={(ev) => { handleChangeSetores(ev.target) }} /></td>
                    </tr>
                    <tr>
                        <td  style={{ width: '95%', margin: '0px', border: '0px' }}><Selecter dados={motivos} functionName={(ev) => { handleChangeMotivos(ev.target) }} add={true} /></td>
                        <td><a className='btn-delete' href="#" ></a></td>
                    </tr>
                    {Controll.addMotivo == false ?
                        <tr>
                            <td style={{ width: '95%' }}><Selecter dados={submotivos} functionName={(ev) => { handleChangeSubmotivos(ev.target) }} add={true} /></td>
                            <td><a className='btn-delete' href="#" onClick={(ev)=>{handleUnlinkMotivo(ev.target)}} ></a></td>
                        </tr> :
                        <tr>
                            <td style={{ width: '95%', margin: '0px', border: '0px' }}><Selecter dados={todosMotivos} functionName={(ev) => { handleChangeNewMotivo(ev.target) }} add={true} /></td>
                            <td><a className='btn-add' href="#" onClick={(ev)=>{handleSubmitNewMotivo(ev)}} ></a></td>
                        </tr>
                    }
                    {Controll.newMotivo === true ?
                        <>
                            <tr>
                                <td style={{ width: '95%' }}><input className='inputter' onChange={(ev) => { setControll({ ...Controll, titulo: ev.target.value }) }} placeholder="Titulo" required /></td>
                            </tr>
                            <tr>
                                <td style={{ width: '95%' }} ><button onClick={(ev) => { handleSubmitMotivo(ev) }} >Cadastrar</button></td>
                            </tr>
                        </>   : null
                }

                </table>
            </center>
        </div>
    )
}