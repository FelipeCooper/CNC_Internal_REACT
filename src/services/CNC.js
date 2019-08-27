const CNC = async function (cnc) {
    let request = await fetch('http://localhost:3001/api/mostrar', {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({ usuario: cnc.usuario , setor_id: cnc.setor_id})
    })
    return await request.json();
}
module.exports = CNC;