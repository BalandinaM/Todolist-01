import { useMemo, useReducer, useState } from "react";
import "./App.css";
import { TodolistItem } from "../TodolistItem";
import { CreateItemForm } from "../CreateItemForm";
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import { Container, CssBaseline, Grid } from "@mui/material";
import { SwitchCustom } from "../SwitchCustom";
import { ThemeProvider } from "@mui/material/styles";
import {getTheme} from "../common/theme/theme";
import { changeTodolistFilterAC, changeTodolistTitleAC, createTodolistAC, deleteTodolistAC } from "../model/todolists-reducer";
import { changeTaskStatusAC, changeTaskTitleAC, createTaskAC, deleteTaskAC } from "../model/tasks-reducer";
import { useAppSelector } from "../common/hooks/useAppSelector";
import { selectTodolists } from "../model/todolists-selectors";
import { selectTasks } from "../model/tasks-selectors";
import { useAppDispatch } from "../common/hooks/useAppDispatch";
import { selectThemeMode } from "./app-selectors";
import { changeThemeModeAC } from "./app-reducer";

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

export const App = () => {
  const todoLists = useAppSelector(selectTodolists)
  const tasks = useAppSelector(selectTasks)
  const dispatch = useAppDispatch()
  const themeMode = useAppSelector(selectThemeMode)

  const deleteTask = (taskId: Task["id"], todolistId: TodoListType["idTodo"]) => {
    dispatch(deleteTaskAC({todolistId, taskId}))
  };

  const changeFilter = (todolistId: TodoListType["idTodo"], filter: FilterValues ) => {
    dispatch(changeTodolistFilterAC({todolistId, filter}))
  };

  const createTask = (title: Task["title"], todolistId: TodoListType["idTodo"]) => {
    dispatch(createTaskAC({title, todolistId}))
  };

  const changeTaskStatus = (taskId: Task["id"], isDone: Task["isDone"], todolistId: TodoListType["idTodo"]) => {
    dispatch(changeTaskStatusAC({todolistId,taskId,isDone}))
  };

  const deleteTodoList = (todolistId: TodoListType["idTodo"]) => {
      dispatch(deleteTodolistAC({todolistId}))
  }

  const createTodoList = (title: TodoListType["titleTodo"]) => {
    const action = createTodolistAC(title)
    dispatch(action)
  }

  const updateTodolistTitle = (todolistId: TodoListType["idTodo"], title: TodoListType["titleTodo"]) => {
    dispatch(changeTodolistTitleAC({todolistId, title}))
  }

  const updateTaskTitle = (todolistId: TodoListType["idTodo"], taskId: Task["id"], title: TodoListType["titleTodo"]) => {
    dispatch(changeTaskTitleAC({todolistId,taskId,title}))
  }

  const changeMode = () => {
    dispatch(changeThemeModeAC({themeMode: themeMode === 'light' ? 'dark' : 'light'}))
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
