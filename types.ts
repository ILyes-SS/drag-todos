type Column = "TO DO" | "IN PROGRESS" | "FINISHED";

type ToDo = {
  id: string;
  status: Column;
  title: string;
  description: string;
  checked: boolean;
  userId: string;
};
