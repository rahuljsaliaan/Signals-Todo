import React from "react";
import { computed } from "@preact/signals-react";

import { getTodosWithCondition } from "@app/signals";

const CompletedCount: React.FC = () => {
  const completedCount = computed<number>(
    () => getTodosWithCondition((todo) => todo.completed).length
  );

  if (completedCount.value === 0) return null;
  return (
    <div className="text-white flex items-center gap-1">
      <h2>Completed</h2>{" "}
      <span className="text-2xl text-green-400">{completedCount}</span>
    </div>
  );
};

export { CompletedCount };
