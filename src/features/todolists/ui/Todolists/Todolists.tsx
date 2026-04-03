import { useAppSelector } from "@/common/hooks/useAppSelector";
import { Grid } from "@mui/material";
import { selectTodolists } from "../../model/todolists-selectors";
import { TodolistItem } from "./TodolistItem/TodolistItem";


export const Todolists = () => {
  const todoLists = useAppSelector(selectTodolists);
 
  return (
    <>
      {todoLists.map((todolist) => {
        return (
          <Grid key={todolist.idTodo} size={{ xs: 12, sm: 6, md: 4 }}>
            <TodolistItem
              todolist={todolist}
            />
          </Grid>
        );
      })}
    </>
  );
};
