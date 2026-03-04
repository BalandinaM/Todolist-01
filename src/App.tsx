import { useState } from "react";
import "./App.css";
import { TodolistItem } from "./TodolistItem";
import { v1 } from "uuid";
import { CreateItemForm } from "./CreateItemForm";

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

  const initTodoLists: TodoListType[] = [
    { idTodo: todoListId_1, titleTodo: "What to learn", filter: "all" },
    { idTodo: todoListId_2, titleTodo: "What to buy", filter: "all" },
  ]

  const initTasks: TasksStateType = {
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
  }

  const [todoLists, setTodoLists] = useState<TodoListType[]>(initTodoLists);
  const [tasks, setTasks] = useState<TasksStateType>(initTasks);

  const deleteTask = (taskId: Task["id"], todoId: TodoListType["idTodo"]) => {
    const filteredTasks = tasks[todoId].filter((task) => {
      return task.id !== taskId;
    });
    setTasks({...tasks, [todoId]: filteredTasks} );
  };

  const changeFilter = (filter: FilterValues,  todoId: TodoListType["idTodo"]) => {
    const newTodoLists = todoLists.map(todolist => {
      return todolist.idTodo === todoId ? {...todolist, filter} : todolist
    })
    setTodoLists(newTodoLists)
  };

  const createTask = (title: Task["title"], todoId: TodoListType["idTodo"]) => {
    const newTask = { id: v1(), title: title, isDone: false };
    const newTasks = [newTask, ...tasks[todoId]];
    setTasks({...tasks, [todoId]: newTasks});// создаю копию тасок, и по ид вставляю новый массив тасок
  };

  const changeTaskStatus = (id: Task["id"], isDone: Task["isDone"], todoId: TodoListType["idTodo"]) => {
    setTasks({...tasks, [todoId]: tasks[todoId].map(task => task.id == id ? { ...task, isDone } : task)})
  
  };

  const deleteTodoList = (todoId: TodoListType["idTodo"]) => {
      setTodoLists(todoLists.filter((todoList)=>(todoList.idTodo !== todoId)))
      delete tasks[todoId]
      setTasks({...tasks})// это что бы реакт перерисовал списки.
  }

  const createTodoList = (title: TodoListType["titleTodo"]) => {
    const todoListId = v1();
    const newTodo: TodoListType = {idTodo: todoListId, titleTodo: title, filter: 'all'};
    setTodoLists([newTodo, ...todoLists])
    setTasks({...tasks, [todoListId]: []}) 
  }

  return (
    <div className="app">
      <CreateItemForm onCreateItem={createTodoList}/>
      {todoLists.map((todolist) => {
        let filteredTasks = tasks[todolist.idTodo];
        if (todolist.filter === "active") {
          filteredTasks = tasks[todolist.idTodo].filter((task) => !task.isDone);
        }
        if (todolist.filter === "completed") {
          filteredTasks = tasks[todolist.idTodo].filter((task) => task.isDone);
        }

        return (
          <TodolistItem
            key={todolist.idTodo}
            todolist={todolist}
            tasks={filteredTasks}
            deleteTask={deleteTask}
            changeFilter={changeFilter}
            createTask={createTask}
            changeTaskStatus={changeTaskStatus}
            deleteTodoList={deleteTodoList}
          />
        );
      })}
    </div>
  );
};
