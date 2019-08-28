const Getter= {
    async motivos (setorId) {
        let request = await fetch('http://localhost:3001/api/motivos', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({ setor_id: setorId})
        })
        return await request.json();
    },
    //
    async subMotivos (motivoId) {
        let request = await fetch('http://localhost:3001/api/submotivos', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({ motivo_id: motivoId })
        })
        return await request.json();
    },
    //
    async setores () {
        let request = await fetch('http://localhost:3001/api/setores')
        return await request.json();
    },
    //
    async franquias(){
        let request = await fetch('http://localhost:3001/api/franquias')
        return await request.json();
    }
}
module.exports = Getter;