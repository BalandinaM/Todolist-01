import { RootState } from "@/app/store";
import { TodoListType } from "./todolists-reducer";

export const selectTodolists = (state: RootState): TodoListType[] => state.todolists