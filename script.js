const inputBox = document.getElementById("inputBox");
const addBtn = document.getElementById("addBtn");
const todoList = document.getElementById("todoList");

let editTodo = null;

//function to add to do
const addTodo = () => {
  // alert("hello")
  const inputText = inputBox.value.trim();
  if (inputText.length <= 0) {
    alert("Enter Todo");
    return false; //ye black task create nhi krega
  }

  if (addBtn.value === "Save") {
    editTodo.target.previousElementSibling.innerHTML = inputText;
    editLocalTodos(inputText);
    addBtn.value = "Add";
    inputBox.value = "";
  } else {
    //creating p tag

    const li = document.createElement("li"); //created a li element , this is called DOM manipulation

    const p = document.createElement("p"); //created a p element , this is called DOM manipulation

    p.innerHTML = inputText; //innerHTMLmain inputText ko fill krna hai

    li.appendChild(p); //li ke andar P ajaayega

    //creating edit button
    const editBtn = document.createElement("button");
    editBtn.innerText = "Edit";
    editBtn.classList.add("btn", "editBtn"); //class add kr rhe hain taaki hum ise css main access kr sake
    li.appendChild(editBtn);

    //creating delete button

    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "Remove";
    deleteBtn.classList.add("btn", "deleteBtn"); //class add kr rhe hain taaki hum ise css main access kr sake
    li.appendChild(deleteBtn);

    todoList.appendChild(li); //todoList ke andar li ajaayega

    inputBox.value = ""; // taaki task niche add hone ke baad , dialogue box khaali ho jaaye dubara likhne ke liye

    saveLocalTodos(inputText);
  }
};

//function to update: edit/delete todo
const updateTodo = (e) => {
  if (e.target.innerHTML === "Remove") {
    todoList.removeChild(e.target.parentElement); //it removes the parent element i.e. li
    deleteLocalTodos(e.target.parentElement);
  }

  if (e.target.innerHTML === "Edit") {
    inputBox.value = e.target.previousElementSibling.innerHTML;
    inputBox.focus(); //taaki edit pe click krne pe cursor input box pe automatically chala jaaye
    addBtn.value = "Save"; //taaki edit button pe click krne pe add button change hoke edit likha ajaaye

    editTodo = e;
  }
};

//function to save local todo
const saveLocalTodos = (todo) => {
  let todos;

  if (localStorage.getItem("todos") === null) {
    todos = [];
  }
   else {
  
  todos = JSON.parse(localStorage.getItem("todos")); // parse isliye use kiya taaki string se object main bnaa sake values ko
}
todos.push(todo);
localStorage.setItem("todos", JSON.stringify(todos)); //stringify isliye use kiya kyunki json by default object create krta hai , to hum use string main convert krlenge stringify se
}

//function to get local todo
const getLocalTodos = () => {
    let todos;

    if (localStorage.getItem("todos") === null) {
      todos = [];
    }
     else {
    
    todos = JSON.parse(localStorage.getItem("todos")); // parse isliye use kiya taaki string se object main bnaa sake values ko

    todos.forEach(todo => {
        const li = document.createElement("li"); //created a li element , this is called DOM manipulation

        const p = document.createElement("p"); //created a p element , this is called DOM manipulation
    
        p.innerHTML = todo; //innerHTMLmain inputText ko fill krna hai
    
        li.appendChild(p); //li ke andar P ajaayega
    
        //creating edit button
        const editBtn = document.createElement("button");
        editBtn.innerText = "Edit";
        editBtn.classList.add("btn", "editBtn"); //class add kr rhe hain taaki hum ise css main access kr sake
        li.appendChild(editBtn);
    
        //creating delete button
    
        const deleteBtn = document.createElement("button");
        deleteBtn.innerText = "Remove";
        deleteBtn.classList.add("btn", "deleteBtn"); //class add kr rhe hain taaki hum ise css main access kr sake
        li.appendChild(deleteBtn);
    
        todoList.appendChild(li); //todoList ke andar li ajaayega
    })
  }
}

// function to delete local todo
const deleteLocalTodos = (todo) => {
    let todos;

    if (localStorage.getItem("todos") === null) {
      todos = [];
    }
     else {  
    todos = JSON.parse(localStorage.getItem("todos")); // parse isliye use kiya taaki string se object main bnaa sake values ko
  }

  let todoText =  todo.children[0].innerHTML;
 
  let todoIndex = todos.indexOf(todoText);
  //TAAKI HUME PTA LG ske ki humara removed item ki index konsa hai oor fr use target krke usko local storage se htaa denge 
  todos.splice(todoIndex, 1);
  localStorage.setItem('todos', JSON.stringify(todos))
  console.log(todoIndex)   
}

const editLocalTodos = (todo)=> {
let todos = JSON.parse(localStorage.getItem("todos"));
let todoIndex = todos.indexOf(todo);
todos[todoIndex] = inputBox.value;
localStorage.setItem("todos", JSON.stringify(todos));
}

document.addEventListener('DOMContentLoaded',getLocalTodos)       //taaki humara poora html page reload ho fr bhi content reload na ho 
addBtn.addEventListener("click", addTodo);
todoList.addEventListener("click", updateTodo);
