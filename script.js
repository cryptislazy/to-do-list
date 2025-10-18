const tasksUl = document.querySelector(`#tasksUl`);
const newTaskDiv = document.querySelector(`#newTaskDiv`);
const newTaskInput = document.querySelector(`#newTaskInput`);
const newTaskBtn = document.querySelector(`#newTaskBtn`);
const error = document.querySelector(`#error`);
const emptyListMsg = document.querySelector(`#emptyListMsg`);
let tasks = document.getElementsByTagName(`li`);
let checkboxes;
let placeholderIndex = 0;

const placeholderAnimation = setInterval(() => {
    let dots = [".", "..", "..."];
    placeholderIndex++;
    if (placeholderIndex > 2) placeholderIndex = 0;
    newTaskInput.placeholder = `Inserir nova tarefa` + dots[placeholderIndex];
}, 1000);

newTaskBtn.addEventListener(`click`, saveTask);
newTaskInput.addEventListener(`keyup`, event => {
    if (event.key === `Enter`) saveTask();
});



if(localStorage.getItem(`savedTasks`)){
    let savedTasks = localStorage.getItem(`savedTasks`);
    let tempUl = document.createElement(`ul`);
    tempUl.innerHTML = savedTasks;
    for(let li of tempUl.children){
        let isChecked = false
        if(li.firstElementChild.checked) isChecked = true;
        loadSavedTasks(li.textContent, isChecked)
    }
}

function loadSavedTasks(taskText, checked){
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
        if (checked) newCheck.checked = true;
        

        newDelete.addEventListener(`click`, () => {
            newTask.remove()
            if (tasks.length < 1) emptyListMsg.style.display = `flex`;
            localStorage.setItem(`savedTasks`, document.querySelector(`#tasksUl`).innerHTML);
        });
        checkboxes = document.querySelectorAll('input');
        checkboxes.forEach(cb => {
            cb.addEventListener(`change`, () => {
                if (cb.checked) cb.parentElement.classList.add(`checkedTask`);
                else cb.parentElement.classList.remove(`checkedTask`);
            });
        });
        taskClickRange.addEventListener(`click`, () => {
            let checkbox = taskClickRange.parentElement.firstElementChild;
            checkbox.checked = !checkbox.checked;
            if (checkbox.checked) checkbox.parentElement.classList.add(`checkedTask`);
            else newTask.classList.remove(`checkedTask`);
        });

        
}

function saveTask(){
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
            if (tasks.length < 1) emptyListMsg.style.display = `flex`;
            localStorage.setItem(`savedTasks`, document.querySelector(`#tasksUl`).innerHTML);
        });
        checkboxes = document.querySelectorAll('input');
        checkboxes.forEach(cb => {
            cb.addEventListener(`change`, () => {
                if (cb.checked) cb.parentElement.classList.add(`checkedTask`);
                else cb.parentElement.classList.remove(`checkedTask`);
            });
        });
        taskClickRange.addEventListener(`click`, () => {
            let checkbox = taskClickRange.parentElement.firstElementChild;
            checkbox.checked = !checkbox.checked;
            if (checkbox.checked) checkbox.parentElement.classList.add(`checkedTask`);
            else newTask.classList.remove(`checkedTask`);
        });
        newTaskInput.placeholder = `Inserir nova tarefa...`;
        clearInterval(placeholderAnimation);
    }
    localStorage.setItem(`savedTasks`, document.querySelector(`#tasksUl`).innerHTML);
    newTaskInput.value = ``;
}