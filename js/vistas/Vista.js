import ProyectosVista from "./ProyectosVista.js";
import SobreMiVista from "./SobreMiVista.js";
import UtilesVistas from "./utiles.js";

class Vista {
    utiles = new UtilesVistas();
    root = document.getElementById(this.utiles.ids.root);
    modal = document.getElementById(this.utiles.ids.modal);
    datos = "";
    botonesIds = [ this.utiles.ids.botones.sobreMi,
        this.utiles.ids.botones.proyects
    ];
    slideIndex = 1;

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
        let proyects = document.getElementById(this.utiles.ids.botones.proyects);
        proyects.onclick = function (params) {
            esto.proyectosVista();
            esto.marcarBotones(proyects.id);
        }
    }

    marcarBotones(id){
        this.botonesIds.forEach(e => {
            if (e === id) {
                let marcado = document.getElementById(id);
                marcado.className = "letraMenu seleccionado marginLeft30 marginRight30 elementoCentrado";
            } else {
                let noMarcado = document.getElementById(e);
                noMarcado.className = "letraMenu noSeleccionado marginLeft30 marginRight30 elementoCentrado";
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
        let sobreMi = new SobreMiVista();
        sobreMi.cargarFormulario();
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
            div.appendChild(icono);
            console.log(e.icono);
        });
    }

    proyectosVista(){
        let esto = this;
        this.vaciarRoot();
        let div = document.createElement("div");
        div.className = "displayFlex";
        this.root.appendChild(div);
        this.llenarModal();
        let pVista = new ProyectosVista(this.datos.proyectos);
        pVista.cargarFormulario();
    }

    mostrarPopup(nombre, descripcion, links, capturas) {
        this.modal.style.display = "block";
        let hNombre = document.getElementById("nombreProyecto");
        hNombre.innerHTML = nombre;
        let hDesc = document.getElementById("descripcionProyecto");
        hDesc.innerHTML = descripcion;
        let dLinks = document.getElementById("linksProyectos");
        dLinks.innerHTML = "";
        links.forEach(l => {
            let link = document.createElement("a");
            link.innerHTML = l.nombre;
            link.href = l.url;
            link.target = "_blank";
            dLinks.appendChild(link);
        });
    }

    async crearPopup(padre){
        let dir = "./html/modalProyecto.html";
        let res = await fetch(dir);
        let archivo = await res.text();
        let div = document.createElement("div");
        div.innerHTML = archivo;
        padre.appendChild(div);
    }

    async llenarModal(){
        let dir = "./html/modalProyecto.html";
        let res = await fetch(dir);
        let archivo = await res.text();
        this.modal.innerHTML = "";
        this.modal.innerHTML = archivo;
        this.funcionesModal();
        this.cargarCarrusel();
    }

    asignarFuncionPopup(nombre, descripcion, links){
        let esto = this;
    }

    funcionesModal(){
        let esto = this;
        let btnCerrar = document.getElementById("btnCerrar");
        btnCerrar.onclick = function() {
            esto.modal.style.display = "none";
        }
    }

    async cargarCarrusel(){
        let dir = "./html/carruselImagenes.html";
        let res = await fetch(dir);
        let archivo = await res.text();
        let carrusel = document.getElementById("carruselImg");
        carrusel.innerHTML = "";
        carrusel.innerHTML = archivo;
    }

    cargarCapturas(capturas){
        let carruselContainer = document.getElementById("carruselContainer");
        carruselContainer.innerHTML = "";
        capturas.forEach(c => {
            let d = document.createElement("div");
            d.className = "mySlides fade";
            carruselContainer.appendChild(d);
            let img = document.createElement("img");
            img.src = c;
            img.style.width = "100%";
            d.appendChild(img);
        });
        let slideIndex
        this.showSlides(1);
        this.cargarBotonesCapturas(carruselContainer);
    }

    cargarBotonesCapturas(container){
        let esto = this;
        let antes = document.createElement("a");
        antes.innerHTML = "<"
        antes.className = "prev";
        antes.onclick = function() {
            esto.plusSlides(-1);
        }
        container.appendChild(antes);
        let siguientes = document.createElement("a");
        siguientes.innerHTML = ">"
        siguientes.className = "next";
        siguientes.onclick = function() {
            esto.plusSlides(1);
        }
        container.appendChild(siguientes);
    }

    plusSlides(n) {
        this.showSlides(this.slideIndex += n);
    }
      
    currentSlide(n) {
        this.showSlides(this.slideIndex = n);
    }
      
    showSlides(n) {
        let i;
        let slides = document.getElementsByClassName("mySlides");
        let dots = document.getElementsByClassName("dot");
        if (n > slides.length) {this.slideIndex = 1}    
        if (n < 1) {this.slideIndex = slides.length}
        for (i = 0; i < slides.length; i++) {
          slides[i].style.display = "none";  
        }
        for (i = 0; i < dots.length; i++) {
          dots[i].className = dots[i].className.replace(" active", "");
        }
        slides[this.slideIndex-1].style.display = "block";  
        dots[this.slideIndex-1].className += " active";
    }
}

export default Vista;