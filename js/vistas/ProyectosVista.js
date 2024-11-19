import UtilesVistas from "./utiles.js";

class ProyectosVista {
    utiles = new UtilesVistas();
    dir = "./html/proyectos.html"
    ids = {
        divProyectos : "divProyectos"
    }
    proyectos = [];
    slideIndex = 1;

    constructor(proyectos) {
        this.proyectos = proyectos;
    }

    async cargarFormulario(){
        let root = document.getElementById(this.utiles.ids.root);
        let res = await fetch(this.dir);
        let archivo = await res.text();
        root.innerHTML = archivo;
        this.mostrarDatos();
    }

    mostrarDatos(){
        let esto = this;
        let root = document.getElementById(this.utiles.ids.root);
        let div = document.createElement("div");
        div.className = "width100 displayFlex contentCenter";
        root.appendChild(div);
        this.proyectos.forEach( e => {
            let id = "div" + e.nombre;
            let caja = document.createElement("div");
            caja.id = id;
            div.appendChild(caja);
            let img = document.createElement("img");
            img.className = "imgProyec margin5";
            img.src = e.img;
            img.onclick = function() {
                esto.mostrarPopup(e.nombre, e.descripcion, e.links);
                esto.cargarCapturas(e.capturas);
            }
            caja.appendChild(img);
        });
    }

    mostrarPopup(nombre, descripcion, links){
        let modal = document.getElementById(this.utiles.ids.modal);
        modal.style.display = "block";
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

    cargarCapturas(capturas){
        let carruselContainer = document.getElementById("carruselContainer");
        carruselContainer.innerHTML = "";
        let containerBtns = document.getElementById("containerBtns");
        containerBtns.innerHTML = "";
        capturas.forEach((c, index) => {
            let d = document.createElement("div");
            d.className = "mySlides fade";
            carruselContainer.appendChild(d);
            let img = document.createElement("img");
            img.src = c;
            img.style.width = "100%";
            d.appendChild(img);
            containerBtns.appendChild(this.crearBotonImagen(index+1));
        });
        this.slideIndex = 1;
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

    crearBotonImagen(index){
        let esto = this;
        let span = document.createElement("span");
        span.className = "dot";
        span.onclick = function() {
            esto.currentSlide(index);
        }
        return span;
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

export default ProyectosVista;