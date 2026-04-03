import { useAppDispatch } from "@/common/hooks/useAppDispatch";
import { CreateItemForm } from "@/common/components/CreateItemForm/CreateItemForm";
import {
  createTodolistAC,
  TodoListType,
} from "@/features/todolists/model/todolists-reducer";
import { Container, Grid } from "@mui/material";
import { Todolists } from "@/features/todolists/ui/Todolists/Todolists";

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
