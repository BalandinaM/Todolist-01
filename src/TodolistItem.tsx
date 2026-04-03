import { CreateItemForm } from "./CreateItemForm";
import IconButton from "@mui/material/IconButton";
import {
  Box,
  ButtonGroup,
  Paper,
} from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import { MenuOpen, DirectionsRun, TaskAlt } from "@mui/icons-material";
import { useAppDispatch } from "./common/hooks/useAppDispatch";
import { useAppSelector } from "./common/hooks/useAppSelector";
import {
  createTaskAC,
  Task,
} from "./model/tasks-reducer";
import { selectTasks } from "./model/tasks-selectors";
import {
  changeTodolistFilterAC,
  TodoListType,
  FilterValues,
} from "./model/todolists-reducer";
import { TodolistTitle } from "./TodolistTitle";
import { Tasks } from "./Tasks";
import { FilterButtons } from "./FilterButtons";

type Props = {
  todolist: TodoListType;
};

export const TodolistItem = ({ todolist }: Props) => {
  const { idTodo} = todolist;
  const dispatch = useAppDispatch();

  const createTaskHandler = (title: string) => {
    dispatch(createTaskAC({ title, todolistId: idTodo }));
  };

  return (
    <Paper elevation={3}>
      <Box sx={{ p: 3, display: "flex", flexDirection: "column" }}>
        <TodolistTitle todolist={todolist}/>
        <CreateItemForm onCreateItem={createTaskHandler} />
        <Tasks todolist={todolist}/>
        <FilterButtons  todolist={todolist}/>
      </Box>
    </Paper>
  );
};
