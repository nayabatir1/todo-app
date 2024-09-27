import AddTodo from "../components/AddTodo";
import Filter from "../components/Filter";
import TodoList from "../components/TodoList";

export default function TodoApp() {
  return (
    <>
      <Filter />

      <TodoList />

      <AddTodo />
    </>
  );
}
