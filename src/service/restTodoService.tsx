import axios from 'axios'

import TodoService from './TodoService'
import Todo from '../model/todo'



const baseURL: string = 'http://localhost:3003'


const http = axios.create({
    baseURL: baseURL,
    timeout: 2000,
    headers: {'Content-Type': 'application/json'},
})

async function callForData<R>(httpFun: any, uri: string, params?: any): Promise<R> {
    return new Promise<R>((resolve, reject) => {
        httpFun(uri, params)
            .then((response: any) => { resolve(response.data) })
            .catch((error: any) => { reject(error) })
    })
}

class RestTodoService implements TodoService {
    
    async getTodoList(): Promise<Todo[]> {
        return callForData(http.get, '/todos?_limit=15')
    }

    async addTodo(todo: Todo): Promise<Todo> {
        return callForData(http.post, '/todos', todo)
    }

    async deleteTodo(todo: Todo): Promise<void> {
        return callForData(http.delete, `/todos/${todo.id}`)
    }

    async updateTodo(todo: Todo): Promise<Todo> {
        return callForData(http.put, `/todos/${todo.id}`, todo)
    }
}

const todoService = new RestTodoService()
export default todoService