import { FilterValues, Task, TodoListType } from "./app/App";
import { ChangeEvent } from "react";
import { CreateItemForm } from "./CreateItemForm";
import { EditableTitle } from "./EditableTitle";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from '@mui/icons-material/Delete';
import ClearIcon from '@mui/icons-material/Clear';
import { Box, ButtonGroup, ListItemText, Paper, Typography } from "@mui/material";
import Tooltip from '@mui/material/Tooltip';
import Checkbox from '@mui/material/Checkbox'
import {
  MenuOpen,           
  DirectionsRun,      
  TaskAlt,         
} from '@mui/icons-material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';


type Props = {
  tasks: Task[];
  todolist: TodoListType;
  deleteTask: (taskId: Task["id"], todoId: TodoListType["idTodo"] ) => void;
  changeFilter: (todoId: TodoListType["idTodo"], filter: FilterValues) => void;
  createTask: (title: Task['title'], todoId: TodoListType["idTodo"]) => void;
  changeTaskStatus: (taskId: Task['id'], isDone: Task['isDone'], todoId: TodoListType["idTodo"]) => void;
  deleteTodoList: (todoId: TodoListType["idTodo"]) => void;
  updateTodolistTitle: (todoId: TodoListType["idTodo"], title: TodoListType["titleTodo"]) => void;
  updateTaskTitle: (todoId: TodoListType["idTodo"], taskId: Task["id"], title: TodoListType["titleTodo"]) => void;
};


export const TodolistItem = ({
  tasks,
  todolist,
  deleteTask,
  changeFilter,
  createTask,
  changeTaskStatus,
  deleteTodoList,
  updateTodolistTitle,
  updateTaskTitle,
}: Props) => {
  const createTaskHandler = (title: string) => {
    createTask(title, todolist.idTodo);
  };

  const changeFilterHandler = (filter: FilterValues) => {
    changeFilter(todolist.idTodo, filter);
  };

  const deleteTodolistHandler = () => {
    deleteTodoList(todolist.idTodo);
  };

  const updateTodolistTitleHandler = (title: string) => {
    updateTodolistTitle(todolist.idTodo, title);
  };

  return (
    <Paper elevation={3}>
      <Box sx={{ p: 3, display: "flex", flexDirection: "column",  }}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <h3 style={{alignSelf: "center"}}>
            <EditableTitle
              value={todolist.titleTodo}
              onChange={updateTodolistTitleHandler}
            />
          </h3>
          <IconButton
            aria-label="delete"
            size="small"
            color="primary"
            onClick={deleteTodolistHandler}
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Box>
        <CreateItemForm onCreateItem={createTaskHandler} />
        {tasks.length === 0 ? (
          <p>Тасок нет</p>
        ) : (
          <List>
            {tasks.map((task) => {
              const deleteTaskHandler = () => {
                deleteTask(task.id, todolist.idTodo);
              };

              const changeTaskStatusHandler = (
                e: ChangeEvent<HTMLInputElement>,
              ) => {
                changeTaskStatus(
                  task.id,
                  e.currentTarget.checked,
                  todolist.idTodo,
                );
              };

              const updateTaskTitleHandler = (title: string) => {
                updateTaskTitle(todolist.idTodo, task.id, title);
              };

              const label = {
                slotProps: { input: { "aria-label": task.title } },
              };

              return (
                <ListItem
                  key={task.id}
                  sx={{
                    pl: 0,
                    "& .MuiListItemSecondaryAction-root": {
                      right: 0,
                    },
                  }}
                  secondaryAction={
                    <IconButton
                      aria-label="delete"
                      size="small"
                      color="secondary"
                      onClick={deleteTaskHandler}
                    >
                      <ClearIcon fontSize="small" />
                    </IconButton>
                  }
                >
                  <ListItemAvatar>
                    <Checkbox
                      checked={task.isDone}
                      onChange={changeTaskStatusHandler}
                      {...label}
                      icon={<DirectionsRun color="warning" />}
                      checkedIcon={<TaskAlt color="success" />}
                    />
                  </ListItemAvatar>
                  <ListItemText sx={{ flexGrow: 1 }}>
                    <EditableTitle
                      value={task.title}
                      onChange={updateTaskTitleHandler}
                    />
                  </ListItemText>
                </ListItem>
              );
            })}
          </List>
        )}
        <Box sx={{alignSelf: "center"}}>
          <ButtonGroup variant="contained" size="small">
            <Tooltip title="All tasks">
              <IconButton
                aria-label="all tasks"
                size="small"
                color={todolist.filter === "all" ? "warning" : "primary"}
                onClick={() => changeFilterHandler("all")}
              >
                <MenuOpen fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Active tasks">
              <IconButton
                aria-label="active tasks"
                size="small"
                color={todolist.filter === "active" ? "warning" : "primary"}
                onClick={() => changeFilterHandler("active")}
              >
                <DirectionsRun fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Completed tasks">
              <IconButton
                aria-label="completed tasks"
                size="small"
                color={todolist.filter === "completed" ? "warning" : "primary"}
                onClick={() => changeFilterHandler("completed")}
              >
                <TaskAlt fontSize="small" />
              </IconButton>
            </Tooltip>
          </ButtonGroup>
        </Box>
      </Box>
    </Paper>
  );
};
