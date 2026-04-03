import { Box } from "@mui/material";
import { EditableTitle } from "./EditableTitle";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  changeTodolistTitleAC,
  deleteTodolistAC,
  TodoListType,
} from "./model/todolists-reducer";
import { useAppDispatch } from "./common/hooks/useAppDispatch";
import IconButton from "@mui/material/IconButton";

type Props = {
  todolist: TodoListType;
};

export const TodolistTitle = ({ todolist }: Props) => {
  const { idTodo, titleTodo } = todolist;
  const dispatch = useAppDispatch();

  const deleteTodoList = () => {
    dispatch(deleteTodolistAC({ todolistId: idTodo }));
  };

  const updateTodolistTitle = (title: TodoListType["titleTodo"]) => {
    dispatch(changeTodolistTitleAC({ todolistId: idTodo, title }));
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
      <h3 style={{ alignSelf: "center" }}>
        <EditableTitle value={titleTodo} onChange={updateTodolistTitle} />
      </h3>
      <IconButton
        aria-label="delete"
        size="small"
        color="primary"
        onClick={deleteTodoList}
      >
        <DeleteIcon fontSize="small" />
      </IconButton>
    </Box>
  );
};
