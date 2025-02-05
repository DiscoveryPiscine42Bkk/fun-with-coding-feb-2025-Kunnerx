function getCookies() {
    let cookies = document.cookie.split('; ');
    let cookieObj = {};
    cookies.forEach(cookie => {
        let [key, value] = cookie.split('=');
        cookieObj[key] = value ? JSON.parse(value) : [];
    });
    return cookieObj;
}

function setCookie(name, value) {
    document.cookie = `${name}=${JSON.stringify(value)}; path=/;`; 
}

function loadTodos() {
    let cookies = getCookies();
    let todos = cookies.todos || [];
    let list = document.getElementById("ft_list");
    list.innerHTML = "";
    todos.forEach(todo => {
        addTodoElement(todo);
    });
}

function addTodo() {
    let text = prompt("Enter a new To-Do:");
    if (text) {
        let todos = getCookies().todos || [];
        todos.unshift(text);
        setCookie("todos", todos);
        addTodoElement(text);
    }
}

function addTodoElement(text) {
    let list = document.getElementById("ft_list");
    let todoDiv = document.createElement("div");
    todoDiv.className = "todo";
    todoDiv.textContent = text;
    todoDiv.onclick = function() {
        if (confirm("Do you want to delete this To-Do?")) {
            let todos = getCookies().todos || [];
            todos = todos.filter(todo => todo !== text);
            setCookie("todos", todos);
            todoDiv.remove();
        }
    };
    list.prepend(todoDiv);
}

window.onload = loadTodos;
