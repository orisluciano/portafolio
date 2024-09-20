import SobreMiVista from "./SobreMiVista.js";
import UtilesVistas from "./utiles.js";

class Vista {
    utiles = new UtilesVistas();
    root = document.getElementById(this.utiles.ids.root);
    datos = "";
    botonesIds = [ this.utiles.ids.botones.sobreMi,
        this.utiles.ids.botones.exp,
        this.utiles.ids.botones.form,
        this.utiles.ids.botones.proyects,
        this.utiles.ids.botones.tec
    ];

    constructor(parameters) {    
    }

    cargarFunciones() {
        let esto = this;
        this.cargaDatos();
        let mi = document.getElementById(this.utiles.ids.botones.sobreMi);
        mi.onclick = function (params) {
            esto.sobreMiVista();
            esto.marcarBotones(mi.id);
        }
        let tecs = document.getElementById(this.utiles.ids.botones.tec);
        tecs.onclick = function (params) {
            esto.tecnologiasVista();
            esto.marcarBotones(tecs.id);
        }
        let exp = document.getElementById(this.utiles.ids.botones.exp);
        exp.onclick = function (params) {
            alert("funciona");
            esto.marcarBotones(exp.id);
        }
        let proyects = document.getElementById(this.utiles.ids.botones.proyects);
        proyects.onclick = function (params) {
            alert("funciona");
            esto.marcarBotones(proyects.id);
        }
        let form = document.getElementById(this.utiles.ids.botones.form);
        form.onclick = function (params) {
            alert("funciona");
            esto.marcarBotones(form.id);
        }
    }

    marcarBotones(id){
        this.botonesIds.forEach(e => {
            if (e === id) {
                let marcado = document.getElementById(id);
                marcado.className = "seleccionado marginR60";
            } else {
                let noMarcado = document.getElementById(e);
                noMarcado.className = "noSeleccionado marginR60";
            }
        });
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