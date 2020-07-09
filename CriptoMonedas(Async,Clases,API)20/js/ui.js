
class Interfaz {

    //Creas un constructor para mandarl a llamar en la misma clase
    constructor() {
        this.iniciaMetodo();
       
    }

    iniciaMetodo(){
        this.construirSelect();
    }
    
    //Metodo para construir el select
    construirSelect(){
        cotizador.obtenerMonedasAPI()
        .then(monedas =>{
        
            //Crear un select de opciones
            const select = document.getElementById("criptomoneda");

            //Iterar por los resultados de la api
            for( const [key, value] of Object.entries(monedas.monedas.Data) ){
                //Añadir el symbol y el nombre como opciones al select
                const opcion = document.createElement("option");
                //value.Symbol es el valor dentro del objeto
                opcion.value = value.Symbol;
                opcion.appendChild(document.createTextNode(value.CoinName));
                select.appendChild(opcion);

            }
        })
    }

    monstrarMensaje(mensaje,clases){
        const div = document.createElement("div");
        div.className=clases;
        div.appendChild(document.createTextNode(mensaje));
        
        
        //Seleccionar donde se insertara el mensaje
        const divMensajes = document.querySelector(".mensajes");
        divMensajes.appendChild(div);
        
        //Elimina el mensaje seleccionado la clase .mensajes y el div que se creo arriba
        setTimeout(()=>{
            document.querySelector(".mensajes div").remove();
        },5000)
    }

    //Imprime el resultado de la cotizacion de la criptomoneda
    mostrarResultado(resultado,moneda, crypto){

        //En caso de un resultado anterior ocultarlo
        const resultadoAnterior = document.querySelector("#resultado > div");
        if(resultadoAnterior){
            resultadoAnterior.remove();
        }
        //Para acceder a los valores del resultado mas especificamente y hacerlo para cualquier tipo que seleccionen en el form
        let datosMoneda = resultado[crypto][moneda];

        //Recortar los digitos del precio a 2
        let precio = datosMoneda.PRICE.toFixed(2);
        let porcentaje = datosMoneda.CHANGEPCTDAY.toFixed(2);
        //Para transformar la fecha de la api a tipo dd/mm/aaaa
        let actualizado = new Date(datosMoneda.LASTUPDATE * 1000).toLocaleDateString("es-MX");

        console.log(datosMoneda);
        //Construir el template
        let templateHTML = `
            <div class="card bg-warning">
                <div class="card-body text light">
                    <h2 class="card-title">Resultado</h2>
                    <p>El precio de ${datosMoneda.FROMSYMBOL} a la moneda ${datosMoneda.TOSYMBOL} es de:$ ${precio}</p>
                    <p>La variacion del dia es de: % ${porcentaje}</p>
                    <p>La ultima actualizacion fue el:  ${actualizado}</p>
                    
                </div>
            </div>
        `;

        //Mandar a llamar mostrarSpinner cuando se muestre el resultado
        this.mostratOcultarSpinner("block");
        
        
        //Insertar el resultado
        setTimeout(()=>{
            document.getElementById("resultado").innerHTML=templateHTML;
            this.mostratOcultarSpinner("none");
        },3000)
        
    }

    //Mostrar spinner de carga al enviar cotizacion
    mostratOcultarSpinner(vista){
        const spinner = document.querySelector(".contenido-spinner");
        spinner.style.display = vista;
        
        
    }
}