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

export type TodoListType = {
  idTodo: string
  titleTodo: string
  filter: FilterValues
} 

export type TasksStateType = {
  [todoListId: string]: Task[]
}

export const App = () => {
  const todoListId_1 = v1();
  const todoListId_2 = v1();

  const [todoLists, setTodoLists] = useState<TodoListType[]>([
    { idTodo: todoListId_1, titleTodo: "What to learn", filter: "all" },
    { idTodo: todoListId_2, titleTodo: "What to buy", filter: "all" },
  ]);

  const [tasks, setTasks] = useState<TasksStateType>({
    [todoListId_1]: [
      { id: v1(), title: "HTML&CSS", isDone: true },
      { id: v1(), title: "JS", isDone: true },
      { id: v1(), title: "ReactJS", isDone: false },
      { id: v1(), title: "Redux", isDone: false },
      { id: v1(), title: "Typescript", isDone: false },
      { id: v1(), title: "RTK query", isDone: false },
    ],
    [todoListId_2]: [
      { id: v1(), title: "Milk", isDone: true },
      { id: v1(), title: "Bread", isDone: true },
      { id: v1(), title: "Water", isDone: false },
      { id: v1(), title: "Butter", isDone: false },
    ],
  });

  const deleteTask = (taskId: Task["id"], todoId: TodoListType["idTodo"]) => {
    const filteredTodo = todoLists.filter(todo => todo.idTodo === todoId)
    const filteredTasks = tasks[todoId].filter((task) => {
      return task.id !== taskId;
    });
    setTasks({...tasks[todoId],} );
  };

  const changeFilter = (filter: FilterValues,  todoId: TodoListType["idTodo"]) => {
    const newTodoLists = todoLists.map(todolist => {
      return todolist.idTodo === todoId ? {...todolist, filter} : todolist
    })
    setTodoLists(newTodoLists)
  };

  const createTask = (title: Task["title"]) => {
    const newTask = { id: v1(), title: title, isDone: false };
    const newTasks = [newTask, ...tasks];
    setTasks(newTasks);
  };

  const changeTaskStatus = (id: Task["id"], isDone: Task["isDone"]) => {
    const task = tasks.find((t) => t.id === id);
    if (task) {
      task.isDone = isDone;
      setTasks([...tasks]);
    }
    // лучший вариант через map, но что-то не работает...
    // const newState: Task[] = tasks.map(t => t.id === id ? {...tasks, isDone } : t)
    // setTasks(newState)
  };

  <div className="app">
    {todoLists.map((todolist) => {
      let filteredTasks = tasks[todolist.idTodo];
      if (todolist.filter === "active") {
        filteredTasks = tasks[todolist.idTodo].filter((task) => !task.isDone);
      }
      if (todolist.filter === "completed") {
        filteredTasks = tasks[todolist.idTodo].filter((task) => !task.isDone);
      }

      return (
        <TodolistItem
          title="What to learn"
          tasks={filteredTasks}
          date="25.01.2026"
          deleteTask={deleteTask}
          changeFilter={changeFilter}
          createTask={createTask}
          changeTaskStatus={changeTaskStatus}
        />
      );
    })}
  </div>;
};
