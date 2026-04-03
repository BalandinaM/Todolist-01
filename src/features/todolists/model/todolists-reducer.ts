import { createAction, createReducer, nanoid } from "@reduxjs/toolkit";

export type FilterValues = 'all' | 'active' | 'completed'

export type TodoListType = {
  idTodo: string
  titleTodo: string
  filter: FilterValues
} 

const initialState: TodoListType[] = [];

export const deleteTodolistAC = createAction<{ todolistId: TodoListType["idTodo"] }>("todolists/deleteTodolist");
export const createTodolistAC = createAction("todolists/createTodolist",(title: TodoListType["titleTodo"]) => {
    return { payload: { titleTodo: title, idTodo: nanoid() } };
  });
export const changeTodolistTitleAC = createAction<{todolistId: TodoListType["idTodo"], title: TodoListType["titleTodo"]}>("todolists/changeTodolistTitle");
export const changeTodolistFilterAC = createAction<{todolistId: TodoListType['idTodo'],filter: TodoListType['filter'],}>("todolists/changeTodolistFilter")


export const todolistsReducer = createReducer(initialState, builder => {
  builder
    .addCase(deleteTodolistAC, (state, action) => {
      const index = state.findIndex(list => list.idTodo === action.payload.todolistId)
      state.splice(index, 1)
    })
    .addCase(createTodolistAC, (state, action) => {
      state.push({...action.payload, filter: 'all'})
    })
    .addCase(changeTodolistTitleAC, (state, action) => {
      const index = state.findIndex(list => list.idTodo === action.payload.todolistId)
      if (index !== -1) state[index].titleTodo = action.payload.title
    })
    .addCase(changeTodolistFilterAC, (state, action) => {
      const todolist = state.find(list => list.idTodo === action.payload.todolistId)
      if (todolist) {
        todolist.filter = action.payload.filter
      }
    })
})








