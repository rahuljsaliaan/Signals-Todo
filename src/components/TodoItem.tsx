import React, { useRef } from "react";
import { computed } from "@preact/signals-react";

import { Todo } from "@app/types";
import { useSignalEffect, useSignals } from "@preact/signals-react/runtime";
import { getSpecificTodo, updateTodoText } from "@app/signals/todoSignal";

interface ITodoItem {
  todoId: Todo["id"];
}

const MAX_ROWS = 4; // Maximum rows allowed

const TodoItem: React.FC<ITodoItem> = ({ todoId }) => {
  useSignals(); // Ensure the signal is tracked
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  // Get the specific todo item based on the provided id
  const todo = computed<Todo | undefined>(() => getSpecificTodo(todoId));

  /**
   * Adjust textarea height based on content, with max height constraint.
   */
  const adjustHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto"; // Reset height to recalculate
      const newHeight = Math.min(
        textarea.scrollHeight,
        MAX_ROWS * parseFloat(getComputedStyle(textarea).lineHeight || "0")
      ); // Calculate new height
      textarea.style.height = `${newHeight}px`; // Cap the height
      textarea.style.overflowY =
        newHeight < textarea.scrollHeight ? "auto" : "hidden"; // Enable scrolling if max height reached
    }
  };

  // Adjust height when the todo text updates
  useSignalEffect(() => {
    adjustHeight();
  });

  /**
   * Handle change event to update the text signal.
   */
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateTodoText(todo.value?.id ?? 0, e.target.value);
    adjustHeight();
  };

  return (
    <div className="border-2 border-gray-300 p-2 flex items-center gap-2 rounded w-[500px] h-fit">
      <textarea
        ref={textareaRef}
        value={todo.value?.text}
        onChange={handleChange}
        className="outline-none focus:outline-none text-white w-full resize-none overflow-hidden"
        rows={1}
      />
    </div>
  );
};

export { TodoItem };
