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
let tasks = JSON.parse(localStorage.getItem('allTasks')) ?? [];
// imprime en LS en dom cuando carga página
tasks.forEach(task => {
    task.day.forEach(dayToPrint => {
        addTaskToDOM(dayToPrint, task);
    })
})

// inicializa LS
!localStorage.length && localStorage.setItem('allTasks', JSON.stringify(tasks));
// borra LS y agrega tasks (actuliza LS)
function refreshLS() {
    localStorage.clear();
    localStorage.setItem('allTasks', JSON.stringify(tasks));
}



// toma datos de los input y llama func create task
document.getElementById('submit').addEventListener('click', (e) => {
    e.preventDefault();
    const inputName = document.getElementById('task-selector').value.toUpperCase();
    const inputHour = document.getElementById('hour-selector').value;

    // obtener dias de los checkbox marcados
    const daysToRepeatTask = [];
    const days = ['lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado', 'domingo'];
    days.forEach(day => {
        const dayCheckbox = document.getElementById(day);
        dayCheckbox.checked && daysToRepeatTask.push(dayCheckbox.name);
    });

    // subir a tasks y al dom
    createTask(daysToRepeatTask, inputName, inputHour, asingId());

    // mostrar toast 
    Swal.fire({
        html: `<p>Se agregó <b>${inputName}</b> los días ${daysToRepeatTask.join(', ')}</p>`,
        toast: true,
        position: 'top-end',
        timer: 3000,
        timerProgressBar: true
    })

    // limpiar inputs
    document.getElementById('task-selector').value = '';
    document.getElementById('hour-selector').value = '';
    days.forEach(day => {
        const dayCheckbox = document.getElementById(day);
        dayCheckbox.checked = false;
    });
});

// sube a task, llama func q imprime en html, actualiza LS
function createTask (day, name, hour, id){
    let newTask = new Task (day, name, hour, id)
    tasks.push(newTask);
    day.forEach(dayFromArray => addTaskToDOM(dayFromArray, newTask));    
    refreshLS();
}
function asingId () {
    return tasks.length + 1;
}

// render con funciones editar, borrar y checkear (funcionan con addEventListener click sobre botones)
function addTaskToDOM(day, task) {
    const {name, hour, id, completed} = task;
    const ul = document.getElementById(`${day}-ul`);
    const li = document.createElement('li');
    const liId = `${day}-${name.replace(/ /g, "")}-${id}`
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
    
    deleteTaskBtnDOM(ul, li, `delete-${liId}`, task, day);

    completeTaskBtnDOM(li, `completed-${liId}`, `icon-check-${liId}`, task, day);

    editTaskBtnDOM(`edit-${liId}`, task);

    completed.includes(day) && ( li.classList.toggle('completed'), document.getElementById(`icon-check-${liId}`).classList.toggle('completed') )
}

// elimina task de dom y array
// cuando se presiona btn (btnId), html remueve child del father, saca dayToDelete de task
function deleteTaskBtnDOM(father, child, btnId, task, dayToDelete) {
    const deleteBtn = document.getElementById(btnId);
    deleteBtn.addEventListener('click', ()=> {
        father.removeChild(child);
        deleteDayFromTask(task, dayToDelete);

        // mostrar toast 
        Swal.fire({
            html: `<p>Se eliminó <b>${task.name}</b> del día: ${dayToDelete}</p>`,
            toast: true,
            position: 'top-end',
            timer: 1000,
            timerProgressBar: true
        })
    });
}

// elimina tarea y agrega nueva sin día
function deleteDayFromTask (task, dayToDelete) {
    let taskToDeleteDay = task;
    let taskDays = taskToDeleteDay.day;
    taskDays = taskDays.filter(day => day != dayToDelete);
    taskToDeleteDay.day = taskDays;

    taskDays.length==0 ? deleteTask(task) : ( deleteTask(task), tasks.push(taskToDeleteDay) );
    refreshLS();
}

// elimina tarea
function deleteTask (taskToDelete) { 
    tasks = tasks.filter(task => task != taskToDelete);
}

// marca completo día
// cuando presiono btn (btnId), se muestra verde li e icon (iconId), agrega task.day a task.complete
function completeTaskBtnDOM (li, btnId, iconId, taskToComplete, dayToComplete){
    const checkBtn = document.getElementById(btnId);
    const checkIcon = document.getElementById(iconId);
    const completedTask = tasks.find(task => task == taskToComplete);
    
    checkBtn.addEventListener('click', ()=> {
        li.classList.toggle('completed');
        checkIcon.classList.toggle('completed');
        // sumar día a la propiedad completed
        completedTask.completed.find(completedDays => completedDays == dayToComplete) == null 
        ? completedTask.completed.push(dayToComplete)
        : completedTask.completed = completedTask.completed.filter(completedDays => completedDays !== dayToComplete);
        refreshLS()
    })
}

// editar tareas btn
function editTaskBtnDOM(btnId, taskToEdit) {
    document.getElementById(btnId).addEventListener('click', ()=> {
        const modalContainer = document.createElement('div');
        modalContainer.classList.add('modal-container')
        modalContainer.innerHTML = `
        <div class="form modal" id="modalEditTask">
            <h3>Editar tarea</h3>
            <label for="name">Nombre: </label>
            <input type="text" class="task-selector" id="name-edit" value="${taskToEdit.name}">
            <label for="hour">Hora: </label>
            <input type="text" class="hour-selector" id="hour-edit" value="${taskToEdit.hour}">
            <label for="days"> Días: </label>
            <div class="days-container">
                <input type="checkbox" class="lunes" name="lunes" id="lunes-modal">
                <input type="checkbox" class="martes" name="martes" id="martes-modal">
                <input type="checkbox" class="miercoles" name="miercoles" id="miercoles-modal">
                <input type="checkbox" class="jueves" name="jueves" id="jueves-modal">
                <input type="checkbox" class="viernes" name="viernes" id="viernes-modal">
                <input type="checkbox" class="sabado" name="sabado" id="sabado-modal">
                <input type="checkbox" class="domingo" name="domingo" id="domingo-modal">
            </div>
            <div class="btn-container-modal">
                <button class="save-changes-modal" id="save-changes">GUARDAR CAMBIOS</> 
                <button class="dismiss-changes-modal" id="dismiss-changes">CANCELAR</button>
            </div>
        </div>
        `;
        document.body.style.overflow = "hidden";
        modalContainer.style.top = `-${window.screenTop}px`;
        document.body.appendChild(modalContainer);

        // marcar días anteriores como completos en los checkbox
        taskToEdit.day.forEach(day => {
            const dayCheckbox = document.getElementById(`${day}-modal`);
            dayCheckbox.checked = true;
        });

        // GUARDAR
        document.getElementById('save-changes').addEventListener('click', () => {

            // borrar la tarea de dom y tasks
            taskToEdit.day.forEach(day => {
                const ul = document.getElementById(`${day}-ul`);
                const li = document.getElementById(`${day}-${taskToEdit.name.replace(/ /g, "")}-${taskToEdit.id}`);
                ul.removeChild(li);
            })
            deleteTask(taskToEdit)
            
            // tomar nuevos datos
            let inputName = document.getElementById('name-edit').value.toUpperCase();
            let inputHour = document.getElementById('hour-edit').value;
            const id = asingId();
            const daysToRepeatTask = [];
            const days = ['lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado', 'domingo'];
            days.forEach(day => {
                const dayCheckbox = document.getElementById(`${day}-modal`);
                dayCheckbox.checked && daysToRepeatTask.push(dayCheckbox.name);
            });
            
            // subir a tasks y al dom nuevos datos
            createTask(daysToRepeatTask, inputName, inputHour, id);

            // mostrar toast 
            Swal.fire({
                html: `<p>Ahora <b>${inputName}</b> es los días: ${daysToRepeatTask.join(', ')}</p>`,
                toast: true,
                position: 'top-end',
                timer: 3000,
                timerProgressBar: true
            })

            // salir de modal
            document.getElementById('modalEditTask').classList.add('slide-up');
            setTimeout(()=> {
                document.body.removeChild(modalContainer);
                document.body.style.overflow = "";
            }, 250);
        })
        // click en boton cancelar
        document.getElementById('dismiss-changes').addEventListener('click', () => {
            document.getElementById('modalEditTask').classList.add('slide-up');
            setTimeout(()=> {
                document.body.removeChild(modalContainer);
                document.body.style.overflow = "";
            }, 250);
        })
    })
}


// borra todo
// despliega modal con confirmacion, elimina todas tareas, actualiza LS
document.getElementById('delete-all').addEventListener('click', ()=>{
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

// descompleta todo
// despliega modal con confirmacion, elimina completed de todas las task y dom
document.getElementById('reset-all').addEventListener('click', ()=>{
    Swal.fire({
        title: 'Advertencia',
        icon: 'warning',
        text: 'Todas las tareas volverán a aparecer como pendientes.',
        color: '#111',
        confirmButtonText: 'CONFIRMAR',
        showCancelButton: true,
        cancelButtonText: 'CANCELAR',

        returnFocus: false,
        focusConfirm: false,
        focusCancel: false,
    }).then((result) => {
        result.isConfirmed && (
            tasks.forEach(task=> task.completed = []),
            refreshLS(),
            document.querySelectorAll('li').forEach(li => {
                li.classList.remove('completed');
                document.getElementById(`icon-check-${li.id}`).classList.remove('completed')
            }),
            Swal.fire({
                text:'Se comenzado una nueva semana',
                color: '#333',
                showConfirmButton: false,
                showCancelButton: true,
                cancelButtonText: 'OK'
            })
        )
    })
})

// fechas
const date = new Date();
document.getElementById('date').innerText = date.getFullYear();
document.querySelectorAll('.day-date').forEach((day, counter) => {
    day.innerText = `${date.getDate()-date.getDay()+counter+1}/${date.getMonth()+1}/${date.getFullYear()}`
});

// feriados
fetch(`http://nolaborables.com.ar/api/v2/feriados/${date.getFullYear()}`)
.then(res => {res.json(), console.log(res)})
.then(respuesta => {
    document.querySelectorAll('.holiday-marker').forEach((day, counter) => {
        const feriadosDelDia = respuesta.filter(feriados => feriados.mes == date.getMonth()+1).find(feriadosDelMes => feriadosDelMes.dia == date.getDate()-date.getDay()+counter+1);
        if(feriadosDelDia !== undefined) {
            day.style.display='inline';
            document.getElementById('holiday-reference').style.display = 'flex'
            day.setAttribute('title', `${feriadosDelDia.motivo}`);
            day.setAttribute('href', `${feriadosDelDia.info}`);
            switch (feriadosDelDia.tipo) {
                case 'nolaborale':
                    day.style.backgroundColor = 'var(--feriado-nolaborable)'
                    break;
                case 'puente':
                    day.style.backgroundColor = 'var(--feriado-puente)'
                    break;
                case 'trasladable':
                    day.style.backgroundColor = 'var(--feriado-traladable)'
                    break;
            
                default:
                    day.style.backgroundColor = 'var(--feriado-inamovible)'
                    break;
            }
        }
    })
})



const selectTodayBtn = document.getElementById('select-today');
const selectWeekBtn = document.getElementById('select-week');

selectTodayBtn.addEventListener('click', () => {
    selectWeekBtn.classList.remove('actual');
    selectTodayBtn.classList.add('actual')
    document.querySelectorAll(`.day`).forEach(block => block.style.display = 'none');
    const actualDayBlock = document.getElementById(`day${date.getDay()}`);
    actualDayBlock.style.display = 'block';
    actualDayBlock.classList.add('today');
})

selectWeekBtn.addEventListener('click', () => {
    selectTodayBtn.classList.remove('actual');
    selectWeekBtn.classList.add('actual');
    document.querySelectorAll(`.day`).forEach(block => block.style.display = 'block');
    document.getElementById(`day${date.getDay()}`).classList.remove('today');
})