import SobreMiVista from "./SobreMiVista.js";
import UtilesVistas from "./utiles.js";

class Vista {
    utiles = new UtilesVistas();
    root = document.getElementById(this.utiles.ids.root);
    datos = "";
    botonesIds = [ this.utiles.ids.botones.sobreMi,
        //this.utiles.ids.botones.exp,
        //this.utiles.ids.botones.form,
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
        /*let exp = document.getElementById(this.utiles.ids.botones.exp);
        exp.onclick = function (params) {
            alert("funciona");
            esto.marcarBotones(exp.id);
        }*/
        let proyects = document.getElementById(this.utiles.ids.botones.proyects);
        proyects.onclick = function (params) {
            esto.proyectosVista();
            esto.marcarBotones(proyects.id);
        }
        /*let form = document.getElementById(this.utiles.ids.botones.form);
        form.onclick = function (params) {
            alert("funciona");
            esto.marcarBotones(form.id);
        }*/
    }

    marcarBotones(id){
        this.botonesIds.forEach(e => {
            if (e === id) {
                let marcado = document.getElementById(id);
                marcado.className = "seleccionado marginR60 elementoCentrado";
            } else {
                let noMarcado = document.getElementById(e);
                noMarcado.className = "noSeleccionado marginR60 elementoCentrado";
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
        div.className = "displayFlex contentCenter";
        this.root.appendChild(div);
        let img = document.createElement("img");
        img.src = "./recursos/imagenes/sobremirecortada.jpg";
        img.className = "imgSobreMi";
        div.appendChild(img);
        let texto = document.createElement("div");
        texto.className = "estiloTexto";
        texto.innerHTML = "Hola. Soy Luciano Oris. " + 
        "Soy un programador que busca poner sus herramientas al servicio de los demas. " +
        "Llevo algun tiempo haciendolo y planeo seguir haciendolo por mucho más tiempo.";
        div.appendChild(texto);
    }

    tecnologiasVista(){
        this.vaciarRoot();
        let div = document.createElement("div");
        div.className = "displayFlex estiloTexto";
        this.root.appendChild(div);
        div.innerHTML = "¿Que es lo que hago? " +
        "Ofrezco mis servicios como desarrollador web, donde me ocupo tanto del backend como del frontend. " +
        "Tambien puedo proveer de aplicaciones moviles para dispositivos Android. " +
        "Por ultimo, tambien ofrezco la posibilidad de tener una aplicación de escritorio a medida.";
        let tecnologias = this.datos.tecnologias;
        tecnologias.forEach(e => {
            let span = document.createElement("span");
            div.appendChild(span);
            let icono = document.createElement("img");
            icono.className = "img200 margin5";
            let svg = fetch(e.icono);
            svg.then( s => icono.src = e.icono);
            //icono.innerHTML = e.icono;
            div.appendChild(icono);
            console.log(e.icono);
            /*let nombre = document.createElement("p");
            nombre.innerHTML = e.nombre;
            span.appendChild(nombre);*/
        });
    }

    proyectosVista(){
        this.vaciarRoot();
        let div = document.createElement("div");
        div.className = "displayFlex";
        this.root.appendChild(div);
        let proyectos = this.datos.proyectos;
        proyectos.forEach( e => {
            let caja = document.createElement("div");
            div.appendChild(caja);
            let nombre = document.createElement("h3");
            nombre.innerHTML = e.nombre;
            caja.appendChild(nombre);
            let descripcion = document.createElement("h4");
            descripcion.innerHTML = e.descripcion;
            caja.appendChild(descripcion);
            e.links.forEach(l => {
                let link = document.createElement("a");
                link.innerHTML = l.nombre;
                link.href = l.url;
                link.target = "_blank";
                caja.appendChild(link);
            });
        });
    }
}

export default Vista;