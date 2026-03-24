import {v1} from 'uuid'
import { beforeEach, expect, test } from 'vitest'
import { TodoListType } from "../App"
import {changeTodolistFilterAC, changeTodolistTitleAC, createTodolistAC, deleteTodolistAC, todolistsReducer} from './todolists-reducer'
 
let todolistId1: string
let todolistId2: string
let startState: TodoListType[]

beforeEach(() => {
  todolistId1 = v1()
  todolistId2 = v1()
 
  startState = [
    {idTodo: todolistId1, titleTodo: 'What to learn', filter: 'all'},
    {idTodo: todolistId2, titleTodo: 'What to buy', filter: 'all'},
  ]
})


test('correct todolist should be deleted', () => { 
  const endState = todolistsReducer(startState, deleteTodolistAC(todolistId1))
 
  expect(endState.length).toBe(1)
  expect(endState[0].idTodo).toBe(todolistId2)
})

test('correct todolist should be created', () => {
  const title = 'New todolist'
  const todolistId = v1();
  const endState = todolistsReducer(startState, createTodolistAC({title, todolistId}))
 
  expect(endState.length).toBe(3)
  expect(endState[2].titleTodo).toBe(title)
})

test('correct todolist should change its title', () => {
  const title = 'New title'
  const endState = todolistsReducer(startState, changeTodolistTitleAC({id: todolistId2, title}))
 
  expect(endState[0].titleTodo).toBe('What to learn')
  expect(endState[1].titleTodo).toBe(title)
})

test('correct todolist should change its filter', () => {
  const filter = 'completed'
  const endState = todolistsReducer(startState, changeTodolistFilterAC({id: todolistId2, filter}))
 
  expect(endState[0].filter).toBe('all')
  expect(endState[1].filter).toBe(filter)
})