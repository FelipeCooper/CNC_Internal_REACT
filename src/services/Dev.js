const dev = true;
let host;
if (dev) {
    host = {
        dominio :"http://localhost:3001/"
    }
} else {
    host = {
        dominio : ""
    }
}
export default host;

