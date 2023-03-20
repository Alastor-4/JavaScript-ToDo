import './styles.css';

import {Todo, TodoList} from './classes';
import { crearTodoHtml } from './js/componentes';

export const todoList = new TodoList();

todoList.todos.forEach(crearTodoHtml);
//al hacerlo asi en lugar de todoList.todos.forEach(todo => crearTodoHtml(todo)) se pasa el mismo de argumento, solo si es 1

console.log('todos', todoList.todos);
