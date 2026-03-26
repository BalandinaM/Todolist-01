import type { TasksStateType } from '../app/App'
import type { RootState } from '../app/store'
 
export const selectTasks = (state: RootState): TasksStateType => state.tasks