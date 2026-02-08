// import { useRef } from "react";
import { KeyboardEventHandler } from "react";
import { FilterValues, Task } from "./App";
import { Button } from "./Button";
import { useState } from "react";

type Props = {
  title: string;
  tasks: Task[];
  date?: string;
  deleteTask: (taskId: string) => void;
  changeFilter: (value: FilterValues) => void;
  createTask: (title: string) => void
};

export const TodolistItem = ({ title, tasks, date, deleteTask, changeFilter, createTask }: Props) => {
  // const inputRef = useRef<HTMLInputElement>(null)
  const [taskTitle, setTaskTitle] = useState('');

  const createTaskHandler = () => {
    createTask(taskTitle)
    setTaskTitle('')
  }

  const changeInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTaskTitle(e.currentTarget.value)
  }

  const createTaskOnEnterHandler = (e: KeyboardEventHandler<HTMLInputElement>) => {
    if (e.key === "Enter") {
      createTaskHandler();
    }
  };

  return (
    <div>
      <div>
        <h3>{title}</h3>
        <div>
          <input
            value={taskTitle}
            onChange={changeInputHandler}
            onKeyDown={createTaskOnEnterHandler}
          />
          <Button title="+" onClick={createTaskHandler} />
          {/* через useRef, но у него есть минус, нельзя получить значение после каждого введенного символа */}
          {/* <input ref={inputRef} />
          <button
            onClick={() => {
              if (inputRef.current) {
                createTask(inputRef.current.value);
                inputRef.current.value = ''
              }
            }}
          >
            +
          </button> */}
        </div>
        {tasks.length === 0 ? (
          <p>Тасок нет</p>
        ) : (
          <ul>
            {tasks.map((task) => {
              const deleteTaskHandler = () => {
                deleteTask(task.id);
              };

              return (
                <li key={task.id}>
                  <input type="checkbox" checked={task.isDone} />
                  <span>{task.title}</span>
                  <Button onClick={deleteTaskHandler} title={"X"} />
                </li>
              );
            })}
          </ul>
        )}
        <div>{date}</div>
        <div>
          <Button title="All" onClick={() => changeFilter("all")} />
          <Button title="Active" onClick={() => changeFilter("active")} />
          <Button title="Completed" onClick={() => changeFilter("completed")} />
        </div>
      </div>
    </div>
  );
};
