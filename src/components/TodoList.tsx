import { memo } from "react";
import TodoItem from "./TodoItem";
import { useTodosContext } from "../hooks/TodosContext.provider";

function TodoList() {
  const { todos } = useTodosContext();

  return (
    <div className="grow overflow-auto p-3">
      {todos.map((i) => (
        <TodoItem key={i.id} {...i} />
      ))}
    </div>
  );
}

export default memo(TodoList);
