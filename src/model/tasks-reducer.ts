import { v1 } from 'uuid';
import type { Task, TasksStateType, TodoListType } from '../App'
import { CreateTodolistAction, DeleteTodolistAction } from './todolists-reducer'
 
const initialState: TasksStateType = {}

export type DeleteTaskAction = ReturnType<typeof deleteTaskAC>;
export type CreateTaskAction = ReturnType<typeof createTaskAC>
export type changeTaskStatusAction = ReturnType<typeof changeTaskStatusAC>
export type changeTaskTitleAction = ReturnType<typeof changeTaskTitleAC>

type Actions = CreateTodolistAction | DeleteTodolistAction | DeleteTaskAction | CreateTaskAction | changeTaskStatusAction | changeTaskTitleAction
  
export const tasksReducer = (state: TasksStateType = initialState, action: Actions): TasksStateType => {
  switch (action.type) {
    case 'create_todolist': {
        console.log(action.payload.id)
        console.log(state)
      return {...state, [action.payload.id]: []}
    }
    case 'delete_todolist': {
      const newState = { ...state }
      delete newState[action.payload.id]
      return newState
    }
    case 'delete_task': 
        return {
          ...state,
          [action.payload.idTodo]: state[action.payload.idTodo].filter(
            (task) => task.id !== action.payload.taskId
          ),
        };
    case "create_task":
        const newTask: Task = {
          id: v1(),
          title: action.payload.title,
          isDone: false,
        };
        return {
          ...state,
          [action.payload.todolistId]: [
            newTask,
            ...state[action.payload.todolistId],
          ],
        };
    case "change_task_status":
        const { todolistId, taskId, isDone } = action.payload;
        return {
          ...state,
          [todolistId]: state[todolistId].map((task) =>
            task.id == taskId ? { ...task, isDone } : task,
          ),
        };
    case "change_task_title":
            return {
              ...state,
              [action.payload.todolistId]: state[action.payload.todolistId].map(
                (task) =>
                  task.id === action.payload.taskId
                    ? { ...task, title: action.payload.title }
                    : task,
              ),
            };
    default:
      return state
  }
}

export const deleteTaskAC = (payload: {todolistId: TodoListType['idTodo'], taskId: Task['id']}) => {
    return {
        type: "delete_task",
        payload: {
            idTodo: payload.todolistId,
            taskId: payload.taskId
        }
    } as const
} 

export const createTaskAC = (payload: {todolistId: TodoListType['idTodo'], title: Task['title']}) => ({
    type: "create_task",
    payload: {
        todolistId: payload.todolistId,
        title: payload.title
    }
} as const)

export const changeTaskStatusAC = (payload: {
  todolistId: TodoListType["idTodo"];
  taskId: Task["id"];
  isDone: boolean;
}) =>
  ({
    type: "change_task_status",
    payload: {
      todolistId: payload.todolistId,
      taskId: payload.taskId,
      isDone: payload.isDone,
    },
  }) as const; 

  export const changeTaskTitleAC = (payload: {
    todolistId: TodoListType["idTodo"];
    taskId: Task["id"];
    title: Task["title"];
  }) => ({
    type: "change_task_title",
    payload: {
      todolistId: payload.todolistId,
      taskId: payload.taskId,
      title: payload.title,
    },
  }) as const;