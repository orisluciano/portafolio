import Vista from "./vistas/Vista.js";

let vista = new Vista();
vista.cargarFunciones();

getDatos();

 async function getDatos() {
    let algo = await fetch("./js/datos/datos.json");
    console.log(algo.json());
 }