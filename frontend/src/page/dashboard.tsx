import { useTasks } from "../hooks/useTasks";
import { useSocket } from "../hooks/useSocket";

export default function Dashboard() {
  useSocket();
  const { data, isLoading } = useTasks();

  if (isLoading) return <p>Loading...</p>;

  const tasks = data?.data || [];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

      {tasks.map((task: any) => (
        <div key={task.id} className="border p-3 mb-2 rounded">
          <p className="font-semibold">{task.title}</p>
          <p>Status: {task.status}</p>
        </div>
      ))}
    </div>
  );
}
