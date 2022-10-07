# AGENDA TU SEMANA
En la siguiente app podrás agendar tareas que tengas que realizar en la semana de una manera bastante intuitiva, solo ve a "AGREGAR TAREA" llena los campos y ya tendrás tu tarea.
A esta podrás marcarla como completa, editarla y hasta eliminarla.
  
Tiene algunas limitaciones, guardará las tareas que hayas marcado como completas, pero cuando empiece una nueva semana tendrás que marcarlas como descompletas de nuevo (no te preocupes, hay un boton al final de la pagina para hacerlo)  
  
¿Cómo usar?  
---  
#### Agrega tus tareas:  
![Form para cargar tareas](readmeimages/formImg.png "Form para cargar tus tareas")  
  
#### Visualiza e interactua:  
![Visualizacion de tareas](readmeimages/tasksImg.png "Form para cargar tus tareas")  
  
#### Edita tus tareas:  
![Visualizacion de tareas](readmeimages/editImg.png "Form para cargar tus tareas")  
  
  
¿Cómo funciona?  
---  
Las tareas se guardan en `array` llamado tasks y en `localStorage` (a partir del cual se imprimen), este último consta del total de tareas de tasks.  
Cada vez que agregas una tarea, se hace un `array.push()` a tasks y se imprime en su día correspondiente, a la vez se 'actualiza' el storage (se borra todo y vuelve a subir tasks), todo por la misma funcion __createTask__.  
Cuando editas una tarea, esta se borra y se vuelve a subir nuevamente editada, funcionando similar a como se eliminan (se crea una nueva tarea sin el día que se quiere eliminar, se sube esta y se elimina la anterior), usando metodo `filter`.