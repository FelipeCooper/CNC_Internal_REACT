const CNC = async function (setor_id, dataInicio, dataFim) {
    let date = new Date();
    if (dataInicio == null || dataFim == null) {
        dataInicio = new Date(date.getFullYear(), date.getMonth(), 1).toISOString().slice(0, 10).replace(/-/g, '/');
        dataFim = new Date(date.getFullYear(), date.getMonth() + 1, 0).toISOString().slice(0, 10).replace(/-/g, '/');
    }
    let request = await fetch('http://localhost:3001/api/cnc/mostrar', {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({ setor_id: setor_id, data_start: dataInicio, data_end: dataFim })
    })
    return await request.json();
}
export default CNC;