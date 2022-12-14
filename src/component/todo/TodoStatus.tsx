import React from 'react'
import { Paper, Typography} from '@material-ui/core'

import { useStoreState } from '../../store/StoreModel'

interface TodoStatusProps {}

const TodoStatus: React.FC<TodoStatusProps> = (props) => {
    const pendingTodos = useStoreState(state => state.todoModel.pendingTodos)
    const job = (pendingTodos === 1) ? 'Fahndung' : 'Fahndungen'
    const info = (pendingTodos === 0) ? 'Keine Fahndung offen' : `${pendingTodos}  offene ${job} offen`
    return (
        // <Card >
        //     <CardContent>
        <Paper >
                <Typography
                    variant='h3'
                    align='center'
                >
                    {info}
                </Typography>
        </Paper>
        //     </CardContent>
        // </Card>
    )
}

export default TodoStatus