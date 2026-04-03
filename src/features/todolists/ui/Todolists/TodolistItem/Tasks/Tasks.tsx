import { useAppSelector } from "@/common/hooks/useAppSelector";
import { selectTasks } from "@/features/todolists/model/tasks-selectors";
import { TodoListType } from "@/features/todolists/model/todolists-reducer";
import {
  List,
} from "@mui/material";
import { TaskItem } from "./TaskItem/TaskItem";
import { Task } from "@/features/todolists/model/tasks-reducer";


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
