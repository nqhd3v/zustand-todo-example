export type NewToDo = {
  value: string;
  isDone: boolean;
}

export type ToDo = {
  id: string;
  value: string;
  isDone: boolean;
  createdAt: Date;
}