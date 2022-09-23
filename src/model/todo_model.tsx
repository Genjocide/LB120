import { Action, Thunk, Computed, action, thunk, computed } from 'easy-peasy'

import Todo from './todo'
import todoService from'../service/fakeTodoService'
// import todoService from'../service/restTodoService'

export interface TodoModel {
    todos: Todo[]


    initData:        Thunk<TodoModel>

    add:             Thunk<TodoModel, Todo>
    modify:          Thunk<TodoModel, Todo>
    delete:          Thunk<TodoModel, Todo>
    toggleCompleted: Thunk<TodoModel, Todo>


    _initData: Action<TodoModel, Todo[]>
    _add:      Action<TodoModel, Todo>
    _delete:   Action<TodoModel, Todo>
    _replace:  Action<TodoModel, Todo>


    selectedTodo: Todo | null
    setSelectedTodo: Action<TodoModel, Todo>
    resetSelectedTodo: Action<TodoModel>

    pendingTodos: Computed<TodoModel, number>
}

const todoModel: TodoModel = {
    todos: [],


    initData: thunk(async (actions) => {
        await todoService.getTodoList().then(
            (todoList: Todo[]) => { actions._initData(todoList) }
        )
    }),

    add: thunk(async (actions, todo) => {
        await todoService.addTodo(todo).then(
            (todo: Todo) => { actions._add(todo) }
        )
    }),

    modify: thunk(async (actions, todo) => {
        await todoService.updateTodo(todo).then(
            (todo: Todo) => { actions._replace(todo) }
        )
    }),

    delete: thunk(async (actions, todo) => {
        await todoService.deleteTodo(todo).then(
            () => { actions._delete(todo) }
        )
    }),

    toggleCompleted: thunk(async (actions, todo: Todo) => {
        todo.completed = !todo.completed
        await todoService.updateTodo(todo).then(
            (todo: Todo) => { actions._replace(todo) }
        )
    }),


    _initData: action((state, todoList) => {
        state.todos = todoList.slice() // Shallow copy
    }),

    _add: action((state, todo) => {
        state.todos = [{...todo}, ...state.todos]
    }),

    _delete: action((state, todo) => {
        for( var i = 0; i < state.todos.length; i++) { 
            if ( state.todos[i].id === todo.id) {
                state.todos.splice(i, 1); 
            }
        }
        if (state.selectedTodo && todo.id === state.selectedTodo.id) {
            state.selectedTodo = null
        }
    }),

    _replace: action((state, todo) => {
        for( var i = 0; i < state.todos.length; i++) { 
            if ( state.todos[i].id === todo.id) {
                state.todos[i] = {...todo} 
            }}
    }),


    selectedTodo: null,

    setSelectedTodo: action((state, todo) => {
        state.selectedTodo = {...todo}
    }),

    resetSelectedTodo: action((state) => {
        state.selectedTodo = null
    }),

    pendingTodos: computed((state) => {
        const counter = (sum: number, todo: Todo): number => sum + (todo.completed ? 0 : 1)
        return state.todos.reduce(counter, 0)
    })
}

export { todoModel }
