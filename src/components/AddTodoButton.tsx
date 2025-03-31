import React from "react";
import { computed } from "@preact/signals-react";

import { addTodo } from "@app/signals";

const AddTodoButton: React.FC = () => {
  const handleAddTodo = computed<React.MouseEventHandler<HTMLButtonElement>>(
    () => () => {
      addTodo("New Todo");
    }
  ).value;

  return (
    <button
      onClick={handleAddTodo}
      className="bg-cyan-600 rounded-0 py-1 px-3 cursor-pointer text-white font-semibold hover:bg-cyan-700 transition-colors duration-200 ease-in-out w-fit"
    >
      Add Todo
    </button>
  );
};

export { AddTodoButton };
