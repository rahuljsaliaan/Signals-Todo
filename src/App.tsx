import "@app/App.css";
import { TodoContainer } from "@app/components";

function App() {
  return (
    <div className="w-screen h-screen bg-cyan-950 flex flex-col items-center gap-32">
      <h1 className="text-cyan-300 text-6xl text-center mt-8">Signal Todos</h1>
      <div className="flex-1 flex justify-center  w-full">
        <TodoContainer />
      </div>
    </div>
  );
}

export default App;
