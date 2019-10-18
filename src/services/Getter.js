import host from './Dev';
const Getter = {
    async motivos(setorId) {
        return requester('api/motivo/setor', { setor_id: setorId })
    },
    //
    async subMotivos(motivoId) {
        return await requester('api/submotivo/motivo', { motivo_id: motivoId });
    },
    //
    async setores() {
        let request = await fetch(host.dominio + 'api/setor/mostrar')
        return await request.json();
    },
    //

    async franquias() {
        let request = await fetch(host.dominio + 'api/franquia/mostrar')
        return await request.json();
    },
    async autentication() {
        let email = await fetch('./O365.php');
        let verf = await email.text();
        if(verf == "desconectado"){
            window.location = '/O365';
        }
        let request = await requester('api/setorMembro/mostrarByEmail', { email: verf});
        if (request.resultado == 'NaoAutorizado') {
            return await requester('api/admin/verifica', { email: verf });
        } else {
            return request;
        }
    },
    async membros(setor_id){
        return await requester('api/setorMembro/mostrarBySetor',{setor_id: setor_id});
    },
    async cadastrarSetorMembro(setorMembro){
        return await requester('api/setorMembro/registrar',setorMembro);
    },
    async deleteSetorMembro(setorMembro){
        return await requester('api/setorMembro/deletar',setorMembro);
    },
    async allMotivos(){
        let request = await fetch(host.dominio + 'api/motivo/mostrar');
        return await request.json()
    },
    async linkarMotivo(body){
        console.log(body)
        return await requester('api/motivo/motivoLinkSetor',body);
    },
    async cadastrarMotivo(body){
        return await requester('api/motivo/cadastrar',body);
    },
    async unlinkMotivo(body){
        return await requester('api/motivo/motivoUnlinkSetor',body);
    }
}
async function requester(link, body) {
    let request = await fetch(host.dominio + link, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify(body)
    })
    return await request.json();
}
export default Getter;