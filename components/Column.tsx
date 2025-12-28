"use client";
import { useContext, useMemo } from "react";
import AddToDo from "./AddToDo";
import { todosContext } from "./ToDosProvider";
import ToDoCard from "./ToDoCard";
import { useDroppable } from "@dnd-kit/core";

const Column = ({ column }: { column: Column }) => {
  const { todos, setTodos } = useContext(todosContext);
  const { isOver, setNodeRef } = useDroppable({ id: column });
  const filteredTodos = useMemo(() => {
    return todos.filter((todo) =>
      column == "FINISHED"
        ? todo.status == column || todo.checked
        : todo.status == column && !todo.checked
    );
  }, [todos, setTodos]);

  return (
    <div>
      <h2 className="font-semibold"> {column} </h2>

      <div
        ref={setNodeRef}
        className={
          "border min-h-[500px] px-3 py-2 " +
          (isOver ? "bg-gray-100" : "undefined")
        }
      >
        {column == "TO DO" && <AddToDo setTodos={setTodos} />}
        <div className="flex flex-col gap-2">
          {filteredTodos.map((todo) => {
            return <ToDoCard key={todo.id} todo={todo} setTodos={setTodos} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Column;
