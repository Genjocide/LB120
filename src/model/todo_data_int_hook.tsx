import { useEffect } from 'react'
import { useStoreActions } from '../store/StoreModel';


const useTodoInitDataHook = () => {
    const initData = useStoreActions(actions => actions.todoModel.initData)
    useEffect(
        () => {
            initData()
            
        }, []
    )
}

export { useTodoInitDataHook }