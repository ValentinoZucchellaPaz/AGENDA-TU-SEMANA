const days = ['lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado', 'domingo']
let tasks = [
    {
        day: (days[0, 2, 3]),
        name: 'KARATE',
        hour: '19:00',
        definition: 'ir a entrenar',
        id: 1,
    }
]
class Task {
    constructor (day, name, hour, definition, id){
        this.day = day;
        this.name = name;
        this.hour = hour;
        this.definition = definition;
        this.id = id;
    }
}



function createTask (day, name, hour, descripction, id){
    const taskName = new Task (day, name, hour, descripction, id)
    tasks.push(taskName);
}
function showTask (tasks) {
    tasks.forEach(task => {
        const tasksContainer = document.getElementById('task-container');
        tasksContainer.innerHTML = '';
        
    })
}