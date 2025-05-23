let taskTitle = document.getElementById("task-title");
let taskDate = document.getElementById("input-date");
let taskDesc = document.getElementById("Add-disc");
let prioretySelect = document.getElementById("pSelection");
let statueSelector = document.getElementById("status");
let myForm = document.getElementById("form");

let toDoTask = document.getElementById("todo-tasks");
let inProgressTask = document.getElementById("inProgress-tasks");
let doneTask = document.getElementById("done-tasks");

var taskArr = [];
var taskObj = {};

getDataFromLocalStorage();

myForm.addEventListener("submit", function(event){

    event.preventDefault();

    if(dateValidation()){

    if(taskTitle.value.trim() !== "" &&
        taskDate.value.trim() !== "" &&
        taskDesc.value.trim() !== "" &&
        prioretySelect.value.trim() !== "Pvide" &&
        statueSelector.value.trim() !== "statusprogress"
    ){
        pushToArray(taskTitle, taskDate , taskDesc, prioretySelect, statueSelector);
        addDataToLocalStorage()
        taskAdding(taskArr);
        modalClose();
    }else{
        alert("please fill all the fields");
        modalOpen();
    }
    }

    taskTitle.value = "" 
    taskDate.value = "" 
    taskDesc.value = "" 
    prioretySelect.value = "Pvide" 
    statueSelector.value = "statusprogress"
});

function pushToArray(title, date , desc, priorety, status){
    taskObj = {
        tasktitle: title.value.trim(),
        dateVal: date.value.trim(),
        description: desc.value.trim(),
        pr: priorety.value.trim(),
        stat: status.value.trim(),
    }
    taskArr.push(taskObj);
}

function taskAdding(taskArr){

    toDoTask.innerHTML = "";
    inProgressTask.innerHTML = "";
    doneTask.innerHTML = "";

    let todoCount = taskArr.filter(taskObj => taskObj.stat === "todo").length
    let inProgressCount = taskArr.filter(taskObj => taskObj.stat === "doing").length
    let doneCount = taskArr.filter(taskObj => taskObj.stat === "done").length

    document.getElementById("todoCount").innerHTML = todoCount;
    document.getElementById("doingCount").innerHTML = inProgressCount;
    document.getElementById("doneCount").innerHTML = doneCount;
    
    taskArr.forEach((taskObj, index) => {
        
        let div = document.createElement("div");
        div.classList = "bg-blue-400 p-3 mt-3"

        div.innerHTML += `<h2>${taskObj.tasktitle}</h2>
                        <p>${taskObj.description}</p>
                        <p>${taskObj.dateVal}</p>
                        <div class="flex gap-3 justify-end">
                            <button id="editBtn" class="bg-green-400 py-2 px-4 rounded-xl">EDIT</button>
                            <button id="delBtn" class="bg-red-400 py-2 px-4 rounded-xl">DELETE</button>
                        </div>`
        
        if(taskObj.stat === "todo"){
            toDoTask.appendChild(div);
        } else if(taskObj.stat === "doing"){
            inProgressTask.appendChild(div);
        } else if(taskObj.stat === "done"){
            doneTask.appendChild(div);
        }

        if(taskObj.pr === "priorety 1"){
            div.style.backgroundColor = 'rgb(252 165 165)';
        } else if (taskObj.pr === "priorety 2"){
            div.style.backgroundColor = 'rgb(253 224 71)';
        } else if (taskObj.pr === "priorety 3"){
            div.style.backgroundColor = '#81C784';
        }else{
            alert("please enter a valid priorety !");
            taskObj.pr = "";
        }

        let deleteButton = div.querySelector("#delBtn");
        
        deleteButton.addEventListener("click", () => {
        const isConfirm = confirm("Are you sure ?");

        if(isConfirm){
            taskArr.splice(index, 1);
            taskAdding(taskArr);
            addDataToLocalStorage();
        }
    });

    let editButton = div.querySelector("#editBtn");

    editButton.addEventListener("click", function(){
        document.getElementById("Editmodal").style.display = "flex";

        editIndex = index ;

        document.getElementById("edit-task-title").value = taskArr[editIndex].tasktitle;
        document.getElementById("edit-input-date").value = taskArr[editIndex].dateVal;
        document.getElementById("edit-Add-disc").value = taskArr[editIndex].description;
        document.getElementById("edit-pSelection").value = taskArr[editIndex].pr;
        document.getElementById("edit-status").value = taskArr[editIndex].stat;

    })
    
    document.getElementById("edit-addbtn").addEventListener("click",function(event){
        
        event.preventDefault();

        if(EditdateValidation()){
            if(document.getElementById("edit-task-title").value.trim() !== "" &&
            document.getElementById("edit-input-date").value.trim() !== "" &&
            document.getElementById("edit-Add-disc").value.trim() !== "" &&
            document.getElementById("edit-pSelection").value.trim() !== "Pvide" &&
            document.getElementById("edit-status").value.trim() !== "statusprogress"
        ){
            let editObj = {
                tasktitle : document.getElementById("edit-task-title").value.trim(),
                dateVal : document.getElementById("edit-input-date").value.trim(),
                description : document.getElementById("edit-Add-disc").value.trim(),
                pr : document.getElementById("edit-pSelection").value.trim(),
                stat : document.getElementById("edit-status").value.trim(),
            }
        
            taskArr[editIndex] = editObj;

            taskAdding(taskArr);
            addDataToLocalStorage();
            document.getElementById('Editmodal').style.display = 'none'
        }else{
            alert("please fill all fields!");
        }
        }
        });
    });

}

//addtask date validator
function dateValidation(){
    let ourDate = new Date();
    ourDate.setHours(0,0,0,0);
    let dateValue = new Date(taskDate.value);
    if(ourDate > dateValue){
        alert("please Enter a valid date!");
        return false;
    }
    return true;
}

//edit date validator
function EditdateValidation(){
    let ourDate = new Date();
    ourDate.setHours(0,0,0,0);
    let dateValue = new Date(document.getElementById("edit-input-date").value);
    if(ourDate > dateValue){
        alert("please Enter a valid date!");
        return false;
    }
    return true;
}

// modal functions 
function modalClose(){
    document.getElementById('mainmodal').style.display = 'none'
}
function modalOpen(){
    document.getElementById('mainmodal').style.display = 'flex'
}


//local storage functions 
function addDataToLocalStorage(){
    let taskArrString = JSON.stringify(taskArr);
    window.localStorage.setItem("arr",taskArrString);
}
function getDataFromLocalStorage(){
    let dataFromLocal = localStorage.getItem("arr");
    if(dataFromLocal){
        let tasks = JSON.parse(dataFromLocal);
        taskArr = tasks;
        taskAdding(taskArr);
    }
}