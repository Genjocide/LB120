import React from 'react'
import { Grid, Typography } from '@material-ui/core'

import TodoForm from './TodoForm'
import { TodoImpl } from '../../model/todo'
import { useStoreState, useStoreActions } from '../../store/StoreModel'

interface EditTodoProps {}

const EditTodo: React.FC<EditTodoProps> = (props) => {
    const selectedTodo = useStoreState(state => state.todoModel.selectedTodo)
    const modifyTodo = useStoreActions(actions => actions.todoModel.modify)

    if (!selectedTodo) return (null)

    return (
        <Grid container direction='column' spacing={1}>
            <Grid item >
                <Typography variant='h3'>Fahndungs Status</Typography>
            </Grid>
            <Grid item >
                <TodoForm 
                    todo={selectedTodo ? selectedTodo : new TodoImpl('')}
                    submitText='Nummernschild ändern'
                    submitFunction={(todo) => { modifyTodo(todo) }}
                    resetFormAfterSubmit={true}
                />
            </Grid>
        </Grid>
    )
}

export default EditTodo