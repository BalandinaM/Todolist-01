import {combineReducers, configureStore} from '@reduxjs/toolkit'
import {tasksReducer} from '../model/tasks-reducer'
import {todolistsReducer} from '../model/todolists-reducer'
 
// создание store
export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    todolists: todolistsReducer,
  },
});
 
// автоматическое определение типа всего объекта состояния
export type RootState = ReturnType<typeof store.getState>
// автоматическое определение типа метода dispatch
export type AppDispatch = typeof store.dispatch
 
// для возможности обращения к store в консоли браузера
// @ts-ignore
window.store = store