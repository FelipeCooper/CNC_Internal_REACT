const Registrar = async function(setorId, motivoId, submotivoId, condominio, responsavel, responsavelId, obs, setorResponsavel,franquiaId){
    let request = await fetch('http://localhost:3001/api/registrarNC', {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({ 
            setor_id : setorId,
            motivo_id: motivoId,
            submotivo_id: submotivoId,
            condominio: condominio,
            responsavel: responsavel,
            responsavel_id: responsavelId,
            obs: obs,
            setorResponsavel: setorResponsavel,
            franquia_id : franquiaId
         })
    })
    return await request.json();
}
module.exports = Registrar;