import React from "react";
import { useSignals } from "@preact/signals-react/runtime";
import { computed } from "@preact/signals-react";

import { Todo } from "@app/types";
import { getSpecificTodo, toggleTodo } from "@app/signals/todoSignal";

interface ITodoCheckBoxProps {
  todoId: Todo["id"];
}

const TodoCheckBox: React.FC<ITodoCheckBoxProps> = ({ todoId }) => {
  useSignals();

  const todo = computed<Todo | undefined>(() => getSpecificTodo(todoId));

  return (
    <input
      className="w-6 h-6"
      type="checkbox"
      checked={todo?.value?.completed ?? false}
      onChange={() => {
        if (!todo.value) return;
        toggleTodo(todo.value.id);
      }}
    />
  );
};

export { TodoCheckBox };
