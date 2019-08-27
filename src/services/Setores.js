const Setores = async function (setores) {
    let request = await fetch('http://localhost:3001/api/setores')
    return await request.json();
}
module.exports = Setores;