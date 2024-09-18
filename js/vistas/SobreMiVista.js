import UtilesVistas from "./utiles.js";

class SobreMiVista {
    utiles = new UtilesVistas();
    constructor() {
        
    }
    cargarFormulario(){
        let root = document.getElementById(this.utiles.ids.root);
        root.innerHTML = "Soy un programador que busca poner mis herramientas al servicio de los demas."
    }
}

export default SobreMiVista;