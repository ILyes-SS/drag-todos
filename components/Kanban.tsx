"use client";
import { useContext } from "react";
import Column from "./Column";
import { todosContext } from "./ToDosProvider";
import { DndContext, DragEndEvent } from "@dnd-kit/core";

const columns: Column[] = ["TO DO", "IN PROGRESS", "FINISHED"];

const Kanban = () => {
  const { setTodos } = useContext(todosContext);
  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over) return;

    setTodos((prev: ToDo[]) =>
      prev.map((t: ToDo) => (t.id == active.id ? { ...t, status: over.id } : t))
    );
  }
  return (
    <div className="flex flex-col items-center gap-4">
      <h1 className="text-3xl font-semibold">Kanban board</h1>
      <div className="flex gap-7">
        <DndContext onDragEnd={handleDragEnd}>
          {columns.map((col) => {
            return <Column key={col} column={col} />;
          })}
        </DndContext>
      </div>
    </div>
  );
};

export default Kanban;
