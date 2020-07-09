//Instancias GLOBALES
const cotizador = new API("f87c8858ad0617b0bdfee892ea677097a3f17468d7d85889fd3041536385d957");
const ui = new Interfaz();


//Variables
const formulario = document.getElementById("formulario");
const moneda = document.getElementById("moneda");
const criptomoneda = document.getElementById("criptomoneda");

//Event listener
formulario.addEventListener("submit", (e)=>{
    e.preventDefault();
    const monedaSeleccionada = moneda.options[moneda.selectedIndex].value;
    const criptoSeleccionada = criptomoneda.options[criptomoneda.selectedIndex].value;

    console.log(monedaSeleccionada);
    console.log(criptoSeleccionada);

    if(monedaSeleccionada === "" || criptoSeleccionada === ""){
        //Mensaje cuando este vacio
        ui.monstrarMensaje("Rellena los campos","alert bg-danger text-center");
    } else{
        ui.mostratOcultarSpinner();
        cotizador.obtenerValores(monedaSeleccionada,criptoSeleccionada)
                    .then((valores)=>{
                    ui.mostrarResultado(valores.valores.RAW, monedaSeleccionada, criptoSeleccionada);
            })
    }
});
//Funciones