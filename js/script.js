// define ui element
let form = document.querySelector('#task_form');
let task_input = document.querySelector('#new_task');
let task_list = document.querySelector('#task_list');
let cleartask = document.querySelector('#clear_task');
let task_filter = document.querySelector('#task_filter');


// define event listener
 
form.addEventListener('submit', addTask);
task_list.addEventListener('click', removeTask);
cleartask.addEventListener('click', clearTask);
task_filter.addEventListener('keyup',filterTask)
document.addEventListener('DOMContentLoaded', getTask);


// define function
function addTask(e){
   if (task_input.value === '') {
       alert('Add a task');
   } 
   else {
       //crate li element
       let li = document.createElement('li');
       li.appendChild(document.createTextNode(task_input.value + ' '));
       
       let link = document.createElement('a');
       link.setAttribute('href', '#');
       link.innerText = 'X';
       li.appendChild(link);
       task_list.appendChild(li);

    storeTaskLocalStorage(task_input.value);

       task_input.value = '';
};

e.preventDefault();

}

function removeTask(e){
    if (e.target.hasAttribute('href')) {
        if (confirm('Are You Sure ?')) {
            let ele = e.target.parentElement;
            ele.remove();
            removeFormLS(ele);
        }
    }
}


//clear task
function  clearTask(e) {
    // task_list.innerHTML = "";

    // faster way
   if (confirm('Are You Sure!')) {
    while(task_list.firstChild){
        task_list.removeChild(task_list.firstChild)
    }

    localStorage.clear();
   }
}


// Task fildering
function filterTask(e) {
    let text = e.target.value.toLowerCase();
    document.querySelectorAll('li').forEach(task => {
        let item = task.firstChild.textContent;
        if (item.toLowerCase().indexOf(text) != -1) {
            task.style.display = 'block';
            
        }
        else{
            task.style.display = 'none';
        }
    })
    console.log(text); 
}

function  storeTaskLocalStorage(task) {
    let tasks;
    if (localStorage.getItem('tasks') ===  null) {
        tasks = [];
    }
    else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
       
    }
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}


function getTask(){
    let tasks;
    if (localStorage.getItem('tasks') ===  null) {
        tasks = [];
    }
    else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
       
    }
    tasks.forEach( task => {
        let li = document.createElement('li');
       li.appendChild(document.createTextNode(task + ' '));
       
       let link = document.createElement('a');
       link.setAttribute('href', '#');
       link.innerText = 'X';
       li.appendChild(link);
       task_list.appendChild(li);
    })
}



// remove storage data function

function removeFormLS(taskItem){
    let tasks;
    if (localStorage.getItem('tasks') ===  null) {
        tasks = [];
    }
    else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
       
    }
    
    let li = taskItem;
    li.removeChild(li.lastChild);
    
tasks.forEach((task,index) => {
    if (li.textContent.trim() === task ) {
                tasks.splice(index, 1);
            }
});
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
