import { useAppDispatch } from "@/common/hooks/useAppDispatch";
import { TodoListType, FilterValues, changeTodolistFilterAC } from "@/features/todolists/model/todolists-reducer";
import { MenuOpen, DirectionsRun, TaskAlt } from "@mui/icons-material";
import { Box, ButtonGroup, Tooltip, IconButton } from "@mui/material";


type Props = {
  todolist: TodoListType;
};

export const FilterButtons = ({ todolist }: Props) => {
  const { idTodo, filter} = todolist;
  const dispatch = useAppDispatch();
  const changeFilterHandler = (filter: FilterValues) => {
    dispatch(changeTodolistFilterAC({ todolistId: idTodo, filter }));
  };
  return (
    <Box sx={{ alignSelf: "center" }}>
      <ButtonGroup variant="contained" size="small">
        <Tooltip title="All tasks">
          <IconButton
            aria-label="all tasks"
            size="small"
            color={filter === "all" ? "warning" : "primary"}
            onClick={() => changeFilterHandler("all")}
          >
            <MenuOpen fontSize="small" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Active tasks">
          <IconButton
            aria-label="active tasks"
            size="small"
            color={filter === "active" ? "warning" : "primary"}
            onClick={() => changeFilterHandler("active")}
          >
            <DirectionsRun fontSize="small" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Completed tasks">
          <IconButton
            aria-label="completed tasks"
            size="small"
            color={filter === "completed" ? "warning" : "primary"}
            onClick={() => changeFilterHandler("completed")}
          >
            <TaskAlt fontSize="small" />
          </IconButton>
        </Tooltip>
      </ButtonGroup>
    </Box>
  );
};
