"use client";
import { useContext, useMemo } from "react";
import AddToDo from "./AddToDo";
import { todosContext } from "./ToDosProvider";
import ToDoCard from "./ToDo";

const Column = ({ column }: { column: Column }) => {
  const { todos, setTodos } = useContext(todosContext);
  const filteredTodos = useMemo(() => {
    return todos.filter((todo) => todo.status == column);
  }, [todos]);
  return (
    <div>
      <h2> {column} </h2>
      {column == "TO DO" && <AddToDo setTodos={setTodos} />}
      <div>
        {filteredTodos.map((todo) => {
          return <ToDoCard key={todo.id} todo={todo} setTodos={setTodos} />;
        })}
      </div>
    </div>
  );
};

export default Column;
