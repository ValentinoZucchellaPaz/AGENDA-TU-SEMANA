class MonthPrice {
    constructor(cantidad){
        this.month = parseInt(cantidad);
        this.monthPrice = 3000;
        this.price = this.month * this.monthPrice;
    }

    discount() {
        if (this.month >= 3  && this.month <=12) {
            const discountPercentage = 1 - (this.month * 0.04);
            this.monthPrice = this.monthPrice * discountPercentage;
            this.price = this.month * this.monthPrice;

            
            console.log ("CONSULTA DE PRECIO \n     Total: $" + this.price + 
            "\n     Precio por mes: $" + this.monthPrice + 
            "\n     " + parseInt((1 - discountPercentage)*100) + "% OFF");
            return ("Total: $" + this.price + 
            "\n Precio por mes: $" + this.monthPrice + 
            "\n " + parseInt((1 - discountPercentage)*100) + "% OFF");
        } else if (this.month > 12) {
            const discountPercentage = 1 - parseFloat(12 * 0.04);
            this.monthPrice = this.monthPrice * discountPercentage;
            this.price = this.month * this.monthPrice;

            console.log ("CONSULTA DE PRECIO \n     Total: $" + this.price + 
            "\n     Precio por mes: $" + this.monthPrice + 
            "\n     " + parseInt((1 - discountPercentage)*100) + "% OFF");
            return ("Total: $" + this.price + 
            "\n Precio por mes: $" + this.monthPrice + 
            "\n " + parseInt((1 - discountPercentage)*100) + "% OFF");
            
        } else {
            return ("Total: $" + this.price + 
            "\n Precio por mes: $" + this.monthPrice);
        }

        
    }
}


let condition = prompt("¿Estás listo para empezar? \n SI            NO").toLowerCase();

while (condition != "no") {
    let consultPrice = new MonthPrice(prompt("¿Cuántos meses quieres pagar? Pasados los tres meses hay descuento, abonar el año completo tiene casi 50% de descuento"));
    while (isNaN(consultPrice.month)) {
        consultPrice.month = prompt("Lo siento, debes escribir un número de mes");
    }
    alert(consultPrice.discount());
    condition = prompt("¿Quieres consultar otros precios?").toLowerCase();
}