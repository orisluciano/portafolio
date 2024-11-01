import UtilesVistas from "./utiles.js";

class SobreMiVista {
    utiles = new UtilesVistas();
    dir = "./html/sobreMi.html";
    constructor() {
        
    }
    async cargarFormulario(){
        let root = document.getElementById(this.utiles.ids.root);
        let res = await fetch(this.dir);
        let archivo = await res.text();
        root.innerHTML = archivo;
    }
}

export default SobreMiVista;