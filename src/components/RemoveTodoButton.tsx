import React from "react";
import { computed } from "@preact/signals-react";
import { HiDocumentRemove } from "react-icons/hi";

import { removeTodo } from "@app/signals";
import { Todo } from "@app/types";

interface IRemoveTodoButtonProps {
  todoId: Todo["id"];
}

const RemoveTodoButton: React.FC<IRemoveTodoButtonProps> = ({ todoId }) => {
  const handleClick = computed<() => void>(() => () => {
    removeTodo(todoId);
  }).value;

  return (
    <button onClick={handleClick} className="cursor-pointer">
      <HiDocumentRemove className="text-white text-3xl" />
    </button>
  );
};

export { RemoveTodoButton };
