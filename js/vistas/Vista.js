import SobreMiVista from "./SobreMiVista.js";
import UtilesVistas from "./utiles.js";

class Vista {
    utiles = new UtilesVistas();
    root = document.getElementById(this.utiles.ids.root);
    datos = "";

    constructor(parameters) {    
    }

    cargarFunciones() {
        let esto = this;
        this.cargaDatos();
        let mi = document.getElementById(this.utiles.ids.botones.sobreMi);
        mi.onclick = function (params) {
            esto.sobreMiVista();
        }
        let tecs = document.getElementById(this.utiles.ids.botones.tec);
        tecs.onclick = function (params) {
            esto.tecnologiasVista();
        }
        let exp = document.getElementById(this.utiles.ids.botones.exp);
        exp.onclick = function (params) {
            alert("funciona");
        }
        let proyects = document.getElementById(this.utiles.ids.botones.proyects);
        proyects.onclick = function (params) {
            alert("funciona");
        }
        let form = document.getElementById(this.utiles.ids.botones.form);
        form.onclick = function (params) {
            alert("funciona");
        }
    }

    async cargaDatos(){
        let json = await fetch("./js/datos/datos.json");
        this.datos =  await json.json();
    }

    vaciarRoot(){
        this.root.innerHTML = "";
    }

    sobreMiVista(){
        this.vaciarRoot();
        let div = document.createElement("div");
        div.className = "displayFlex margin15";
        this.root.appendChild(div);
        div.innerHTML = "Soy un programador que busca poner mis herramientas al servicio de los demas."
    }

    tecnologiasVista(){
        this.vaciarRoot();
        let div = document.createElement("div");
        div.className = "displayFlex margin15";
        this.root.appendChild(div);
        let tecnologias = this.datos.tecnologias;
        tecnologias.forEach(e => {
            let span = document.createElement("span");
            div.appendChild(span);
            let nombre = document.createElement("p");
            nombre.innerHTML = e.nombre;
            span.appendChild(nombre);
        });
    }
}

export default Vista;