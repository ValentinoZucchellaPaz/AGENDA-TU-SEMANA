class Task {
    constructor (day, name, hour, definition, id){
        this.day = this.toArray(day);
        this.name = name;
        this.hour = hour; //this.toHour(hour);
        this.definition = definition;
        this.id = id;
    }
    toArray(day) {
        day = day.split(', ');
        return day;
    }
}
let tasks = [
    new Task('lunes, miercoles, viernes', 'KARATE', '19:00', 'ir a entrenar', 1),
    new Task('lunes', 'entrenar', '17:00', '', 2),
    new Task('viernes', 'estudiar', '8:00', 'mate y fisica', 3),
]




// toma datos de los input y 1.agrega a html 2.crea tarea
const createTaskBtn = document.getElementById('submit')
createTaskBtn.addEventListener('click', () => {
    let inputName = document.getElementById('task-selector').value.toUpperCase();
    const inputDay = document.getElementById('day-selector').value;
    const inputHour = document.getElementById('hour-selector').value;
    const inputDescription = document.getElementById('task-description').value;
    const id = asingId();

    
    
    addTaskToDOM(inputDay, inputName, id, inputHour);
    createTask(inputDay, inputName, inputHour, inputDescription, id);
});

// agrega al HTML + funciones borrar y checkear cuando click en btn
function addTaskToDOM(day, taskName, taskId, taskHour) {
    const ul = document.getElementById(`${day}-ul`);
    const li = document.createElement('li');
    const liId = `${day}-${taskName.trim()}-${taskId}`
    li.setAttribute('id', liId);
    li.innerHTML = `
        <p style="display:inline;" >${taskName}: </p> <span style="font-weight:400;">${taskHour} hs.</span> 
        <div class="btn-container"> 
            <button class="btn-delete" id="delete-${liId}" title="Eliminar tarea">
                <i class="fa-solid fa-xmark"></i>
            </button>
            <button class="btn-check" id="completed-${liId}" title="Tarea completada">
                <i class="fa-solid fa-check" id="icon-check-${liId}"></i>
            </button>
            </div>`;
    ul.append(li);
    
    deleteTaskBtnDOM(ul, li, `delete-${liId}`, taskId, day);

    completeTaskBtnDOM(li, `completed-${liId}`, `icon-check-${liId}`);
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
    let taskToDeleteDay = tasks.filter(task => task.id == taskId);
    taskToDeleteDay = taskToDeleteDay.shift();
    let taskDays = taskToDeleteDay.day;
    taskDays = taskDays.filter(day => day != dayToDelete)
    taskToDeleteDay.day = taskDays;
    
    if (taskDays.length == 0) {
        deleteTask(taskId)
    } else if (taskDays.length > 0) {
        deleteTask(taskId);
        console.log(`SOLO DEL DÍA ${dayToDelete}`);
        tasks.push(taskToDeleteDay);
    }
    refreshLS();
}

// elimina task (taskId) de tasks
function deleteTask (taskId) { 
    const deletedTask = tasks.filter(task => task.id == taskId);
    tasks = tasks.filter(task => task.id != taskId);
    console.log(`Se eliminó la tarea: ${deletedTask[0].name}`);
    console.log(deletedTask);
}


// cuando presiono btn (btnId), se muestra verde li e icon (iconId)
function completeTaskBtnDOM (li, btnId, iconId){
    const checkBtn = document.getElementById(btnId);
    const checkIcon = document.getElementById(iconId);
    
    checkBtn.addEventListener('click', ()=> {
        li.classList.toggle('completed');
        checkIcon.classList.toggle('completed');
    })
}

// crea tarea y sube a tasks, actualiza LS
function createTask (day, name, hour, descripction, id){
    let newTask = new Task (day, name, hour, descripction, id)
    tasks.push(newTask);
    refreshLS();
}
function asingId () {
    return tasks.length + 1;
}









// elimina todas tareas, actualiza LS
const deleteAllTasksBtn = document.getElementById('delete-all');
deleteAllTasksBtn.addEventListener('click', ()=>{
    let condition = prompt('¿Estás seguro que quieres borrar todas las tareas?\n1. Sí    2. No').toLowerCase();
    if (condition == 1 || condition == 'si' || condition == 'sí') {
        const allUlSelector = document.querySelectorAll('.day-ul');
        allUlSelector.forEach(ul => ul.innerHTML = null);

        tasks = [];
        refreshLS();
    }
})






// LOCALSTORAGE
if (localStorage.length == 0) { //inicializa
    addToLS(tasks, 'allTasks');
}
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

// PRINT IN DOM FROM LOCALSTORAGE (when charge page)
const allTasksLS = localStorage.getItem('allTasks');
tasks = [];
const allTasksLSArray = JSON.parse(allTasksLS);
tasks = allTasksLSArray;
allTasksLSArray.forEach(task => {
    task.day.forEach(element => {
        addTaskToDOM(element, task.name, task.id, task.hour);
    })
});