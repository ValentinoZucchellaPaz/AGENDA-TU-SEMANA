class Task {
    constructor (day, name, hour,  id){
        this.day = this.toArray(day);
        this.name = name;
        this.hour = hour;
        this.id = id;
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

// TODO: que se guarde estado de tarea y se actualice cuando presione boton, agregar funcion de editar tarea



// toma datos de los input y 1.agrega a html 2.crea tarea
const createTaskBtn = document.getElementById('submit');
createTaskBtn.addEventListener('click', () => {
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
    createTask(daysToRepeatTask.join(", "), inputName, inputHour, id);
    daysToRepeatTask.length > 1 ? daysToRepeatTask.forEach(day => addTaskToDOM(day, inputName, id, inputHour)) : addTaskToDOM(inputDay, inputName, id, inputHour);
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
    let taskToDeleteDay = tasks.find(task => task.id == taskId);
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
    const deletedTask = tasks.find(task => task.id == taskId);
    tasks = tasks.filter(task => task.id != taskId);
    console.log(`Se eliminó la tarea: ${deletedTask.name}`);
    console.log(deletedTask);
}

// TODO:
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
function createTask (day, name, hour, id){
    let newTask = new Task (day, name, hour, id)
    tasks.push(newTask);
    refreshLS();
}
function asingId () {
    return tasks.length + 1;
}






// despliega modal con confirmacion, elimina todas tareas, actualiza LS
const deleteAllTasksBtn = document.getElementById('delete-all');
deleteAllTasksBtn.addEventListener('click', ()=>{

    const modal = document.createElement('div');
    modal.classList.add('modal-container');
    modal.innerHTML= `
        <div class="modal" id="modal">
            <h4 class="day-title">Advertencia</h4>
            <p>Borarrás todas las tareas y no podrás recuperarlas</p><br>
            <h5>¿Estás seguro?</h5>
            <div class="btn-container-modal">
                <button class="delete-all-confirm" id="delete-all-confirm">Borrar</button>
                <button class="delete-all-cancel" id="delete-all-cancel">Cancelar</button>
            </div>
        </div>
    `;
    const body = document.querySelector('body');
    body.classList.add('no-scroll');
    body.appendChild(modal);

    const deleteAllConfirm = document.getElementById('delete-all-confirm');
    deleteAllConfirm.addEventListener('click', ()=>{
        const allUlSelector = document.querySelectorAll('.day-ul');
        allUlSelector.forEach(ul => ul.innerHTML = null);
        tasks = [];
        refreshLS();
        removeModal(modal, body)
    })

    const deleteAllCancel = document.getElementById('delete-all-cancel');
    deleteAllCancel.addEventListener('click', ()=>{
        // FIXME:
        document.getElementById('modal').classList.add('goUp');
        removeModal(modal, body);
    })

})
function removeModal (modalName, modalFather) {
    modalFather.removeChild(modalName);
    modalFather.classList.remove('no-scroll');
}






// LOCALSTORAGE
// if (localStorage.length == 0) { //inicializa
//     addToLS(tasks, 'allTasks');
// }
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
const allTasksLSArray = JSON.parse(allTasksLS);
tasks = allTasksLSArray;
allTasksLSArray.forEach(task => {
    task.day.forEach(element => {
        addTaskToDOM(element, task.name, task.id, task.hour);
    })
});