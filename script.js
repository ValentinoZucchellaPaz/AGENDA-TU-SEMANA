/**ARRAYS DONDE SE GUARDAN DATOS */

class Task {
    constructor(hour, name, description, id) {
        this.hour = hour;
        this.name = name;
        this.description = description;
        this.id = id;
    }
}

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




/**         MANIPULAR DATOS DE ARRAY         */

/**AGREGAR TAREAS AL ARRAY*/
function createTask(day, hour, name, description, id) {
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

/**ELIMINAR TAREAS DEL ARRAY*/
function deleteTask(day, Name) {
    if (day < 8) {
        
        day -= 1;
        
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

/**ELIMINAR TODAS LAS TAREAS */
function deleteAllTasks () {
    tasks = tasks.map(dayArray => dayArray=[]);
    alert('Todas las tareas fueron eliminadas');
}

/**ASIGNAR ID a partir de n° de tareas */
function asignarId(){
    return lastId() + 1;
}
function lastId () {
    let allIds = tasks.flatMap(array => array.map(obj => obj.id));
    return allIds.length;
}




/**                 DOM                  */




/**CREAR TAREA DESDE HTML */
const createTaskBtn = document.getElementById('submit')
createTaskBtn.addEventListener('click', () => {
    const inputName = document.getElementById('task-selector').value.toUpperCase();
    const inputDay = document.getElementById('day-selector').value;
    const inputHour = document.getElementById('hour-selector').value;
    const inputDescription = document.getElementById('task-description').value;
    const newTaskId = asignarId();
    
    createTask(Number(inputDay), inputHour, inputName, inputDescription, newTaskId);

    // opcion de agregar una tarea todos los días
    if (inputDay == 8) {
        for (let i = 1; i < inputDay; i++) {
            addTaskDOM(i, (newTaskId + (i-1)), inputName, inputHour)
        }
    } else if (inputDay < 8) {
        addTaskDOM(inputDay, newTaskId, inputName, inputHour);
    }
});

/**IMPRIMIR TASKS EN HTML (las que ya están guardadas)*/
tasks.forEach((days, counter) => {
    days.forEach(task => {
        addTaskDOM((counter+1), task.id, task.name, task.hour)
    })
});


/**AGREGAR TAREA AL HTML (junto con botones para borrar y marcar como completa) */
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

/**MARCAR COMO COMPLETA DESDE BOTON */
function completedTaskDOM (liHtml, btnId, iconId){
    const confirmBtn = document.getElementById(btnId);
    const checkIcon = document.getElementById(iconId);
    
    confirmBtn.addEventListener('click', ()=> {
        liHtml.classList.toggle('completed');
        checkIcon.classList.toggle('completed');
    })
}

/**ELIMINAR TAREA DESDE BOTON */
function deleteTaskDOM(fatherHTML, taskHTML, btnIdHTML, dayPosition, taskName) {
    const deleteBtn = document.getElementById(btnIdHTML);
    deleteBtn.addEventListener('click', ()=> {
        fatherHTML.removeChild(taskHTML)
        deleteTask(dayPosition, taskName);
    });
}

/**BOTON ELIMINAR TODAS LAS TAREAS */
const deleteAllTasksBtn = document.getElementById('delete-all');
deleteAllTasksBtn.addEventListener('click', ()=>{
    let condition = prompt('¿Estás seguro que quieres borrar todas las tareas?\n1. Sí    2. No').toLowerCase();
    if (condition == 1 || condition == 'si' || condition == 'sí') {
        const allUlSelector = document.querySelectorAll('.day-ul');
        allUlSelector.forEach(ul => ul.innerHTML = null);


        deleteAllTasks();
    }
})