import Admin from "../views/pages/Admin";

const dominio = 'http://localhost:3001/';
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
        let request = await fetch(dominio + 'api/setor/mostrar')
        return await request.json();
    },
    //
    async franquias() {
        let request = await fetch(dominio + 'api/franquia/mostrar')
        return await request.json();
    },
    async autentication() {
        let email = await fetch('./O365.php');
        let verf = await email.text();
        let request = await requester('api/setorMembro/verifica', { email: 'estagiario.consultoria1@grupoembracon.com.br' });
        if (typeof request.resultado != 'undefined') {
            return await requester('api/admin/verifica', { email: 'estagiario.consultoria1@grupoembracon.com.br' });
        } else {
            return request;
        }
    }
}
async function requester(link, body) {
    let request = await fetch(dominio + link, {
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