import {Todo} from '../classes';

import { todoList } from '../index';

//Referencias en el HTML
const divTodoList = document.querySelector('.todo-list'); //selecciona el div por su clase
const txtInput = document.querySelector('.new-todo'); //selecciona el input por su clase
const btnBorrar = document.querySelector('.clear-completed'); //selecciona el boton por su clase
const ulFilter = document.querySelector('.filters'); //selecciona el ul por su clase
const anchorFiltros = document.querySelectorAll('.filtro'); //selecciona todos los que tienen esa clase
const contador = document.querySelector('.todo-count');

export const crearTodoHtml = (todo) => { //crea el código del ToDo
    const htmlTodo = `
    <li class="${(todo.completado) ? "completed" : ""}" data-id="${ todo.id }">
        <div class="view">
            <input class="toggle" type="checkbox" "${(todo.completado) ? "checked" : ""}">
            <label>${todo.tarea}</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="Create a TodoMVC template">
    </li>`;

    const div = document.createElement('div');  //crea un div como container
    div.innerHTML = htmlTodo;  //le asigna todo el todo como html

    divTodoList.append(div.firstElementChild); //lo añade al container div
    contador.innerHTML = `<strong>${todoList.todos.length}</strong> pendiente(s)`;
    return div.firstElementChild;

}

//Eventos
txtInput.addEventListener('keyup', (event) => { //escucha un evento cuando se presione una tecla keyup
    if(event.keyCode === 13 && txtInput.value.length > 0){  //cuando sea enter
        const nuevoTodo = new Todo(txtInput.value);
        todoList.nuevoTodo(nuevoTodo);
        crearTodoHtml(nuevoTodo);
        contador.innerHTML = `<strong>${todoList.todos.length}</strong> pendiente(s)`;
        txtInput.value = '';
    }
})

divTodoList.addEventListener('click', (event) =>{
    const nombreElemento = event.target.localName; //input, label, button
    const todoElemento = event.target.parentElement.parentElement; //li
    const todoId = todoElemento.getAttribute('data-id'); //obtiene el data-id del li

    if(nombreElemento.includes('input')){//click en el check
        todoList.marcarCompletado(todoId);
        console.log(todoElemento);
        todoElemento.classList.toggle('completed');
        console.log(todoList);
    }else if(nombreElemento.includes('button')){  //borrar todo
        console.log(todoId);
        todoList.eliminarTodo(todoId);
        divTodoList.removeChild(todoElemento);
    }
    contador.innerHTML = `<strong>${todoList.todos.length}</strong> pendiente(s)`;
});

btnBorrar.addEventListener('click', ()=>{
    todoList.eliminarCompletados();
    for(let i = divTodoList.children.length - 1; i>= 0; i--){
        const elemento = divTodoList.children[i];
        if(elemento.classList.contains('completed')){
            divTodoList.removeChild(elemento);
        }
    }
    contador.innerHTML = `<strong>${todoList.todos.length}</strong> pendiente(s)`;
});

ulFilter.addEventListener('click', (event) => {
    const filtro = event.target.text;
    if(!filtro)return;

    anchorFiltros.forEach(elemento => elemento.classList.remove('selected'));
    event.target.classList.add('selected');
    for (const elemento of divTodoList.children) {
        elemento.classList.remove('hidden');
        const completado = elemento.classList.contains('completed');

        switch (filtro) {
            case 'Pendientes':
                if(completado){
                    elemento.classList.add('hidden');
                }
                break;
            case 'Completados':
                if(!completado){
                    elemento.classList.add('hidden');
                }
                break;
        }
    }
})