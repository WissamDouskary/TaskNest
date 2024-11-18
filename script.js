let taskTitle = document.getElementById("task-title");
let taskDate = document.getElementById("input-date");
let taskDesc = document.getElementById("Add-disc");
let prioretySelect = document.getElementById("pSelection");
let statueSelector = document.getElementById("status");
let myForm = document.getElementById("form");

let taskArr = [];
var taskObj = {};

myForm.addEventListener("submit", function(event){

    event.preventDefault();

    if(taskTitle.value !== "" &&
        taskDate.value !== "" &&
        taskDesc.value !== "" &&
        prioretySelect.value !== "Pvide" &&
        statueSelector.value !== "statusprogress"){

        pushToArray(taskTitle, taskDate , taskDesc, prioretySelect, statueSelector);
        modalClose();

    }else{
        alert("please fill all the fields");
        modalOpen();
    }

    taskTitle.value = "" 
    taskDate.value = "" 
    taskDesc.value = "" 
    prioretySelect.value = "Pvide" 
    statueSelector.value = "statusprogress"
});

function pushToArray(title, date , desc, priorety, status){
    taskObj = {
        tasktitle: title.value,
        dateVal: date.value,
        description: desc.value,
        pr: priorety.value,
        stat: status.value,
    }
    taskArr.push(taskObj);

    let taskArrString = JSON.stringify(taskArr);
    localStorage.setItem("arr",taskArrString);

}










































function modalClose(){
    document.getElementById('mainmodal').style.display = 'none'
}
function modalOpen(){
    document.getElementById('mainmodal').style.display = 'flex'
}

