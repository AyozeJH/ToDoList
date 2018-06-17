$(document).ready(function(){

let todoList = [];

//All Functions
$("#create").on("click", createTodo);
$("ul").on("click", "#exclamation", spotTodo);
$("ul").on("click", "#modify", changeTodo);
$("ul").on("click", "#saveTodo", saveChange);
$("ul").on("click", "#check", checkOff);
$("ul").on("click", "#delete", deleteTodo);

//Create a To Do
function createTodo(){ 
    let todoText = $("#newTodo").val().trim();
    if(todoText.length < 1){
        alert("You have to insert a To Do!");
    }
    else if($.inArray(todoText, todoList) !== -1){
        alert("You already have this To Do!");
    }
    else {
    todoList.push(todoText);
    $("#newTodo").val("");
    $("ul").append(
        "<li><span class='textItem'>" + 
        todoText + "</span>" + "." +  "<input type='text' id='editText'><button id='saveTodo'>save</button><i id='delete' class='fas fa-trash-alt'></i><i id='check' class='fas fa-check-square'></i><i id='modify' class='fas fa-edit'></i><i id='exclamation' class='fas fa-exclamation-triangle'></i></li>"
    )};    
}

//Highlight a Specific To Do
function spotTodo(event){    
    $(this).parent().toggleClass("important");
    event.stopPropagation();       
}

//Modify a Specific To Do
function changeTodo(event){
    let currentText = $(this).parent().find(".textItem").text();
    $(this).parent().find('#editText').val(currentText);
    $(this).parent().find('#editText').show();
    $(this).parent().find('#saveTodo').show();
    $(this).parent().find(".textItem").hide();    
    event.stopPropagation();       
}

//Save Modified To Do
function saveChange(event){
    let newTodo = $(this).parent().find('#editText').val().trim();
    if(newTodo.length < 1){
        alert("You have to insert a To Do!");
    }
    else if($.inArray(newTodo, todoList) !== -1){
        alert("You already have this To Do!");
    }
    else {
        $(this).hide();
        deleteTodo(event);  
        $(this).parent().find('#editText').hide();
        $(this).parent().find(".textItem").text(newTodo);
        $(this).parent().find('.textItem').show();
        todoList.push(newTodo);
        event.stopPropagation();
    }
}

//Check Off a Specific To Do
function checkOff(event){
    $(this).parent().toggleClass("completed");
    if($(this).parent().hasClass("important")){
        $(this).parent().removeClass("important");
    }
    $(this).toggleClass("fa-check-square fa-undo");
    event.stopPropagation();
}

//Delete a To Do
function deleteTodo(event){
    $(this).parent().remove();
    let remove = $(this).parent();    
    todoList.splice($.inArray(remove, todoList),1);
    event.stopPropagation();
}

});