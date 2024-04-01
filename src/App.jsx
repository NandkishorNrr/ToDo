import { useEffect, useState } from "react";
import "./App.css";
import { TodoProvider } from "./contexts/TodoContext";
import TodoForm from "./components/TodoForm";
import TodoItem from "./components/TodoItem";

function App() {
  const [todos, setTodos] = useState([]);

  const addTodo = (todo) => {
    setTodos((prev) => [
      { id: Date.now(), completed: false, ...todo },
      ...prev,
    ]); // Corrected Date.now() function call
  };

  const updateTodo = (id, todo) => {
    setTodos((prev) =>
      prev.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo))
    );
  };

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id)); // Changed from != to !==
  };

  const toggleComplete = (id) => {
    setTodos((prev) =>
      prev.map((prevTodo) =>
        prevTodo.id === id
          ? { ...prevTodo, completed: !prevTodo.completed }
          : prevTodo
      )
    );
  };

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos"));

    if (storedTodos && storedTodos.length > 0) setTodos(storedTodos);
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <TodoProvider
      value={{
        todos,
        addTodo,
        updateTodo,
        deleteTodo,
        toggleComplete,
      }}
    >
      <div className="bg-gray-600 h-90vh max-h-full rounded-lg px-6 py-4">
        <div className="w-80 w-max bg-gray-100 dark:bg-gray-700 shadow-md rounded-lg px-6 py-4">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2 text-gray-800 dark:text-gray-200">
            Todo App
          </h1>
          <div className="mb-4">
            <TodoForm />
          </div>
          <hr />
          <br />
          <div
            className="overflow-y-auto h-96 rounded-lg"
            style={{ maxHeight: "calc(90vh - 8rem)" }}
          >
            <div className="px-2">
              {todos.length === 0 ? (
                <p className="text-center text-gray-600 dark:text-gray-300">
                  No todos yet
                </p>
              ) : (
                todos.map((todo) => (
                  <div key={todo.id} className="mb-2">
                    <TodoItem todo={todo} />
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </TodoProvider>
  );
}

export default App;
