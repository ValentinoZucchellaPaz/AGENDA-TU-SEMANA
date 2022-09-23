class Task {
    constructor (day, name, hour,  id){
        this.day = day;
        this.name = name;
        this.hour = hour;
        this.id = id;
        this.completed = []
    }
    toArray(day) {
        day = day.split(', ');
        return day;
    }
}
let tasks = [
    new Task('lunes, miercoles, viernes', 'KARATE', '19:00', 1),
    new Task('lunes', 'entrenar', '17:00', 2),
    new Task('viernes', 'estudiar', '8:00', 3),
]

// TODO: funcion de editar tarea



// toma datos de los input y 1.agrega a html 2.crea tarea
const createTaskBtn = document.getElementById('submit');
createTaskBtn.addEventListener('click', (e) => {
    e.preventDefault();
    let inputName = document.getElementById('task-selector').value.toUpperCase();
    let inputHour = document.getElementById('hour-selector').value;
    const id = asingId();

    // obtener dias de los checkbox marcados
    const daysToRepeatTask = [];
    const days = ['lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado', 'domingo'];
    days.forEach(day => {
        const dayCheckbox = document.getElementById(day);
        dayCheckbox.checked && daysToRepeatTask.push(dayCheckbox.name);
    });

    // subir a tasks y al dom
    createTask(daysToRepeatTask, inputName, inputHour, id);

    // mostrar toast 
    Swal.fire({
        text: `Se agregó ${inputName} los días ${daysToRepeatTask.join(', ')}`,
        toast: true,
        position: 'top-end',
        timer: 3000,
        timerProgressBar: true
    })
});

// crea tarea y sube a tasks, actualiza LS
function createTask (day, name, hour, id){
    let newTask = new Task (day, name, hour, id)
    tasks.push(newTask);
    day.forEach(dayFromArray => addTaskToDOM(dayFromArray, newTask));    
    refreshLS();
}
function asingId () {
    return tasks.length + 1;
}

// agrega al HTML + funciones borrar y checkear cuando click en btn
function addTaskToDOM(day, {name, hour, id, completed}) {
    // day, taskName, taskId, hour
    const ul = document.getElementById(`${day}-ul`);
    const li = document.createElement('li');
    const liId = `${day}-${name.trim()}-${id}`
    li.setAttribute('id', liId);
    li.innerHTML = `
        <p style="display:inline;" >${name}: </p> <span style="font-weight:400;">${hour} hs.</span> 
        <div class="btn-container"> 
            <button class="btn-edit" id="edit-${liId}">
                <i class="fa-regular fa-pen-to-square"></i>
            </button>
            <button class="btn-delete" id="delete-${liId}" title="Eliminar tarea">
                <i class="fa-solid fa-xmark"></i>
            </button>
            <button class="btn-check" id="completed-${liId}" title="Tarea completada">
                <i class="fa-solid fa-check" id="icon-check-${liId}"></i>
            </button>
            </div>`;
    ul.append(li);
    
    deleteTaskBtnDOM(ul, li, `delete-${liId}`, id, day);

    completeTaskBtnDOM(li, `completed-${liId}`, `icon-check-${liId}`, id, day);

    completed.includes(day) && ( li.classList.toggle('completed'), document.getElementById(`icon-check-${liId}`).classList.toggle('completed') )
}

// cuando se presiona btn (btnId), html remueve child del father, saca dayToDelete de task (taskId)
function deleteTaskBtnDOM(father, child, btnId, taskId, dayToDelete) {
    const deleteBtn = document.getElementById(btnId);
    deleteBtn.addEventListener('click', ()=> {
        father.removeChild(child);
        deleteDayFromTask(taskId, dayToDelete);
    });
}

// elimina dayToDelete de task (taskId), actualiza LS
function deleteDayFromTask (taskId, dayToDelete) {
    let taskToDeleteDay = tasks.find(task => task.id == taskId);
    let taskDays = taskToDeleteDay.day;
    taskDays = taskDays.filter(day => day != dayToDelete);
    taskToDeleteDay.day = taskDays;
    console.log(taskToDeleteDay);

    taskDays.length==0 ? deleteTask(taskId) : ( deleteTask(taskId), tasks.push(taskToDeleteDay) );
    refreshLS();
}

// elimina task (taskId) de tasks
function deleteTask (taskId) { 
    const deletedTask = tasks.find(task => task.id == taskId);
    tasks = tasks.filter(task => task.id != taskId);
    console.log(`Se eliminó la tarea: ${deletedTask.name}`);
    console.log(deletedTask);
}

// TODO: cambiar estado para mantener verde cuando se recargue página
// cuando presiono btn (btnId), se muestra verde li e icon (iconId)
function completeTaskBtnDOM (li, btnId, iconId, taskId, dayToComplete){
    const checkBtn = document.getElementById(btnId);
    const checkIcon = document.getElementById(iconId);
    const completedTask = tasks.find(task => task.id == taskId);
    
    checkBtn.addEventListener('click', ()=> {
        li.classList.toggle('completed');
        checkIcon.classList.toggle('completed');
        // sumar día a la propiedad completed
        completedTask.completed.find(completedDays => completedDays == dayToComplete) == null ?
        completedTask.completed.push(dayToComplete)
        : completedTask.completed = completedTask.completed.filter(completedDays => completedDays !== dayToComplete);
        refreshLS()
    })
}




// despliega modal con confirmacion, elimina todas tareas, actualiza LS
const deleteAllTasksBtn = document.getElementById('delete-all');
deleteAllTasksBtn.addEventListener('click', ()=>{
    Swal.fire({
        title: 'Advertencia',
        icon: 'warning',
        text: 'Borrarás todas las tareas y no podrás recuperarlas.',
        color: '#111',
        confirmButtonColor: 'rgb(199, 28, 28)',
        confirmButtonText: 'BORRAR',
        showCancelButton: true,
        cancelButtonText: 'CANCELAR',

        returnFocus: false,
        focusConfirm: false,
        focusCancel: false,
    }).then((result) => {
        result.isConfirmed && (
            document.querySelectorAll('.day-ul').forEach(ul => ul.innerHTML = null),
            tasks = [],
            refreshLS(),
            Swal.fire({
                text:'Se han eliminado todas las tareas',
                color: '#333',
                showConfirmButton: false,
                showCancelButton: true,
                cancelButtonText: 'OK'
            })
        )
    })
})






// LOCALSTORAGE
localStorage.length == 0 && addToLS(tasks, 'allTasks');
// agrega array a LS
function addToLS (array, localStorageName) {
    const arrayJSON = JSON.stringify(array);
    localStorage.setItem(localStorageName, arrayJSON);
}
// borra LS y agrega tasks
function refreshLS() { //borra LS y agrega tasks
    localStorage.clear();
    addToLS(tasks, 'allTasks');
}

// imprime en LS en dom cuando carga página
const allTasksLS = localStorage.getItem('allTasks');
tasks = [];
const allTasksJSON = JSON.parse(allTasksLS);
tasks = allTasksJSON;
allTasksJSON.forEach(task => {
    task.day.forEach(dayToPrint => {
        addTaskToDOM(dayToPrint, task);
    })
})