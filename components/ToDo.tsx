"use client";

const ToDoCard = ({
  todo,
  setTodos,
}: {
  todo: ToDo;
  setTodos: (state: any) => any;
}) => {
  const checkTodo = () => {
    setTodos((prev: ToDo[]) =>
      prev.map((t) => (t.id != todo.id ? t : { ...t, checked: !t.checked }))
    );
  };
  const deleteTodo = (id: string) => {
    setTodos((prev: ToDo[]) => prev.filter((t) => t.id != id));
  };
  return (
    <div className="border p-3">
      <p>{todo.title}</p>
      <p>{todo.description}</p>
      <input
        type="checkbox"
        onChange={checkTodo}
        defaultChecked={todo.checked}
      />
      <button onClick={() => deleteTodo(todo.id)}>delete</button>
    </div>
  );
};

export default ToDoCard;
