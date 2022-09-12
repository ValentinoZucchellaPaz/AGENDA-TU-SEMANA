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
        id:2,
        name: 'KARATE',
        hour: '19:00',
        description: 'ir a entrenar',
    }
];
let jueves = [];
let viernes = [
    {
        id:3,
        name: 'KARATE',
        hour: '19:00',
        description: 'ir a entrenar',
    }
];
let sabado = [];
let domingo = [];

let tasks = [lunes, martes, miercoles, jueves, viernes, sabado, domingo];






// MANIPULAR DATOS JS


/**ENTRADA DE DATOS */
while (condition!== 0) {
    condition = Number(prompt('Ingresa una opcion: \n1. Agregar Tarea\n0. Salir')); 
    // aca le asigno valor numerico
    switch (condition) { //segun ese numero lo devuelvo en uno de los casos

        case 1:
            // pedir datos
            let day = Number(prompt('INGRESE DIA\n1. Lunes  2. Martes   3. Miercoles 4. Jueves\n5. Viernes  6. Sabado   7. Domingo 8. Todos los días'));

            while (isNaN(day)) {
                day = Number(prompt('Lo siento, ingresa un número para el día que quieres elegir\n1. Lunes  2. Martes   3. Miercoles 4. Jueves\n5. Viernes  6. Sabado   7. Domingo 8. Todos los días'));
            }
            while(day > 8) {
                day = Number(prompt('Por favor ingresa un número que esté especificado:\n1. Lunes  2. Martes   3. Miercoles 4. Jueves\n5. Viernes  6. Sabado   7. Domingo 8. Todos los días'))
            }
            const name = prompt('INRESE NOMBRE DE LA TAREA').toUpperCase();
            const hour = prompt('INGRESE LA HORA');
            const description = prompt('Ingrese la descripcion de la tarea');
            const id = asignarId();
            createTask(day, hour, name, description, id);
            consultTasks(day);
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
        tasks.forEach((array) => {
            task.id += 1;
            array.push(task);
        });
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






// DOM


// agregar tareas a los días correspondientes (funciones borrar o marcar como completas tareas individuales)
tasks.forEach((days, counter) => {
    const dayUlSelector = document.getElementById(`day${counter+1}-ul`);
    days.forEach(task => {
        const taskLi = document.createElement('li');
        taskLi.setAttribute('id', `task-${task.id}`);
        taskLi.innerHTML = `
        <p style="display:inline;" >${task.name}: </p> <span style="font-weight:400;">${task.hour} hs.</span> 
        <div class="btn-container"> 
            <button class="btn-delete" id="delete-${task.id}" title="Eliminar tarea">
                <i class="fa-solid fa-xmark"></i>
            </button>
            <button class="btn-check" id="completed-${task.id}" title="Tarea completada">
                <i class="fa-solid fa-check" id="icon-check-${task.id}"></i>
            </button>
        </div>`;
        dayUlSelector.append(taskLi);

        deleteTaskDOM(dayUlSelector, taskLi, `delete-${task.id}`);

        completedTaskDOM(taskLi, `completed-${task.id}`, `icon-check-${task.id}`);
    });
});

// funcion de marcar tarea especifica como completa
function completedTaskDOM (liHtml, btnId, iconId){
    const confirmBtn = document.getElementById(btnId);
    const checkIcon = document.getElementById(iconId);
    
    confirmBtn.addEventListener('click', ()=> {
        liHtml.classList.toggle('completed');
        checkIcon.classList.toggle('completed');
    })
}

// funcion de eliminar tarea especifica
function deleteTaskDOM(fatherHTML, taskHTML, btnId) {
    const deleteBtn = document.getElementById(btnId);
    deleteBtn.addEventListener('click', ()=> fatherHTML.removeChild(taskHTML))
}

// eliminar todas las tareas
const deleteAllTasks = document.getElementById('delete-all');
deleteAllTasks.addEventListener('click', ()=>{
    let condition = prompt('¿Estás seguro que quieres borrar todas las tareas?\n1. Sí    2. No').toLowerCase();
    if (condition == 1 || condition == 'si' || condition == 'sí') {
        const allUlSelector = document.querySelectorAll('.day-ul');
        allUlSelector.forEach(ul => ul.innerHTML = null);


        tasks = tasks.map(dayArray => dayArray=[]);
        alert('Todas las tareas fueron eliminadas');
    }
})