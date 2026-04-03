import {
  List,
} from "@mui/material";
import {
  Task,
} from "./model/tasks-reducer";
import { TodoListType } from "./model/todolists-reducer";
import { useAppDispatch } from "./common/hooks/useAppDispatch";
import { useAppSelector } from "./common/hooks/useAppSelector";
import { selectTasks } from "./model/tasks-selectors";
import { TaskItem } from "./TaskItem";

type Props = {
  todolist: TodoListType;
};

export const Tasks = ({ todolist }: Props) => {
  const { idTodo, filter } = todolist;
  const tasks = useAppSelector(selectTasks);

  const todoListTasks = tasks[idTodo];
  let filteredTasks = todoListTasks;
  if (filter === "active") {
    filteredTasks = tasks[todolist.idTodo].filter((task: Task) => !task.isDone);
  }
  if (filter === "completed") {
    filteredTasks = tasks[todolist.idTodo].filter((task: Task) => task.isDone);
  }

  return (
    <>
      {tasks.length === 0 ? (
        <p>Тасок нет</p>
      ) : (
        <List>
          {filteredTasks.map((task: Task) => (
            <TaskItem key={task.id} task={task} todolistId={idTodo}/>
          ))}
        </List>
      )}
    </>
  );
};
