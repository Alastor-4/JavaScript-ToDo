import { Todo } from './todo.class';

export class TodoList{
    constructor(){
        this.cargarLocalStorage();
    }

    nuevoTodo(todo){
        this.todos.push(todo);
        this.guardarLocalStorage();
    }

    eliminarTodo(id){
        this.todos = this.todos.filter(todo =>  todo.id != id);
        console.log(this.todos);
        this.guardarLocalStorage();
    }

    marcarCompletado(id){
        for(const todo of this.todos){
            if(todo.id == id){
                todo.completado = !todo.completado;
                this.guardarLocalStorage();
                console.log('guardé');
                break;
            }
        }
    }

    eliminarCompletados(){
        this.todos = this.todos.filter(todo => !todo.completado);
        console.log(this.todos);
        this.guardarLocalStorage();
    }

    guardarLocalStorage(){
        localStorage.setItem("todo", JSON.stringify(this.todos));
    }

    cargarLocalStorage(){
        this.todos = (localStorage.getItem('todo'))
                        ? JSON.parse(localStorage.getItem('todo'))
                        : [];

        this.todos = this.todos.map(Todo.fromJson); //permite barrer cada objeto dentro de un arreglo, pasarlo por una
    }

}