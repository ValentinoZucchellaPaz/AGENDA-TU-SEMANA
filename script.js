/**DEFINO CONDICION PARA LA ENTRADA DE DATOS */
let condition; //aca vale undefined


/**ARRAYS DONDE SE GUARDAN DATOS */

let lunes = [
    {
        id:1,
        name: 'KARATE',
        hour: '19:00',
        description: 'ir a entrenar',
    }
];
let martes = [];
let miercoles = [
    {
        id:1,
        name: 'KARATE',
        hour: '19:00',
        description: 'ir a entrenar',
    }
];
let jueves = [];
let viernes = [
    {
        id:1,
        name: 'KARATE',
        hour: '19:00',
        description: 'ir a entrenar',
    }
];
let sabado = [];
let domingo = [];

let tasks = [lunes, martes, miercoles, jueves, viernes, sabado, domingo];


/**ENTRADA DE DATOS */
while (condition!== 0) {
    condition = Number(prompt('Ingresa una opcion: \n1. Agregar Tarea\n2. Borrar Tareas\n3. Ver Tarea\n0. Salir')); 
    // aca le asigno valor numerico
    switch (condition) { //segun ese numero lo devuelvo en uno de los casos

        case 1:
            // pedir datos
            let day = Number(prompt('INGRESE DIA\n1. Lunes\n2. Martes\n3. Miercoles\n4. Jueves\n5. Viernes\n6. Sabado\n7. Domingo\n8. Todos los días'));

            while (isNaN(day)) {
                day = Number(prompt('Lo siento, ingresa un número para el día que quieres elegir\n1. Lunes  2. Martes   3. Miercoles\n4. Jueves 5. Viernes  6. Sabado   7. Domingo'));
                while(day > 8) {
                    day = Number(prompt('Por favor ingresa un número que esté especificado:\n1. Lunes\n2. Martes\n3. Miercoles\n4. Jueves\n5. Viernes\n6. Sabado\n7. Domingo\n8. Todos los días'))
                }
            }
            const name = prompt('INRESE NOMBRE DE LA TAREA').toUpperCase();
            const hour = prompt('INGRESE LA HORA');
            const description = prompt('Ingrese la descripcion de la tarea');
            const id = asignarId();
            createTask(day, hour, name, description, id);
            break;

        case 2:
            // pedir datos
            let dayDelete = Number(prompt('DIA QUE QUIERES ELIMINAR TU TAREA\n\n1. Lunes\n2. Martes\n3. Miercoles\n4. Jueves\n5. Viernes\n6. Sabado\n7. Domingo\n8. Todos los días'))
            while (isNaN(dayDelete)) {
                dayDelete = Number(prompt('Lo siento, ingresa un número para el día que quieres elegir\n\n1. Lunes\n2. Martes\n3. Miercoles\n4. Jueves\n5. Viernes\n6. Sabado\n7. Domingo\n 8. Todos los días'));
                while(dayDelete > 8) {
                    consultOptions = Number(prompt('Por favor ingresa un número que esté especificado:\n\n1. Lunes\n2. Martes\n3. Miercoles\n4. Jueves\n5. Viernes\n6. Sabado\n7. Domingo\n8. Todos los días'))
                }
            }



            let nameDelete = prompt('INGRESE EL NOMBRE DE LA TAREA A ELIMINAR\nSi no conoces el nombre escribe "consultar"').toUpperCase();
            if(nameDelete == 'consultar'){
                continue
            }
            deleteTask(dayDelete, nameDelete);
            break;

        case 3:
            // pedir datos
            let consultOptions = Number(prompt('DIA QUE QUIERES CONSULTAR TUS TAREAS\n\n1. Lunes\n2. Martes\n3. Miercoles\n4. Jueves\n5. Viernes\n6. Sabado\n7. Domingo\n8. Todas mis tareas'));
            while (isNaN(consultOptions)){
                consultOptions = Number(prompt('Lo siento, ingresa un número para el día que quieres elegir\n\n1. Lunes\n2. Martes\n3. Miercoles\n4. Jueves\n5. Viernes\n6. Sabado\n7. Domingo\n8. Todas mis tareas'));
                while(consultOptions > 8) {
                    consultOptions = Number(prompt('Por favor ingresa un número que esté especificado:\n\n1. Lunes\n2. Martes\n3. Miercoles\n4. Jueves\n5. Viernes\n6. Sabado\n7. Domingo\n8. Todas mis tareas'))
                }
            }

            consultTasks(consultOptions);
            break;

        case 0:
            alert('Para hacer una nueva consulta recargue la pagina, saludos')
            break;
        default:
            alert('Intente nuevamente\nIngrese un número especificado')
            break;
    }
}


/**AGREGAR TAREAS */
function createTask(day, hour, name, description, id) {
    // crear tarea con los datos
    const task = {
        id,
        name,
        hour,
        description
    }

    if (day < 8) {
        day -= 1;
        tasks[day].push(task);
    } else if (day == 8) {
        day -= 1;
        tasks.forEach((array) => array.push(task));
    }

    alert('Tu tarea se asignó con el id ' + id);
}


/**CONSULTAR TAREAS */
function consultTasks(day) {

    if(day < 8) {
        // output por alert de las tareas de ese día
        day -= 1; // se resta uno para operar con indices
        console.log('Tareas del día: ' + (day + 1) + '\n');
        tasks[day].forEach((task) => {
            alert(
                'Tareas del día: ' + (day + 1) + '\n' + 
                'ID: ' + task.id + 
                '\nNAME: ' + task.name + 
                '\nHOUR: ' + task.hour + 
                '\nDESCRIPTION: ' + task.description
            );
            console.log(task);
        })

    } else {
        // output por consola de todas las tareas + aviso por alert
        console.log('\nTODAS LAS TAREAS');
        console.log(tasks);
        alert('Todas tus tareas se imprimieron en la consola')
        
    }
}


/**ELIMINAR TAREAS */
function deleteTask(day, Name) {

    if (day < 8) {
        day -= 1;
        
        // output
        let deletedTasks = tasks[day].filter(task => task.name == Name);
        alert ('LAS TAREAS ELIMINADAS SE MOSTRARÁN POR CONSOLA');
        console.log('TAREAS ELIMINADAS DEL DÍA ' + (day+1));
        console.log(deletedTasks)
        
        // ELIMINAR DE ARRAY
        tasks[day] = tasks[day].filter(task => task.name !== Name);

    } else if (day == 8) {
        
        // output
        deletedTasks = tasks.map(dayArray => dayArray.filter(task => task.name == Name));
        alert ('LAS TAREAS ELIMINADAS SE MOSTRARÁN POR CONSOLA');
        console.log('TAREAS ELIMINADAS DE TODOS LOS DÍAS');
        console.log(deletedTasks)
        
        // ELIMINAR DE ARRAY
        tasks = tasks.map(dayArray => dayArray.filter(task => task.name !== Name));
    }

}


// ASIGNO ID sumando 1 al ULTIMO
function asignarId(){
    return lastId() + 1;
}
function lastId () {
    let allIds = tasks.flatMap(array => array.map(obj => obj.id));
    return Math.max(...allIds);
}