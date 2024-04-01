import React, { useState } from "react"; // Import useState from React
import { useTodo } from "../contexts/TodoContext"; // Assuming the path to TodoContext is correct

function TodoForm() {
  const [todo, setTodo] = useState("");
  const { addTodo } = useTodo();

  const add = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    if (!todo.trim()) return; // Trim the todo to check if it's empty
    addTodo({ todo });
    setTodo(""); // Clear the input field after adding todo
  };

  return (
    <form onSubmit={add} className="flex items-center">
      <input
        type="text"
        placeholder="Write Todo..."
        className="flex-1 border border-black/10 rounded px-3 outline-none duration-150 bg-grey-500/20 py-1.5 mr-1" // Added mr-2 for right margin
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
      />

      <button
        type="submit"
        className="rounded-lg px-3 py-1 bg-green-600 text-white shrink-0"
        aria-label="Add Todo"
      >
        Add
      </button>
    </form>
  );
}

export default TodoForm;
