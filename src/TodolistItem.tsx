import { FilterValues, Task, TodoListType } from "./App";
import { Button } from "./Button";
import { ChangeEvent } from "react";
import { CreateItemForm } from "./CreateItemForm";
import { EditableTitle } from "./EditableTitle";

type Props = {
  tasks: Task[];
  todolist: TodoListType;
  deleteTask: (taskId: Task["id"], todoId: TodoListType["idTodo"] ) => void;
  changeFilter: (value: FilterValues, todoId: TodoListType["idTodo"]) => void;
  createTask: (title: Task['title'], todoId: TodoListType["idTodo"]) => void;
  changeTaskStatus: (taskId: Task['id'], isDone: Task['isDone'], todoId: TodoListType["idTodo"]) => void;
  deleteTodoList: (todoId: TodoListType["idTodo"]) => void;
  updateTodolistTitle: (todoId: TodoListType["idTodo"], title: TodoListType["titleTodo"]) => void;
  updateTaskTitle: (todoId: TodoListType["idTodo"], taskId: Task["id"], title: TodoListType["titleTodo"]) => void;
};


export const TodolistItem = ({
  tasks,
  todolist,
  deleteTask,
  changeFilter,
  createTask,
  changeTaskStatus,
  deleteTodoList,
  updateTodolistTitle,
  updateTaskTitle
}: Props) => {

  const createTaskHandler = (title: string) => {
    createTask(title, todolist.idTodo)
  }
  
  const changeFilterHandler = (filter: FilterValues) => {
    changeFilter(filter, todolist.idTodo);
  };

  const deleteTodolistHandler = () => {
    deleteTodoList(todolist.idTodo);
  };

  const updateTodolistTitleHandler = (title: string) => {
    updateTodolistTitle(todolist.idTodo, title)
  }

  return (
    <div>
      <div>
        <div style={{display: "flex"}}>
          <h3><EditableTitle value={todolist.titleTodo} onChange={updateTodolistTitleHandler}/></h3>
          <Button title="X" onClick={deleteTodolistHandler} /> 
        </div>
        <CreateItemForm onCreateItem={createTaskHandler} />
        {tasks.length === 0 ? (
          <p>Тасок нет</p>
        ) : (
          <ul>
            {tasks.map((task) => {
              const deleteTaskHandler = () => {
                deleteTask(task.id, todolist.idTodo);
              };
              const changeTaskStatusHandler = (
                e: ChangeEvent<HTMLInputElement>,
              ) => {
                changeTaskStatus(
                  task.id,
                  e.currentTarget.checked,
                  todolist.idTodo,
                );
              };
              const updateTaskTitleHandler = (title: string) => {
                updateTaskTitle(todolist.idTodo, task.id, title)
              }

              return (
                <li key={task.id} className={task.isDone ? "is-done" : ""}>
                  <input
                    type="checkbox"
                    checked={task.isDone}
                    onChange={changeTaskStatusHandler}
                  />
                  <EditableTitle value={task.title} onChange={updateTaskTitleHandler}/>
                  <Button onClick={deleteTaskHandler} title={"X"} />
                </li>
              );
            })}
          </ul>
        )}
        <div>
          <Button
            className={todolist.filter === "all" ? "active-filter" : ""}
            title="All"
            onClick={() => changeFilterHandler("all")}
          />
          <Button
            className={todolist.filter === "active" ? "active-filter" : ""}
            title="Active"
            onClick={() => changeFilterHandler("active")}
          />
          <Button
            className={todolist.filter === "completed" ? "active-filter" : ""}
            title="Completed"
            onClick={() => changeFilterHandler("completed")}
          />
        </div>
      </div>
    </div>
  );
};
