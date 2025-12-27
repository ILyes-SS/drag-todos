"use client";
import { createContext, ReactNode, useState } from "react";

type contextType = { todos: ToDo[]; setTodos: (state: ToDo[]) => any };

const todosContext = createContext<contextType>({
  todos: [],
  setTodos: () => {},
});

const ToDosProvider = ({
  initialTodos,
  children,
}: {
  initialTodos: ToDo[];
  children: ReactNode;
}) => {
  const [todos, setTodos] = useState(initialTodos || []);
  return (
    <todosContext.Provider value={{ todos, setTodos }}>
      {children}
    </todosContext.Provider>
  );
};

export default ToDosProvider;
