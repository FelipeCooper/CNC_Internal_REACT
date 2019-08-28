const Motivos = async function (url,setorId) {
    let request = await fetch('http://localhost:3001/api/'+url, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({ setor_id: setorId})
    })
    return await request.json();
}
module.exports = Motivos;