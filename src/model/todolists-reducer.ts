import { TodoListType } from "../App";
import { v1 } from "uuid";

const initialState: TodoListType[] = [];

export type DeleteTodolistAction = ReturnType<typeof deleteTodolistAC>;
export type CreateTodolistAction = ReturnType<typeof createTodolistAC>;
export type ChangeTodolistTitle = ReturnType<typeof changeTodolistTitleAC>
export type ChangeTodolistFilter = ReturnType<typeof changeTodolistFilterAC>
export type Actions = DeleteTodolistAction | CreateTodolistAction | ChangeTodolistTitle | ChangeTodolistFilter

export const todolistsReducer = (
  state: TodoListType[] = initialState,
  action: Actions,
): any => {
  switch (action.type) {
    case "delete_todolist": {
      return state.filter((todolist) => todolist.idTodo !== action.payload.id);
    }
    case "create_todolist": {
      const newTodo: TodoListType = {
        idTodo: action.payload.id,
        titleTodo: action.payload.title,
        filter: "all",
      };
      console.log(newTodo.idTodo, "idTodo TODOLIST")
      return [...state, newTodo];
    }
    case "change_todolist_title": {
        return state.map(todolist => todolist.idTodo === action.payload.id ? {...todolist, titleTodo: action.payload.title} : todolist)
    }
    case "change_todolist_filter": {
        return state.map(todolist => todolist.idTodo === action.payload.id ? {...todolist, filter: action.payload.filter} : todolist)
    }
    default:
      return state;
  }
};

export const deleteTodolistAC = (id: TodoListType["idTodo"]) => {
  return {
    type: "delete_todolist",
    payload: {
      id: id,
    },
  } as const;
};

export const createTodolistAC = (payload:{title: TodoListType["titleTodo"], todolistId: TodoListType['idTodo']}) => {
  return {
    type: "create_todolist",
    payload: {
      id: payload.todolistId,
      title: payload.title,
    },
  } as const;
};

export const changeTodolistTitleAC = (payload: {
  id: TodoListType["idTodo"],
  title: TodoListType["titleTodo"],
}) => {
  return {
    type: "change_todolist_title",
    payload: {
      id: payload.id,
      title: payload.title,
    },
  } as const;
};

export const changeTodolistFilterAC = (payload: {
    id: TodoListType['idTodo'],
    filter: TodoListType['filter'],
}) => {
    return {
        type: "change_todolist_filter",
        payload: {
            id: payload.id,
            filter: payload.filter,
        },
    } as const;
};