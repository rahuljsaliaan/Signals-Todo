import React from "react";
import { computed } from "@preact/signals-react";
import { getTodosWithCondition } from "@app/signals";
import { useSignals } from "@preact/signals-react/runtime";

const CompletedCount: React.FC = () => {
  useSignals();

  const completedCount = computed(
    () => getTodosWithCondition((todo) => todo.completed).length
  );

  const totalCount = computed(() => getTodosWithCondition(() => true).length);

  if (totalCount.value === 0) return null; // .value is fine here for conditional rendering

  return (
    <div className="flex items-center gap-1 bg-green-200 w-fit py-0.5 px-3 font-semibold rounded-[0.15rem]">
      <h2>Completed</h2>{" "}
      <span className="text-2xl text-green-600 leading-0">
        {completedCount}
      </span>
    </div>
  );
};

export { CompletedCount };
