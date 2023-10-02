import { useEffect, useReducer } from "react"
import { todoReducer } from "./todoReducer"

export const useTodo = () => {

    const initialState = [
        // {
        //     id: new Date().getTime(),
        //     description: 'Recolectar la piedra del Alma',
        //     done: false
        // },
        // {
        //     id: new Date().getTime() * 3,
        //     description: 'Recolectar la piedra del Tiempo',
        //     done: false
        // },
    ]
    
    const initializer = () => {
        return JSON.parse( localStorage.getItem('todos')) || []
    }


    const [todos, dispatch] = useReducer(todoReducer, initialState, initializer)

    useEffect(() => {
      localStorage.setItem('todos', JSON.stringify( todos ))

    }, [todos])
    

    const handleNewTodo = ( todo ) => {
        const action = {
            type: '[TODO] Add Todo',
            payload: todo
        }

        dispatch( action )
    }

    const handleDeleteTodo = ( id ) => {
        const action = {
            type: '[TODO] Remove Todo',
            payload: id
        }

        dispatch( action )
    }

    const onToggleTodo = ( id ) => {
        const action = {
            type: '[TODO] Toggle Todo',
            payload: id
        }

        dispatch( action )
    }
  
    return {
        todos,
        handleNewTodo,
        handleDeleteTodo,
        onToggleTodo,
        todosCount: todos.length,
        pendingTodosCount: todos.filter( todo => !todo.done).length
    }

}
