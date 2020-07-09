class API {
    constructor(apiKEY) {
        this.apiKEY = apiKEY;
    }
    
    //Obtener las monedas
    async obtenerMonedasAPI(){
        const url = `https://min-api.cryptocompare.com/data/all/coinlist?api_key=${this.apiKEY}`;


        //fetch a la API
        //Retorna la respuesta o el URL
        const urlObtenerMonedas = await fetch(url);

        //monedas devuelve un json con los datos
        const monedas = await urlObtenerMonedas.json();


        //Necesitas retornar en tipo objeto la respuesta
        return {monedas};
    }

    async obtenerValores(monedaAconvertir, criptomoneda){
        const url =`https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${monedaAconvertir}`;

        const urlObtenerValores = await fetch(url);

        const valores = await urlObtenerValores.json();

        return {valores};
    }
}