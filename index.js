
//global variable
var todoArray = []; // globalfunction 
/**
 * function to store todo in local storage
 */

function saveTodo() {
    var title = document.getElementById("title").value;
    todoArray.push(title);//store new element in array
    localStorage.setItem("todos", todoArray.toString());
    fetchAllTodos();
    document.getElementById("title").value = "";
}
/**
 * function to fetch all todos
 * show todos in table
 */

function fetchAllTodos() {
    var str = localStorage.getItem("todos");
    todoArray = str.split(",");
    var htmlString = `
    <tr>
        <th>sr.no</th>
        <th>Title</th>
        <th>Actions</th>
    </tr>
    `;
    var counter = 0;
    todoArray.forEach(ele => {
        counter++;
        htmlString += `
        <tr>
            <td> ${counter}</td>
            <td> ${ele}</td>
            <td>
                <button class="btn btn-outline-warning" onclick="editTodos(${counter-1})">
                Edit
                </button>
                <button class="btn btn-outline-danger" onclick="deleteTodos(${counter-1})">
                Delete
                </button>
            </td>
        </tr>
    `;
    })
    document.getElementById("todo-table").innerHTML = htmlString;
}

/**
 * change the todos
 * @param {*} index 
 */
function editTodos(index){
var newValue=prompt("Do you want to update the value",todoArray[index]);
if(newValue!=null && newValue!=""){
    todoArray[index]=newValue;//replace current value with new value
    localStorage.setItem("todos",todoArray.toString());//update localstroage
    fetchAllTodos();
}
}


function deleteTodos(index){
    if(confirm(`Do you want to delete ${todoArray[index]}?`)){
    todoArray.splice(index,1);//delete single element from the array of given index
    localStorage.setItem("todos",todoArray.toString());//set the new array
    fetchAllTodos();
}
}


function removeAllTodos() {
 todoArray=[];
 localStorage.setItem("todos",todoArray.toString());
document.getElementById("todo-table").innerHTML = "";

}


function enterKeyPressed(event){
    if(event.key=="Enter"){
        saveTodo();
    }
}