let tasksUl = document.querySelector(`#tasksUl`);
let addTaskInput = document.querySelector(`#addTaskInput`);
let addTaskBtn = document.querySelector(`#addTaskBtn`);
let error = document.querySelector(`#error`);
let emptyListMsg = document.querySelector(`#emptyListMsg`);
let themeBtn = document.querySelector(`#themeBtn`);
let tasks = document.getElementsByTagName(`li`);
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

if(localStorage.getItem(`savedTasksHTML`)){      //pegando tasks do localStorage
    let tempUl = document.createElement(`ul`);
    tempUl.innerHTML = savedTasksHTML;
    tasks = document.querySelectorAll(`li`);
    for(let li of tempUl.children){
        addTask(li.textContent);
    }
    emptyListMsg.style.display = `none`;
}

if(localStorage.getItem(`lightMode`) === `ON`){      //coloca tema salvo
    document.body.classList.add(`light`);
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
        let newCheck = document.createElement(`input`);
        let newText = document.createElement(`p`);
        
        tasksUl.append(newTask);
        newCheck.type = `checkbox`;
        newTask.prepend(newCheck);
        newText.textContent= taskText;
        newText.classList.add(`newText`);
        newTask.append(newText);
        emptyListMsg.style.display = `none`;
        newTask.innerHTML += `<svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>`;
        
        let newDelete = newTask.lastElementChild;
        newDelete.classList.add(`newDelete`);

        addTaskInput.placeholder = `Inserir nova tarefa...`;
        clearInterval(placeholderAnimation);
    }
    addTaskInput.value = ``;
    refreshLocalStorage();
}

tasksUl.addEventListener(`click`, e => {       //adicionando event listeners
    let currentLi = e.target.closest(`li`);
    let checkbox = currentLi.firstElementChild;
    console.log(e.target)
    if(currentLi){
        if(e.target.matches(`.newDelete`)){
            currentLi.remove();
            tasks = document.querySelectorAll(`li`);
            if (tasks.length < 1) emptyListMsg.style.display = `flex`;
        }
        else if(!e.target.matches(`input[type="checkbox"]`)){
            checkbox.checked = !checkbox.checked;
        }

        if (checkbox.checked) currentLi.classList.add(`checkedTask`);
        else currentLi.classList.remove(`checkedTask`);
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

themeBtn.addEventListener(`click`, () => {       //salva o tema
    document.body.classList.toggle(`light`);
    if(document.body.matches(`.light`)){
        localStorage.setItem(`lightMode`, `ON`);
    }
    else{
        localStorage.setItem(`lightMode`, `OFF`);
    }
});