function addTask() {

    let input = document.getElementById("taskInput");
    let task = input.value.trim();

    if(task === ""){
        alert("Please enter a task.");
        return;
    }

    let li = document.createElement("li");

    let span = document.createElement("span");
    span.innerText = task;

    let actions = document.createElement("div");
    actions.className = "actions";

    let completeBtn = document.createElement("button");
    completeBtn.innerText = "✔";
    completeBtn.className = "complete-btn";

    completeBtn.onclick = function(){
        span.classList.toggle("completed");
    };

    let deleteBtn = document.createElement("button");
    deleteBtn.innerText = "🗑";
    deleteBtn.className = "delete-btn";

    deleteBtn.onclick = function(){
        li.remove();
    };

    actions.appendChild(completeBtn);
    actions.appendChild(deleteBtn);

    li.appendChild(span);
    li.appendChild(actions);

    document.getElementById("taskList").appendChild(li);

    input.value = "";
    input.focus();
}

document.getElementById("taskInput").addEventListener("keypress", function(event){

    if(event.key === "Enter"){
        addTask();
    }

});