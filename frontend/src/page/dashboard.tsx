import React, { useEffect, useMemo, useState } from "react";
import taskApi from "../api/task.api";
import userApi from "../api/user.api";
import CreateTaskModal from "../components/CreateTaskModal";
import DeleteConfirmModal from "../components/DeleteConfirmModal";

/* =====================
   TYPES
===================== */
type User = {
  id: string;
  name: string;
  email: string;
};

type Task = {
  id: string;
  title: string;
  status: "TODO" | "IN_PROGRESS" | "REVIEW" | "COMPLETED";
  priority: "LOW" | "MEDIUM" | "HIGH" | "URGENT";
  dueDate: string;
  assignedToId: string;
};

/* =====================
   DASHBOARD
===================== */
export default function Dashboard() {
  const [createdTasks, setCreatedTasks] = useState<Task[]>([]);
  const [assignedTasks, setAssignedTasks] = useState<Task[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);

  // 🔥 DELETE STATE
  const [deleteTaskId, setDeleteTaskId] = useState<string | null>(null);

  const [statusFilter, setStatusFilter] = useState("ALL");
  const [priorityFilter, setPriorityFilter] = useState("ALL");
  const [sortOrder, setSortOrder] = useState<"ASC" | "DESC">("ASC");

  /* =====================
     LOAD DATA
  ===================== */
  const loadTasks = () => {
    setLoading(true);
    Promise.all([
      taskApi.getCreatedTasks(),
      taskApi.getAssignedTasks(),
    ])
      .then(([createdRes, assignedRes]) => {
        setCreatedTasks(createdRes.data);
        setAssignedTasks(assignedRes.data);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadTasks();
    userApi.getUsers().then((res) => setUsers(res.data));
  }, []);

  /* =====================
     DERIVED DATA
  ===================== */
  const today = new Date();

  const overdueTasks = useMemo(
    () =>
      assignedTasks.filter(
        (t) =>
          new Date(t.dueDate) < today && t.status !== "COMPLETED"
      ),
    [assignedTasks]
  );

  const filterSort = (tasks: Task[]) => {
    let data = [...tasks];

    if (statusFilter !== "ALL") {
      data = data.filter((t) => t.status === statusFilter);
    }

    if (priorityFilter !== "ALL") {
      data = data.filter((t) => t.priority === priorityFilter);
    }

    data.sort((a, b) =>
      sortOrder === "ASC"
        ? new Date(a.dueDate).getTime() -
          new Date(b.dueDate).getTime()
        : new Date(b.dueDate).getTime() -
          new Date(a.dueDate).getTime()
    );

    return data;
  };

  if (loading) return <p className="p-6">Loading dashboard...</p>;

  /* =====================
     RENDER
  ===================== */
  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">📊 Dashboard</h1>

        <button
          onClick={() => setShowCreate(true)}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg"
        >
          + Create Task
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-4 mb-6">
        <select
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="ALL">All Status</option>
          <option value="TODO">Todo</option>
          <option value="IN_PROGRESS">In Progress</option>
          <option value="REVIEW">Review</option>
          <option value="COMPLETED">Completed</option>
        </select>

        <select
          onChange={(e) => setPriorityFilter(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="ALL">All Priority</option>
          <option value="LOW">Low</option>
          <option value="MEDIUM">Medium</option>
          <option value="HIGH">High</option>
          <option value="URGENT">Urgent</option>
        </select>

        <select
          onChange={(e) =>
            setSortOrder(e.target.value as "ASC" | "DESC")
          }
          className="border p-2 rounded"
        >
          <option value="ASC">Due Date ↑</option>
          <option value="DESC">Due Date ↓</option>
        </select>
      </div>

      {/* Sections */}
      <Section
        title="⏰ Overdue Tasks"
        tasks={overdueTasks}
        users={users}
        reload={loadTasks}
        onDelete={setDeleteTaskId}
      />

      <Section
        title="📥 Assigned To Me"
        tasks={filterSort(assignedTasks)}
        users={users}
        reload={loadTasks}
        onDelete={setDeleteTaskId}
      />

      <Section
        title="📝 Created By Me"
        tasks={filterSort(createdTasks)}
        users={users}
        reload={loadTasks}
        onDelete={setDeleteTaskId}
      />

      {/* Create Modal */}
      {showCreate && (
        <CreateTaskModal
          onClose={() => setShowCreate(false)}
          onCreated={loadTasks}
        />
      )}

      {/* DELETE CONFIRM MODAL */}
      {deleteTaskId && (
        <DeleteConfirmModal
          onCancel={() => setDeleteTaskId(null)}
          onConfirm={() =>
            taskApi.deleteTask(deleteTaskId).then(() => {
              setDeleteTaskId(null);
              loadTasks();
            })
          }
        />
      )}
    </div>
  );
}

/* =====================
   TASK SECTION
===================== */
function Section({
  title,
  tasks,
  users,
  reload,
  onDelete,
}: {
  title: string;
  tasks: Task[];
  users: User[];
  reload: () => void;
  onDelete: (id: string) => void;
}) {
  return (
    <div className="mb-10">
      <h2 className="text-xl font-semibold mb-3">{title}</h2>

      {tasks.length === 0 ? (
        <p className="text-gray-500">No tasks</p>
      ) : (
        <div className="grid gap-3">
          {tasks.map((t) => (
            <div
              key={t.id}
              className="bg-white p-4 rounded shadow flex justify-between"
            >
              <div>
                <h3 className="font-medium">{t.title}</h3>
                <p className="text-sm text-gray-500">
                  Due: {new Date(t.dueDate).toDateString()}
                </p>

                {/* Assign User */}
                <select
                  value={t.assignedToId}
                  onChange={(e) =>
                    taskApi
                      .updateTask(t.id, {
                        assignedToId: e.target.value,
                      })
                      .then(reload)
                  }
                  className="mt-2 border px-2 py-1 rounded text-sm"
                >
                  {users.map((u) => (
                    <option key={u.id} value={u.id}>
                      {u.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="text-right text-sm space-y-2">
                {/* Status */}
                <select
                  value={t.status}
                  onChange={(e) =>
                    taskApi
                      .updateTask(t.id, {
                        status: e.target.value,
                      })
                      .then(reload)
                  }
                  className="border px-2 py-1 rounded"
                >
                  <option value="TODO">Todo</option>
                  <option value="IN_PROGRESS">In Progress</option>
                  <option value="REVIEW">Review</option>
                  <option value="COMPLETED">Completed</option>
                </select>

                <div className="font-semibold">{t.priority}</div>

                {/* DELETE BUTTON */}
                <button
                  onClick={() => onDelete(t.id)}
                  className="text-red-600 text-xs underline"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
