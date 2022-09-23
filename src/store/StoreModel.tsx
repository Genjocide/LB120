import { createStore, createTypedHooks } from 'easy-peasy'
import { TodoModel, todoModel } from '../model/todo_model'
// import { TodoModel, todoModel } from '../model/todo_model_local'


interface StoreModel {
    todoModel: TodoModel;
}

const store = createStore<StoreModel>({
    todoModel: todoModel 
})

export default store

const { 
    useStoreActions,
    useStoreDispatch,
    useStoreState,
} = createTypedHooks<StoreModel>()

export { useStoreActions, useStoreDispatch, useStoreState }
