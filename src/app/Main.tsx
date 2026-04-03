import { useAppDispatch } from "@/common/hooks/useAppDispatch";
import { CreateItemForm } from "@/CreateItemForm";
import {
  createTodolistAC,
  TodoListType,
} from "@/model/todolists-reducer";
import { Todolists } from "@/Todolists";
import { Container, Grid } from "@mui/material";

export const Main = () => {
  const dispatch = useAppDispatch();

  const createTodoList = (title: TodoListType["titleTodo"]) => {
    const action = createTodolistAC(title);
    dispatch(action);
  };

  return (
    <Container maxWidth={"lg"}>
      <Grid container spacing={2} sx={{ mt: 2 }}>
        <CreateItemForm onCreateItem={createTodoList} />
      </Grid>
      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Todolists />
      </Grid>
    </Container>
  );
};
