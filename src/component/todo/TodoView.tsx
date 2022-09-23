import React from 'react'

import NewTodo from './NewTodo'
import EditTodo from './EditTodo'

import { Grid } from '@material-ui/core'

import { useStoreState } from "../../store/StoreModel";


const TodoView: React.FC = () => {
    const selectedTodo = useStoreState(state => state.todoModel.selectedTodo)

    return(
        <Grid container direction='column' spacing={1} >
            { selectedTodo === null
                ? <Grid item >Neues Nummernschild<NewTodo /></Grid>
                : <Grid item >Nummernschild ändern<EditTodo /></Grid>
            }
        </Grid>
    )
}

export default TodoView