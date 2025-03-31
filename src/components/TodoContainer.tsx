import React from "react";

import { AddTodoButton, CompletedCount, TodoList } from "@app/components";

const TodoContainer: React.FC = () => {
  return (
    <div>
      <div className="mb-5">
        <CompletedCount />
      </div>
      <div className="flex flex-col gap-4 justify-center">
        <TodoList />

        <div className="ps-10">
          <AddTodoButton />
        </div>
      </div>
    </div>
  );
};

export { TodoContainer };
