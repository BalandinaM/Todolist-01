import { createTodolistAC, deleteTodolistAC, TodoListType} from './todolists-reducer'
import { createAction, createReducer, nanoid } from '@reduxjs/toolkit';

export type Task = {
  id: string;
  title: string;
  isDone: boolean;
};

export type TasksStateType = Record<string, Task[]>

const initialState: TasksStateType = {}

export const createTaskAC = createAction<{todolistId: TodoListType['idTodo'], title: Task['title']}>("tasks/createTask")
export const deleteTaskAC = createAction<{todolistId: TodoListType['idTodo'], taskId: Task['id']}>("tasks/deleteTask")
export const changeTaskStatusAC = createAction<{todolistId: TodoListType["idTodo"], taskId: Task["id"], isDone: boolean}>("tasks/changeTaskStatus")
export const changeTaskTitleAC = createAction<{todolistId: TodoListType["idTodo"], taskId: Task["id"], title: Task["title"]}>("tasks/changeTaskTitle") 

export const tasksReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(createTodolistAC, (state, action) => {
      state[action.payload.idTodo] = [];
    })
    .addCase(deleteTodolistAC, (state, action) => {
      delete state[action.payload.todolistId];
    })
    .addCase(createTaskAC, (state, action) => {
      const newTask = {
        id: nanoid(),
        title: action.payload.title,
        isDone: false,
      };
      state[action.payload.todolistId].unshift(newTask);
    })
    .addCase(deleteTaskAC, (state, action) => {
      const index = state[action.payload.todolistId].findIndex(
        (task) => task.id === action.payload.taskId,
      );
      if (index != +-1) {
        state[action.payload.todolistId].splice(index, 1)
      }
    })
    .addCase(changeTaskStatusAC, (state, action) => {
      const tasks = state[action.payload.todolistId]
      const task = tasks.find((task) => task.id === action.payload.taskId)
      if (task) {
        task.isDone = action.payload.isDone
      }
    })
    .addCase(changeTaskTitleAC, (state, action) => {
      const tasks = state[action.payload.todolistId]
      const task = tasks.find(task => task.id === action.payload.taskId)
      if (task) {
      task.title = action.payload.title
    }
    })
})