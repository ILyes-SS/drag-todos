"use client";

import { useDraggable } from "@dnd-kit/core";

const ToDoCard = ({
  todo,
  setTodos,
}: {
  todo: ToDo;
  setTodos: (state: any) => any;
}) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: todo.id,
  });
  const checkTodo = () => {
    setTodos((prev: ToDo[]) =>
      prev.map((t) => (t.id != todo.id ? t : { ...t, checked: !t.checked }))
    );
  };
  const deleteTodo = (id: string) => {
    setTodos((prev: ToDo[]) => prev.filter((t) => t.id != id));
  };

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;
  return (
    <div
      className="border p-5 flex flex-col gap-1 rounded-xl"
      ref={setNodeRef}
      {...attributes}
      style={style}
    >
      <div className="mb-3" {...listeners}>
        {" "}
        ✋ Drag Here
      </div>
      <p className="text-2xl ">{todo.title}</p>
      <p className="text-gray-600">{todo.description}</p>
      <div className="flex gap-4 items-center">
        <label htmlFor="check">finish</label>
        <input
          id="check"
          type="checkbox"
          onChange={checkTodo}
          checked={todo.checked}
        />
      </div>

      <button
        className="bg-red-500 cursor-pointer hover:bg-red-400 px-3 py-2 rounded-sm border text-white"
        onClick={() => deleteTodo(todo.id)}
      >
        Delete
      </button>
    </div>
  );
};

export default ToDoCard;
