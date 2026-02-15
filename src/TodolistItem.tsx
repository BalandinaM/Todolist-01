// import { useRef } from "react";
import { FilterValues, Task } from "./App";
import { Button } from "./Button";
import { ChangeEvent, useState } from "react";

type Props = {
  title: string;
  tasks: Task[];
  date?: string;
  deleteTask: (taskId: string) => void;
  changeFilter: (value: FilterValues) => void;
  createTask: (title: string) => void;
  changeTaskStatus: (taskId: Task['id'], isDone: Task['isDone']) => void;
  filter: FilterValues;
};

export const TodolistItem = ({
  title,
  tasks,
  date,
  deleteTask,
  changeFilter,
  createTask,
  changeTaskStatus,
  filter
}: Props) => {
  // const inputRef = useRef<HTMLInputElement>(null)
  const [taskTitle, setTaskTitle] = useState("");
  const [error, setError] = useState<string | null>(null)

  const createTaskHandler = () => {
    if (taskTitle.trim() !== '') {
      createTask(taskTitle);
      setTaskTitle("");
    } else {
      setError("Title is required")
    }
   
  };

  const changeInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTaskTitle(e.currentTarget.value);
    setError(null)
  };

  const createTaskOnEnterHandler = (
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
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
            className={error ? "error" : ''}
          />
          <Button title="+" onClick={createTaskHandler} />
          {error && <div className={"error-message"}>{error}</div>}
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
              const changeTaskStatusHandler = (
                e: ChangeEvent<HTMLInputElement>,
              ) => {
                changeTaskStatus(task.id, e.currentTarget.checked);
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
        <div>{date}</div>
        <div>
          <Button className={filter === "all" ? "active-filter" : ''} title="All" onClick={() => changeFilter("all")} />
          <Button className={filter === "active" ? "active-filter" : ''} title="Active" onClick={() => changeFilter("active")} />
          <Button className={filter === "completed" ? "active-filter" : ''} title="Completed" onClick={() => changeFilter("completed")} />
        </div>
      </div>
    </div>
  );
};
