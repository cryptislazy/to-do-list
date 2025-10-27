let tasksUl = document.querySelector(`#tasksUl`);
let addTaskInput = document.querySelector(`#addTaskInput`);
let addTaskBtn = document.querySelector(`#addTaskBtn`);
let error = document.querySelector(`#error`);
let emptyListMsg = document.querySelector(`#emptyListMsg`);
let tasks = document.querySelectorAll(`li`);
let placeholderIndex = 0;
let taskCheckedOrder = [];
let savedTasksHTML = localStorage.getItem(`savedTasksHTML`);
let savedTaskCheckedOrder = JSON.parse(localStorage.getItem(`taskCheckedOrder`));

window.addEventListener(`load`, refreshLocalStorage);

const placeholderAnimation = setInterval(() => {    //animacao do input
    let dots = [".", "..", "..."];
    placeholderIndex++;
    if (placeholderIndex > 2) placeholderIndex = 0;
    addTaskInput.placeholder = `Inserir nova tarefa` + dots[placeholderIndex];
}, 1000);

addTaskBtn.addEventListener(`click`, () => addTask());         //event listeners
addTaskInput.addEventListener(`keyup`, event => {
    if (event.key === `Enter`) addTask();
});

if(localStorage.getItem(`taskCheckedOrder`)){      //pegando tasks do localStorage
    let tempUl = document.createElement(`ul`);
    tempUl.innerHTML = savedTasksHTML;
    tasks = document.querySelectorAll(`li`);
    for(let li of tempUl.children){
        addTask(li.textContent);
    }
    emptyListMsg.style.display = `none`;
}
       
document.querySelectorAll(`li`).forEach((element, index) => {  //remarcando tasks do localStorage
    if(savedTaskCheckedOrder[index] == `checked`){
        element.firstElementChild.checked = true;
        element.classList.add(`checkedTask`);
    }
});

function addTask(taskText = addTaskInput.value){         //funcao para criar tarefa
    if(taskText < 1){
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

        addTaskInput.placeholder = `Inserir nova tarefa...`;
        clearInterval(placeholderAnimation);
    }
    addTaskInput.value = ``;
    refreshLocalStorage();
}

tasksUl.addEventListener(`click`, e => {       //adicionando event listeners
    if(e.target.matches(`.taskClickRange`)){
        let checkbox = e.target.parentElement.firstElementChild;
        checkbox.checked = !checkbox.checked;
        if (checkbox.checked) e.target.parentElement.classList.add(`checkedTask`);
        else e.target.parentElement.classList.remove(`checkedTask`);
    }
    else if(e.target.matches(`input[type="checkbox"]`)){
        if (e.target.checked) e.target.parentElement.classList.add(`checkedTask`);
        else e.target.parentElement.classList.remove(`checkedTask`);
    }
    else if(e.target.matches(`.newDelete`)){
        e.target.parentElement.remove();
        tasks = document.querySelectorAll(`li`);
        if (tasks.length < 1) emptyListMsg.style.display = `flex`;
    }
    refreshLocalStorage();
});

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
}