import host from "./Dev";
const CNC = {
    async mostrar (setor_id, dataInicio, dataFim) {
    let date = new Date();
    if (dataInicio == null || dataFim == null) {
        dataInicio = new Date(date.getFullYear(), date.getMonth(), 1).toISOString().slice(0, 10).replace(/-/g, '/');
        dataFim = new Date(date.getFullYear(), date.getMonth() + 1, 0).toISOString().slice(0, 10).replace(/-/g, '/');
    }
    let request = await fetch(host.dominio + 'api/cnc/mostrar', {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({ setor_id: setor_id, data_start: dataInicio, data_end: dataFim })
    })
    return await request.json();
},
async deleteNC(id){
    let request = await fetch(host.dominio + 'api/cnc/deletar', {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "DELETE",
        body: JSON.stringify({id: id})
    })
    return await request.json();
},
}
export default CNC;