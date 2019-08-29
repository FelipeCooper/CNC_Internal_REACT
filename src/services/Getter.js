const dominio = 'http://localhost:3001/';
const Getter = {
    async motivos(setorId) {
        let request = await  requester('api/motivo/setor',{ setor_id: setorId } )
        return await request.json();
    },
    //
    async subMotivos(motivoId) {
        let request = await requester('api/submotivo/motivo',{ motivo_id: motivoId });
        return await request.json();
    },
    //
    async setores() {
        let request = await fetch(dominio+'api/setor/mostrar')
        return await request.json();
    },
    //
    async franquias() {
        let request = await fetch(dominio+'api/franquia/mostrar')
        return await request.json();
    },
    async autentication() {
        let email = await fetch('./O365.php');
        let verf = await email.text();
        let request = await requester('api/setorMembro/mostrarByEmail',{ email: 'estagiario.consultoria1@grupoembracon.com.br' });
        let result = await request.json();
        if (typeof result.result != 'undefined'){
            return(JSON.parse('{ "setor_id":null, "estado":"naoAutorizado"}'))
        }else{
            return result;
        }
    }
}
async function requester(link,body){
    return await fetch(dominio+link, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify(body)
    })
}
export default Getter;