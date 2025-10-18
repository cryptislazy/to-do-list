let tasksUl = document.querySelector(`#tasksUl`);
let newTaskDiv = document.querySelector(`#newTaskDiv`);
let newTaskInput = document.querySelector(`#newTaskInput`);
let newTaskBtn = document.querySelector(`#newTaskBtn`);
let error = document.querySelector(`#error`);
let emptyListMsg = document.querySelector(`#emptyListMsg`);
let tasks = document.querySelectorAll(`li`);
let placeholderIndex = 0;
let taskCheckedOrder = [];
let tasksNodeList = document.querySelectorAll(`li`);
let savedTasksHTML = localStorage.getItem(`savedTasksHTML`);
let savedTaskCheckedOrder = JSON.parse(localStorage.getItem(`taskCheckedOrder`));
let checkboxes = document.getElementsByTagName('input[type="checkbox"]');

const placeholderAnimation = setInterval(() => {    //animacao do input
    let dots = [".", "..", "..."];
    placeholderIndex++;
    if (placeholderIndex > 2) placeholderIndex = 0;
    newTaskInput.placeholder = `Inserir nova tarefa` + dots[placeholderIndex];
}, 1000);

newTaskBtn.addEventListener(`click`, saveTask);         //event listeners
newTaskInput.addEventListener(`keyup`, event => {
    if (event.key === `Enter`) saveTask();
});

if(localStorage.getItem(`savedTasksHTML`)){      //pegando tasks do localStorage
    let tempUl = document.createElement(`ul`);
    tempUl.innerHTML = savedTasksHTML;
    tasks = document.querySelectorAll(`li`);
    for(let li of tempUl.children){
        loadSavedTasks(li.textContent);
    }
    emptyListMsg.style.display = `none`;
}

function loadSavedTasks(taskText){     //funcao para recriar tasks do localStorage
        let newTask = document.createElement(`li`);
        let newDelete = document.createElement(`img`);
        let newCheck = document.createElement(`input`);
        let taskClickRange = document.createElement(`div`);
        
        taskClickRange.classList.add(`taskClickRange`);
        newTask.textContent = taskText;
        tasksUl.append(newTask);
        newDelete.textContent = `Deletar`;
        newTask.append(newDelete);
        newDelete.src = `delete.svg`;
        newCheck.type = `checkbox`;
        newTask.prepend(newCheck);
        newDelete.classList.add(`newDelete`);
        newTask.append(taskClickRange);
        emptyListMsg.style.display = `none`;

        newDelete.addEventListener(`click`, () => {
            newTask.remove()
            tasks = document.querySelectorAll(`li`);
            if (tasks.length < 1) emptyListMsg.style.display = `flex`;
            refreshLocalStorage();
        });
        let checkbox = document.querySelectorAll('input');
        checkbox.forEach(cb => {
            cb.addEventListener(`change`, () => {
                if (cb.checked) cb.parentElement.classList.add(`checkedTask`);
                else cb.parentElement.classList.remove(`checkedTask`);
                refreshLocalStorage();
            });
        });
        taskClickRange.addEventListener(`click`, () => {
            let checkbox = taskClickRange.parentElement.firstElementChild;
            checkbox.checked = !checkbox.checked;
            if (checkbox.checked) checkbox.parentElement.classList.add(`checkedTask`);
            else newTask.classList.remove(`checkedTask`);
            refreshLocalStorage();
        });
}

tasks = document.querySelectorAll(`li`);         //remarcando tasks do localStorage
tasks.forEach((element, index) => {
    if(savedTaskCheckedOrder[index] == `checked`){
        element.firstElementChild.checked = true;
        element.classList.add(`checkedTask`);
    }
});

function saveTask(){                  //funcao para criar nova tarefa
    if(newTaskInput.value.length < 1){
        error.textContent = `Por favor insira uma tarefa válida`;
        error.style.visibility = `visible`;
        setTimeout(() => error.style.visibility = `hidden`, 2000);
    }
    else{
        let newTask = document.createElement(`li`);
        let newDelete = document.createElement(`img`);
        let newCheck = document.createElement(`input`);
        let taskClickRange = document.createElement(`div`);
        
        taskClickRange.classList.add(`taskClickRange`);
        newTask.textContent = newTaskInput.value;
        tasksUl.append(newTask);
        newDelete.textContent = `Deletar`;
        newTask.append(newDelete);
        newDelete.src = `delete.svg`;
        newCheck.type = `checkbox`;
        newTask.prepend(newCheck);
        newDelete.classList.add(`newDelete`);
        newTask.append(taskClickRange);
        emptyListMsg.style.display = `none`;

        newDelete.addEventListener(`click`, () => {
            newTask.remove()
            tasks = document.querySelectorAll(`li`);
            if (tasks.length < 1) emptyListMsg.style.display = `flex`;
            refreshLocalStorage();
        });
        let checkbox = document.querySelectorAll('input');
        checkbox.forEach(cb => {
            cb.addEventListener(`change`, () => {
                if (cb.checked) cb.parentElement.classList.add(`checkedTask`);
                else cb.parentElement.classList.remove(`checkedTask`);
            });
            refreshLocalStorage();
        });
        taskClickRange.addEventListener(`click`, () => {
            let checkbox = taskClickRange.parentElement.firstElementChild;
            checkbox.checked = !checkbox.checked;
            if (checkbox.checked) checkbox.parentElement.classList.add(`checkedTask`);
            else newTask.classList.remove(`checkedTask`);
            refreshLocalStorage();
        });

        newTaskInput.placeholder = `Inserir nova tarefa...`;
        clearInterval(placeholderAnimation);
    }
    newTaskInput.value = ``;
    refreshLocalStorage();
}

function refreshLocalStorage(){    //funcao para atualizar localStorage com alteracão nas tasks
    tasksUl = document.querySelector(`#tasksUl`);
    tasks = document.querySelectorAll(`li`);
    let taskCheckedOrder = [];
    for(let task of tasks){
        if(task.firstElementChild.checked){
            taskCheckedOrder.push(`checked`);
        }
        else{
            taskCheckedOrder.push(`notChecked`);
        }
    }
    localStorage.setItem(`savedTasksHTML`, tasksUl.innerHTML);
    localStorage.setItem(`taskCheckedOrder`, JSON.stringify(taskCheckedOrder));
};
