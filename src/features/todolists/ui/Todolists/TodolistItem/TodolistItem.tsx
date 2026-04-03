import { CreateItemForm } from "@/common/components/CreateItemForm/CreateItemForm";
import { useAppDispatch } from "@/common/hooks/useAppDispatch";
import { createTaskAC } from "@/features/todolists/model/tasks-reducer";
import { TodoListType } from "@/features/todolists/model/todolists-reducer";
import { Paper, Box } from "@mui/material";
import { FilterButtons } from "./FilterButtons/FilterButtons";
import { Tasks } from "./Tasks/Tasks";
import { TodolistTitle } from "./TodolistTitle/TodolistTitle";

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
