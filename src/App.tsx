import { useState } from "react";
import "./App.css";
import { TodolistItem } from "./TodolistItem";
import { v1 } from "uuid";

export type Task = {
  id: string;
  title: string;
  isDone: boolean;
};

export type FilterValues = 'all' | 'active' | 'completed'

export const App = () => {
  const [tasks, setTasks] = useState<Task[]>([
    { id: v1(), title: "HTML&CSS", isDone: true },
    { id: v1(), title: "JS", isDone: true },
    { id: v1(), title: "ReactJS", isDone: false },
    { id: v1(), title: "Redux", isDone: false },
    { id: v1(), title: "Typescript", isDone: false },
    { id: v1(), title: "RTK query", isDone: false },
  ]);
  // debugger;
  

  const [filter, setFilter] = useState<FilterValues>("all");

  let filteredTasks = tasks;
  if (filter === "active") {
    filteredTasks = tasks.filter((task) => !task.isDone);
  }
  if (filter === "completed") {
    filteredTasks = tasks.filter((task) => task.isDone);
  }

  const deleteTask = (taskId: Task['id']) => {
    const filteredTasks = tasks.filter((task) => {
      return task.id !== taskId;
    });
    setTasks(filteredTasks);
  };

  const changeFilter = (filter: FilterValues) => {
    setFilter(filter);
  }
  
  const createTask = (title: Task['title']) => {
    const newTask = {id: v1(), title: title, isDone: false}
    const newTasks = [newTask, ...tasks]
    setTasks(newTasks)
  }

  return (
    <div className="app">
      <TodolistItem
        title="What to learn"
        tasks={filteredTasks}
        date="25.01.2026"
        deleteTask={deleteTask}
        changeFilter = {changeFilter}
        createTask= {createTask}
      />
    </div>
  );
};
