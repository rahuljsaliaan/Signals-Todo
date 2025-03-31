import React from "react";
import { todoState } from "@app/signals/todoSignal";
import { RemoveTodoButton, TodoCheckBox, TodoItem } from "@app/components";
import { useSignals } from "@preact/signals-react/runtime";

const TodoList: React.FC = () => {
  useSignals();

  return (
    <div className="flex flex-col gap-2">
      {todoState.value.todos.map((todo) => {
        return (
          <div key={`${todo.id}-container`} className="flex items-center gap-2">
            <RemoveTodoButton todoId={todo.id} />
            <TodoItem todoId={todo.id} />
            <TodoCheckBox todoId={todo.id} />
          </div>
        );
      })}
    </div>
  );
};

export { TodoList };
