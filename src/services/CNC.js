const CNC = async function (cnc) {
    let request = await fetch('http://localhost:3001/api/cnc/mostrar', {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({ setor_id: cnc.setor_id})
    })
    return await request.json();
}
export default CNC;