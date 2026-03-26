import { useMemo, useReducer, useState } from "react";
import "./App.css";
import { TodolistItem } from "../TodolistItem";
import { v1 } from "uuid";
import { CreateItemForm } from "../CreateItemForm";
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import { Container, CssBaseline, Grid } from "@mui/material";
import { SwitchCustom } from "../SwitchCustom";
import { ThemeProvider } from "@mui/material/styles";
import {getTheme} from "../theme/theme";
import { changeTodolistFilterAC, changeTodolistTitleAC, createTodolistAC, deleteTodolistAC, todolistsReducer } from "../model/todolists-reducer";
import { changeTaskStatusAC, changeTaskTitleAC, createTaskAC, deleteTaskAC, tasksReducer } from "../model/tasks-reducer";
import { useAppSelector } from "../common/hooks/useAppSelector";
import { selectTodolists } from "../model/todolists-selectors";
import { selectTasks } from "../model/tasks-selectors";
import { useAppDispatch } from "../common/hooks/useAppDispatch";

export type Task = {
  id: string;
  title: string;
  isDone: boolean;
};

export type FilterValues = 'all' | 'active' | 'completed'

export type TodoListType = {
  idTodo: string
  titleTodo: string
  filter: FilterValues
} 

export type TasksStateType = Record<string, Task[]>

type ThemeMode = 'dark' | 'light'

export const App = () => {
  // const todoListId_1 = v1();
  // const todoListId_2 = v1();

  // const initTodoLists: TodoListType[] = [
  //   { idTodo: todoListId_1, titleTodo: "What to learn", filter: "all" },
  //   { idTodo: todoListId_2, titleTodo: "What to buy", filter: "all" },
  // ]

  // const initTasks: TasksStateType = {
  //   [todoListId_1]: [
  //     { id: v1(), title: "HTML&CSS", isDone: true },
  //     { id: v1(), title: "JS", isDone: true },
  //     { id: v1(), title: "ReactJS", isDone: false },
  //     { id: v1(), title: "Redux", isDone: false },
  //     { id: v1(), title: "Typescript", isDone: false },
  //     { id: v1(), title: "RTK query", isDone: false },
  //   ],
  //   [todoListId_2]: [
  //     { id: v1(), title: "Milk", isDone: true },
  //     { id: v1(), title: "Bread", isDone: true },
  //     { id: v1(), title: "Water", isDone: false },
  //     { id: v1(), title: "Butter", isDone: false },
  //   ],
  // }

  // const [todoLists, dispatchTodolists] = useReducer(todolistsReducer, initTodoLists);
  // const [tasks, dispatchTasks] = useReducer(tasksReducer, initTasks);
  const todoLists = useAppSelector(selectTodolists)
  const tasks = useAppSelector(selectTasks)
  const dispatch = useAppDispatch()
  const [themeMode, setThemeMode] = useState<ThemeMode>('light')

  const deleteTask = (taskId: Task["id"], todoId: TodoListType["idTodo"]) => {
    dispatch(deleteTaskAC({todolistId: todoId, taskId: taskId}))
  };

  const changeFilter = (todoId: TodoListType["idTodo"], filter: FilterValues ) => {
    dispatch(changeTodolistFilterAC({id: todoId, filter: filter}))
  };

  const createTask = (title: Task["title"], todoId: TodoListType["idTodo"]) => {
    dispatch(createTaskAC({title: title, todolistId: todoId}))
  };

  const changeTaskStatus = (id: Task["id"], isDone: Task["isDone"], todoId: TodoListType["idTodo"]) => {
    dispatch(changeTaskStatusAC({
      todolistId: todoId,
      taskId: id,
      isDone: isDone
    }))
  };

  const deleteTodoList = (todoId: TodoListType["idTodo"]) => {
      dispatch(deleteTodolistAC(todoId))
      dispatch(deleteTodolistAC(todoId))
  }

  const createTodoList = (title: TodoListType["titleTodo"]) => {
    const todolistId = v1();
    const action = createTodolistAC({title, todolistId})
    dispatch(action)
  }

  const updateTodolistTitle = (todoId: TodoListType["idTodo"], title: TodoListType["titleTodo"]) => {
    dispatch(changeTodolistTitleAC({id: todoId, title: title}))
  }

  const updateTaskTitle = (todoId: TodoListType["idTodo"], taskId: Task["id"], title: TodoListType["titleTodo"]) => {
    dispatch(changeTaskTitleAC({
      todolistId: todoId,
      taskId: taskId,
      title: title
    }))
  }

  const changeMode = () => {
    setThemeMode(themeMode === 'light' ? 'dark' : 'light')
  }

  const theme = useMemo(() => getTheme(themeMode), [themeMode]);

  return (
    <div className="app">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar position="static">
          <Toolbar>
            <Container maxWidth={'lg'}>
              <IconButton color="inherit">
                <MenuIcon />
              </IconButton>
              <Button color="inherit">Sign in</Button>
            </Container>
            <SwitchCustom onChange={changeMode} color={'default'}/>
          </Toolbar>
        </AppBar>
        <Container maxWidth={'lg'}>
          <Grid container spacing={2} sx={{ mt: 2 }}><CreateItemForm onCreateItem={createTodoList}/></Grid>
          <Grid container spacing={2} sx={{ mt: 2 }}>
            {todoLists.map((todolist) => {
              let filteredTasks = tasks[todolist.idTodo];
              if (todolist.filter === "active") {
                filteredTasks = tasks[todolist.idTodo].filter((task) => !task.isDone);
              }
              if (todolist.filter === "completed") {
                filteredTasks = tasks[todolist.idTodo].filter((task) => task.isDone);
              }
      
              return (
                <Grid key={todolist.idTodo}  size={{ xs: 12, sm: 6, md: 4 }}>
                  <TodolistItem
                    // key={todolist.idTodo} убрала т.к. компонент из MUI сам создает ключи
                    todolist={todolist}
                    tasks={filteredTasks}
                    deleteTask={deleteTask}
                    changeFilter={changeFilter}
                    createTask={createTask}
                    changeTaskStatus={changeTaskStatus}
                    deleteTodoList={deleteTodoList}
                    updateTodolistTitle={updateTodolistTitle}
                    updateTaskTitle={updateTaskTitle}
                  />
                </Grid>
              );
            })}
          </Grid>
        </Container>
      </ThemeProvider>
    </div>
  );
};
