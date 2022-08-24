var form = document.getElementById("form");
var textInput = document.getElementById("textInput");
var dateInput = document.getElementById("dateInput");
var textarea = document.getElementById("textarea");
var add = document.getElementById("add");
var msg = document.getElementById("msg");
var tasks = document.getElementById("tasks");

form.addEventListener("submit", (e)=> {
    e.preventDefault();
    formValidation();
    
});

let formValidation = () => {
    if(textInput.value === "") {
        console.log("failure");
        msg.innerHTML = "Task cannot be blank"
    }
    else{
        console.log("success")
        msg.innerHTML = "";
        acceptData();
        add.setAttribute("data-bs-dismiss", "modal");
        add.click();

        (()=>{
            add.setAttribute("data-bs-dismiss", "");
        })();
    }
}

let data = [{}];

let acceptData = () => {
    data.push({
        text: textInput.value,
        date: dateInput.value,
        description: textarea.value
    })

    localStorage.setItem("data", JSON.stringify(data));
    
    console.log(data)
    createTasks();
}

let createTasks = () => {
    tasks.innerHTML = "";
    data.map((x, y) => {
        return(tasks.innerHTML += `
        <div id="${y}">

            <span class="fw-bold">${x.text}</span>
            <span class="small text-secondary">${x.date}</span>
            <p>${x.description}</p>

            <span class="options">
                <i onclick="editTask(this)" data-bs-toggle="modal" data-bs-target="#form" class="fas fa-edit"></i>
                <i onclick="deleteTask(this);createTasks()" class="fas fa-trash-alt"></i>
            </span>
        </div>
        `);
    });
    resetForm();
};

let resetForm = () =>{
    textInput.value = "";
    dateInput.value = "";
    textarea.value = "";
}

let deleteTask = (e) => {
    e.parentElement.parentElement.remove();
    data.splice(e.parentElement.parentElement.id, 1)

    localStorage.setItem("data", JSON.stringify(data))

    console.log(data);
}

let editTask = (e) => {
    let selectedTask = e.parentElement.parentElement;

    textInput.value = selectedTask.children[0].innerHTML;
    dateInput.value = selectedTask.children[1].innerHTML;
    textarea.value = selectedTask.children[2].innerHTML;

    deleteTask(e);
}

(()=> {
    data = JSON.parse(localStorage.getItem("data")) || [];
    console.log(data);
    createTasks();
})

// function addItem() {

//     var todo = document.getElementById("todo")
//     var list = document.getElementById("list")
//     var addButton = document.getElementById("add-btn") 
//     var li = document.createElement("li");
//     if (todo.value = " "){
//         addButton.disabled = true;
//     }
//     else{
//         li.innerHTML = todo.value;
//         list.appendChild(li); 
        
//         todo.value = "";    
//     }
    
// }