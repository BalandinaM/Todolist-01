import { DirectionsRun, TaskAlt } from "@mui/icons-material";
import {
  ListItem,
  IconButton,
  ListItemAvatar,
  Checkbox,
  ListItemText,
} from "@mui/material";
import { ChangeEvent } from "react";
import { useDispatch } from "react-redux";
import { EditableTitle } from "./EditableTitle";
import {
  deleteTaskAC,
  changeTaskStatusAC,
  changeTaskTitleAC,
  Task,
} from "./model/tasks-reducer";
import ClearIcon from "@mui/icons-material/Clear";

type Props = {
  task: Task,
  todolistId: string;
};

export const TaskItem = ({ task, todolistId }: Props) => {
  const dispatch = useDispatch();

  const deleteTaskHandler = () => {
    dispatch(deleteTaskAC({ todolistId, taskId: task.id }));
  };

  const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const newStatusValue = e.currentTarget.checked;
    dispatch(
      changeTaskStatusAC({
        todolistId,
        taskId: task.id,
        isDone: newStatusValue,
      }),
    );
  };

  const updateTaskTitleHandler = (title: string) => {
    dispatch(changeTaskTitleAC({ todolistId, taskId: task.id, title }));
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
        <EditableTitle value={task.title} onChange={updateTaskTitleHandler} />
      </ListItemText>
    </ListItem>
  );
};
