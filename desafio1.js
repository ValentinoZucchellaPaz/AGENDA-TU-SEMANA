// desafio 1 - ciclos e iteraciones
// crear programa que devuelva un producto y pida multiplicando y multiplicador
// ADEMÁS el programa guardará todos los datos de las operaciones en la consola

alert("El siguiente programa dirá el resultado de un multiplicacion del 1 al 10 y se deben ingresar multiplicando y multiplicador.");

let condition;
let counter = 0;

while (condition !== "esc") {

    // preguntar antes de realizar una operacion
    condition = prompt("Presiona cualquier tecla para continuar. Sino escriba ESC").toLowerCase();
    if (condition === "esc") {
        break
    }

    // contador de numero de operaciones registradas
    console.log("------------------------------------------------------------------------");
    counter++;
    console.log("OPERACIÓN N°: " + counter);

    // generar numeros random y crear operacion
    const randomNum1 = parseInt(Math.random() * 10);
    const randomNum2 = parseInt(Math.random() * 10);
    const operation = randomNum1 * randomNum2;

    // devolver operacion y preguntar números
    console.log("El resultado de la multiplicacion es: " + operation);
    alert("El resultado de la multiplicacion es: " + operation);
    let num1 = Number(prompt("Escriba el PRIMER número de la multiplicacion").trim());
    let num2 = Number(prompt("Escriba el SEGUNDO número de la multiplicacion").trim());
    console.log("Mi operación: " + num1 + " x " + num2);


    // validacion de resultado
    if (num1 * num2 === operation) {
        alert("CORRECTO, " + operation + " es el resultado de " + num1 + " x " + num2);
        console.log("CORRECTO, " + operation + " es el resultado de " + num1 + " x " + num2);
    }else{
        alert("Lo lamento, tu resultado es INCORRECTO. El correcto es " + randomNum1 + " x " + randomNum2 + " = " + operation)
        console.log("Lo lamento, tu resultado es INCORRECTO. El correcto es " + randomNum1 + " x " + randomNum2 + " = " + operation)
    }
}

alert("Buena práctica, todas las operaciones que realizaste se encuentran impresas en la consola por si quieres volver a verlas.")