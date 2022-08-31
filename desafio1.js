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


// CREO CONTADOR DEL NUMERO DE ACTIVIDADES QUE QUIERE HACER (luego usaré este como contador de un bucle)
let activitiesNumber = Number(prompt('¿Cuántas actividades quieres hacer?'));
while (isNaN(activitiesNumber)) {
    activitiesNumber = Number(prompt('Por favor ingresa el NÚMERO de actividades que quieres hacer.'));
}

// CREO ARRAY CON ACTIVIDADES y lo recorro con for of
let activities = [];
for (let i = 1; i <= activitiesNumber; i++) {
    activities.push(prompt('¿Cual es la ' + i + '° actividad que te interesó?'))
}
for (activitie of activities){
    console.log(activitie);
}


// PREGUNTAR SI QUIERE HACER CONSULTA
let condition = prompt("¿Quieres consultar los precios? \n SI            AUN NO").toLowerCase();
if (condition.includes('no')) {
    condition = 'no'
}

// EN CASO QUE QUIERA HACER CONSULTA: se pregunta meses que quiere pagar y devuelve el precio
while (condition != "no") {
    let consultPrice = new MonthPrice(prompt("¿Cuántos meses quieres pagar? Pasados los tres meses hay descuento, abonar el año completo tiene casi 50% de descuento"));
    while (isNaN(consultPrice.month)) {
        consultPrice.month = prompt("Lo siento, debes escribir el número de meses");
    }
    alert(consultPrice.discount());
    // si es mas de una actividad, ajustar precio por actividad
    if (activitiesNumber > 1) {
        alert("Como quieres hacer " + activities.join(' y ') + ' el precio final será \n $' + consultPrice.price * activitiesNumber);
        console.log("Como quieres hacer " + activities.join(' y ') + ' el precio final será \n $' + consultPrice.price * activitiesNumber);
    }

    condition = prompt("¿Quieres consultar otros precios?").toLowerCase();
    if (condition.includes('no')) {
        condition = 'no'
    }
}