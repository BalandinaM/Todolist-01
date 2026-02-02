import { Task } from "./App";
import { Button } from "./Button";

type Props = {
  title: string;
  tasks: Task[];
  date?: string;
  deleteTask: (taskId: number) => void
};

export const TodolistItem = ({ title, tasks, date, deleteTask, changeFilter }: Props) => {
  return (
    <div>
      <div>
        <h3>{title}</h3>
        <div>
          <input />
          <button>+</button>
        </div>
        {tasks.length === 0 ? (
          <p>Тасок нет</p>
        ) : (
          <ul>
            {tasks.map((task) => {
              return (
                <li key={task.id}>
                  <input type="checkbox" checked={task.isDone} />
                  <span>{task.title}</span>
                  <Button onClick={() => deleteTask(task.id)} title={"X"} />
                </li>
              );
            })}
          </ul>
        )}
        <div>{date}</div>
        <div>
          <Button title="All" onClick={() => changeFilter('all')}/>
          <Button title="Active" onClick={() => changeFilter('active')}/>
          <Button title="Completed" onClick={() => changeFilter('completed')}/>
        </div>
      </div>
    </div>
  );
};
