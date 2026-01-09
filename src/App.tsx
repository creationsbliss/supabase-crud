import AddTodoForm from "./AddTodoForm";
import TodoList from "./TodoList";

function App() {
  return (
    <div className="p-8 w-full max-w-3xl container mx-auto">
      <h1 className="text-center font-bold text-2xl pb-4">Todo List</h1>
      <AddTodoForm />
      <TodoList />
    </div>
  );
}

export default App;
