import React, { useState, useEffect } from 'react';
import Selecter from '../components/Selecter';
import Getter from '../../services/Getter';

export default function SetorMembro() {
    const [setores, setSetores] = useState([]);
    const [motivos, setMotivos] = useState([]);
    const [submotivos, setSubmotivos] = useState([]);
    const [Controll, setControll] = useState({ newMotivo: false, newSub: false, addMotivo: false, addSub: false })
    useEffect(async () => {
        setSetores(await Getter.setores())
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
    return (
        <div className='box' style={{ margin: '10px', width: '250px', height: '200px' }}>
            <center>
                <h2>Motivos</h2>
                <table>
                    <tr>
                        <td style={{ width: '88%' }}><Selecter dados={setores} functionName={(ev) => { handleChangeSetores(ev.target) }} /></td>
                    </tr>
                    <tr>
                        <td style={{ width: '88%', margin: '0px', border: '0px' }}><Selecter dados={motivos} functionName={(ev) => { handleChangeMotivos(ev.target) }} add={true} /></td>
                        <td><a className='btn-add' href="#" ></a></td>
                        <td><a className='btn-delete' href="#" ></a></td>
                    </tr>
                    {Controll.addMotivo == false ?
                        <tr>
                            <td style={{ width: '88%' }}><Selecter dados={submotivos} functionName={(ev) => { handleChangeSubmotivos(ev.target) }} add={true} /></td>
                            <td><a className='btn-add' href="#" ></a></td>
                            <td><a className='btn-delete' href="#" ></a></td>
                        </tr> :<>
                        <tr>
                            <td style={{ width: '88%' }}><input className='inputter' onChange={(ev) => { setControll({ ...Controll, titulo: ev.target.value }) }} placeholder="Titulo" required /></td>
                        </tr>
                        <tr>
                            <td style={{ width: '88%' }}><button >Cadastrar</button></td>
                        </tr></>    
                     }
                </table>
            </center>
        </div>
    )
}