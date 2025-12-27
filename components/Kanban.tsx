import Column from "./Column";

const columns: Column[] = ["TO DO", "IN PROGRESS", "FINISHED"];

const Kanban = () => {
  return (
    <div>
      <h1>Kanban board</h1>
      <div>
        {columns.map((col) => {
          return <Column key={col} column={col} />;
        })}
      </div>
    </div>
  );
};

export default Kanban;
