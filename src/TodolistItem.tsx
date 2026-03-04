// import { useRef } from "react";
import { FilterValues, Task, TodoListType } from "./App";
import { Button } from "./Button";
import { ChangeEvent, useState } from "react";
import { CreateItemForm } from "./CreateItemForm";

type Props = {
  tasks: Task[];
  todolist: TodoListType;
  deleteTask: (taskId: Task["id"], todoId: TodoListType["idTodo"] ) => void;
  changeFilter: (value: FilterValues, todoId: TodoListType["idTodo"]) => void;
  createTask: (title: Task['title'], todoId: TodoListType["idTodo"]) => void;
  changeTaskStatus: (taskId: Task['id'], isDone: Task['isDone'], todoId: TodoListType["idTodo"]) => void;
  deleteTodoList: (todoId: TodoListType["idTodo"]) => void;
};


//добавить на кнопку дизеблед

export const TodolistItem = ({
  tasks,
  todolist,
  deleteTask,
  changeFilter,
  createTask,
  changeTaskStatus,
  deleteTodoList
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

  return (
    <div>
      <div>
        <h3>
          {todolist.titleTodo}
          <Button title="X" onClick={deleteTodolistHandler} />
        </h3>
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

              return (
                <li key={task.id} className={task.isDone ? "is-done" : ""}>
                  <input
                    type="checkbox"
                    checked={task.isDone}
                    onChange={changeTaskStatusHandler}
                  />
                  <span>{task.title}</span>
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
