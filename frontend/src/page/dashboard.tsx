import React, { useEffect, useState } from "react";
import taskApi from "../api/task.api";

type Task = {
  id: string;
  title: string;
  status: string;
  priority: string;
  dueDate: string;
};

export default function Dashboard() {
  const [createdTasks, setCreatedTasks] = useState<Task[]>([]);
  const [assignedTasks, setAssignedTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      taskApi.getCreatedTasks(),
      taskApi.getAssignedTasks(),
    ])
      .then(([createdRes, assignedRes]) => {
        setCreatedTasks(createdRes.data);
        setAssignedTasks(assignedRes.data);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading dashboard...</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>

      {/* My Tasks */}
      <section className="mb-6">
        <h3 className="text-lg font-semibold">📝 My Tasks</h3>
        {createdTasks.length === 0 && <p>No tasks created</p>}
        {createdTasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </section>

      {/* Assigned Tasks */}
      <section>
        <h3 className="text-lg font-semibold">👤 Assigned To Me</h3>
        {assignedTasks.length === 0 && <p>No assigned tasks</p>}
        {assignedTasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </section>
    </div>
  );
}

function TaskCard({ task }: { task: Task }) {
  const isOverdue =
    new Date(task.dueDate) < new Date() && task.status !== "COMPLETED";

  return (
    <div
      className={`border p-3 rounded mb-2 ${
        isOverdue ? "bg-red-100" : "bg-white"
      }`}
    >
      <p className="font-medium">{task.title}</p>
      <p>Status: {task.status}</p>
      <p>Priority: {task.priority}</p>
      <p>Due: {new Date(task.dueDate).toDateString()}</p>
      {isOverdue && <p className="text-red-600">⚠ Overdue</p>}
    </div>
  );
}
