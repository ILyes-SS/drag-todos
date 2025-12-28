"use client";
import { getItem, setItem } from "@/utils/localStorage";
import { createContext, ReactNode, useEffect, useState } from "react";

type contextType = { todos: ToDo[]; setTodos: (state: any) => any };

export const todosContext = createContext<contextType>({
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
  const [todos, setTodos] = useState(() => {
    return initialTodos.length > 0 ? initialTodos : getItem("todos") || [];
  });

  useEffect(() => {
    setItem("todos", todos);
  }, [todos]);

  return (
    <todosContext.Provider value={{ todos, setTodos }}>
      {children}
    </todosContext.Provider>
  );
};

export default ToDosProvider;
