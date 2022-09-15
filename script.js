/**DEFINO CONDICION PARA LA ENTRADA DE DATOS */
let condition; //aca vale undefined

class Task {
    constructor(hour, name, description, id) {
        this.hour = hour;
        this.name = name;
        this.description = description;
        this.id = id;
    }
}
/**ARRAYS DONDE SE GUARDAN DATOS */

let lunes = [
    new Task ('19:00', 'KARATE', 'ir a entrenar', 1),
];
let martes = [];
let miercoles = [
    new Task ('19:00', 'KARATE', 'ir a entrenar', 2),
];
let jueves = [];
let viernes = [
    new Task ('19:00', 'KARATE', 'ir a entrenar', 3),
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
    // crear tarea con los datos dependiendo del día
    if (day < 8) {
        day -= 1;
        tasks[day].push(new Task(hour, name, description, id));
        alert('Tu tarea se asignó con el id ' + id);
    } else if (day == 8) {
        tasks.forEach((array, counter) => {
            const newId = `${name}-${counter+1}`;
            array.push(new Task(hour, name, description, newId));
        });
    }
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
        let deletedTasks = tasks[day].filter(obj => obj.name == Name);
        console.log('TAREAS ELIMINADAS DEL DÍA ' + (day+1));
        console.log(deletedTasks)

        // ELIMINAR DE ARRAY
        tasks[day] = tasks[day].filter(obj => obj.name !== Name);

    } else if (day == 8) { //eliminar todas con determinado nombre

        // output
        deletedTasks = tasks.map(dayArray => dayArray.filter(obj => obj.name == Name));
        alert ('LAS TAREAS ELIMINADAS SE MOSTRARÁN POR CONSOLA');
        console.log('TAREAS ELIMINADAS DE TODOS LOS DÍAS');
        console.log(deletedTasks)
        
        // ELIMINAR DE ARRAY
        tasks = tasks.map(dayArray => dayArray.filter(obj => obj.name !== Name));

    }
}


// ASIGNO ID sumando 1 al total de IDs
function asignarId(){
    return lastId() + 1;
}
function lastId () {
    let allIds = tasks.flatMap(array => array.map(obj => obj.id));
    return allIds.length;
}


// CREAR TAREA DESDE EL DOM
const createTaskBtn = document.getElementById('submit')
createTaskBtn.addEventListener('click', () => {
    const inputName = document.getElementById('task-selector').value.toUpperCase();
    const inputDay = document.getElementById('day-selector').value;
    const inputHour = document.getElementById('hour-selector').value;
    const inputDescription = document.getElementById('task-description').value;
    const newTaskId = asignarId();
    
    createTask(Number(inputDay), inputHour, inputName, inputDescription, newTaskId);

    // const dayUlSelector = document.getElementById(`day${inputDay}-ul`);
    // const taskLi = document.createElement('li');
    // taskLi.setAttribute('id', `task-${newTaskId}`);
    // taskLi.innerHTML = `
    // <p style="display:inline;" >${inputName}: </p> <span style="font-weight:400;">${inputHour} hs.</span> 
    // <div class="btn-container"> 
    //     <button class="btn-delete" id="delete-${newTaskId}" title="Eliminar tarea">
    //         <i class="fa-solid fa-xmark"></i>
    //     </button>
    //     <button class="btn-check" id="completed-${newTaskId}" title="Tarea completada">
    //         <i class="fa-solid fa-check" id="icon-check-${newTaskId}"></i>
    //     </button>
    // </div>`;
    // dayUlSelector.append(taskLi);

    // deleteTaskDOM(dayUlSelector, taskLi, `delete-${newTaskId}`, (inputDay), inputName);

    // completedTaskDOM(taskLi, `completed-${newTaskId}`, `icon-check-${newTaskId}`);
    addTaskDOM(inputDay, newTaskId, inputName, inputHour);
});



// DOM


// AGREGAR TAREAS AL DOM (borra o marcar como completas)
tasks.forEach((days, counter) => {
    // const dayUlSelector = document.getElementById(`day${counter+1}-ul`);
    // days.forEach(task => {
    //     const taskLi = document.createElement('li');
    //     taskLi.setAttribute('id', `task-${task.id}`);
    //     taskLi.innerHTML = `
    //     <p style="display:inline;" >${task.name}: </p> <span style="font-weight:400;">${task.hour} hs.</span> 
    //     <div class="btn-container"> 
    //         <button class="btn-delete" id="delete-${task.id}" title="Eliminar tarea">
    //             <i class="fa-solid fa-xmark"></i>
    //         </button>
    //         <button class="btn-check" id="completed-${task.id}" title="Tarea completada">
    //             <i class="fa-solid fa-check" id="icon-check-${task.id}"></i>
    //         </button>
    //     </div>`;
    //     dayUlSelector.append(taskLi);

    //     deleteTaskDOM(dayUlSelector, taskLi, `delete-${task.id}`, (counter+1), task.name);

    //     completedTaskDOM(taskLi, `completed-${task.id}`, `icon-check-${task.id}`);
    // });
    days.forEach(task => {
        addTaskDOM((counter+1), task.id, task.name, task.hour)
    })
});


// funcion agregar tarea al dom 
function addTaskDOM(dayNumber, taskId, taskName, taskHour) {
    const UlSelector = document.getElementById(`day${dayNumber}-ul`);
    const taskLi = document.createElement('li');
    taskLi.setAttribute('id', `task-${taskId}`);
    taskLi.innerHTML = `
    <p style="display:inline;" >${taskName}: </p> <span style="font-weight:400;">${taskHour} hs.</span> 
    <div class="btn-container"> 
        <button class="btn-delete" id="delete-${taskId}" title="Eliminar tarea">
            <i class="fa-solid fa-xmark"></i>
        </button>
        <button class="btn-check" id="completed-${taskId}" title="Tarea completada">
            <i class="fa-solid fa-check" id="icon-check-${taskId}"></i>
        </button>
    </div>`;
    UlSelector.append(taskLi);

    deleteTaskDOM(UlSelector, taskLi, `delete-${taskId}`, dayNumber, taskName);

    completedTaskDOM(taskLi, `completed-${taskId}`, `icon-check-${taskId}`);
}

// funcion marcar como completa
function completedTaskDOM (liHtml, btnId, iconId){
    const confirmBtn = document.getElementById(btnId);
    const checkIcon = document.getElementById(iconId);
    
    confirmBtn.addEventListener('click', ()=> {
        liHtml.classList.toggle('completed');
        checkIcon.classList.toggle('completed');
    })
}

// funcion eliminar tarea
function deleteTaskDOM(fatherHTML, taskHTML, btnIdHTML, dayPosition, taskName) {
    const deleteBtn = document.getElementById(btnIdHTML);
    deleteBtn.addEventListener('click', ()=> {
        fatherHTML.removeChild(taskHTML)
        deleteTask(dayPosition, taskName);
    });
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