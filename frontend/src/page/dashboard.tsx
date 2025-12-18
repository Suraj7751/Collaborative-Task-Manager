import React, { useEffect, useMemo, useState } from "react";
import taskApi from "../api/task.api";
import userApi from "../api/user.api";
import CreateTaskModal from "../components/CreateTaskModal";
import DeleteConfirmModal from "../components/DeleteConfirmModal";
import { socket } from "../socket";

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
   UI HELPERS
===================== */
const statusColor: Record<Task["status"], string> = {
  TODO: "bg-gray-200 text-gray-700",
  IN_PROGRESS: "bg-blue-100 text-blue-700",
  REVIEW: "bg-yellow-100 text-yellow-700",
  COMPLETED: "bg-green-100 text-green-700",
};

const priorityColor: Record<Task["priority"], string> = {
  LOW: "text-gray-500",
  MEDIUM: "text-indigo-600",
  HIGH: "text-orange-600",
  URGENT: "text-red-600 font-semibold",
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
  const [deleteTaskId, setDeleteTaskId] = useState<string | null>(null);

  const [statusFilter, setStatusFilter] = useState("ALL");
  const [priorityFilter, setPriorityFilter] = useState("ALL");
  const [sortOrder, setSortOrder] = useState<"ASC" | "DESC">("ASC");

  /* =====================
     LOAD TASKS
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

  /* =====================
     INITIAL LOAD
  ===================== */
  useEffect(() => {
    loadTasks();
    userApi.getUsers().then((res) => setUsers(res.data));
  }, []);

  /* =====================
     REAL-TIME SOCKET
  ===================== */
  useEffect(() => {
    socket.on("task:created", loadTasks);
    socket.on("task:updated", loadTasks);
    socket.on("task:deleted", loadTasks);

    return () => {
      socket.off("task:created", loadTasks);
      socket.off("task:updated", loadTasks);
      socket.off("task:deleted", loadTasks);
    };
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

  if (loading) {
    return <p className="p-6 text-slate-600">Loading dashboard...</p>;
  }

  /* =====================
     RENDER
  ===================== */
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200">
      <div className="max-w-7xl mx-auto p-8">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-4xl font-bold text-slate-800">
              📊 Task Dashboard
            </h1>
            <p className="text-slate-500 mt-1">
              Real-time collaboration & task tracking
            </p>
          </div>

          <button
            onClick={() => setShowCreate(true)}
            className="px-5 py-3 rounded-xl bg-indigo-600 text-white font-medium shadow-lg hover:bg-indigo-700 hover:shadow-xl transition"
          >
            + Create Task
          </button>
        </div>

        {/* FILTERS */}
        <div className="flex flex-wrap gap-4 mb-10 bg-white/70 backdrop-blur p-4 rounded-xl shadow">
          <select
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 rounded-lg border bg-white"
          >
            <option value="ALL">All Status</option>
            <option value="TODO">Todo</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="REVIEW">Review</option>
            <option value="COMPLETED">Completed</option>
          </select>

          <select
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="px-3 py-2 rounded-lg border bg-white"
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
            className="px-3 py-2 rounded-lg border bg-white"
          >
            <option value="ASC">Due Date ↑</option>
            <option value="DESC">Due Date ↓</option>
          </select>
        </div>

        {/* SECTIONS */}
        <TaskSection
          title="⏰ Overdue Tasks"
          tasks={overdueTasks}
          users={users}
          reload={loadTasks}
          onDelete={setDeleteTaskId}
        />

        <TaskSection
          title="📥 Assigned To Me"
          tasks={filterSort(assignedTasks)}
          users={users}
          reload={loadTasks}
          onDelete={setDeleteTaskId}
        />

        <TaskSection
          title="📝 Created By Me"
          tasks={filterSort(createdTasks)}
          users={users}
          reload={loadTasks}
          onDelete={setDeleteTaskId}
        />
      </div>

      {/* MODALS */}
      {showCreate && (
        <CreateTaskModal
          onClose={() => setShowCreate(false)}
          onCreated={loadTasks}
        />
      )}

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
function TaskSection({
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
    <div className="mb-14">
      <h2 className="text-2xl font-semibold text-slate-700 mb-5">
        {title}
      </h2>

      {tasks.length === 0 ? (
        <p className="text-slate-500">No tasks</p>
      ) : (
        <div className="grid gap-5">
          {tasks.map((t) => (
            <div
              key={t.id}
              className="bg-white rounded-2xl p-6 shadow hover:shadow-xl transition flex justify-between"
            >
              <div>
                <h3 className="text-lg font-semibold text-slate-800">
                  {t.title}
                </h3>
                <p className="text-sm text-slate-500 mt-1">
                  Due: {new Date(t.dueDate).toDateString()}
                </p>

                <select
                  value={t.assignedToId}
                  onChange={(e) =>
                    taskApi
                      .updateTask(t.id, {
                        assignedToId: e.target.value,
                      })
                      .then(reload)
                  }
                  className="mt-3 px-3 py-1 rounded-lg border text-sm bg-slate-50"
                >
                  {users.map((u) => (
                    <option key={u.id} value={u.id}>
                      {u.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col items-end gap-2">
                <select
                  value={t.status}
                  onChange={(e) =>
                    taskApi
                      .updateTask(t.id, {
                        status: e.target.value,
                      })
                      .then(reload)
                  }
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    statusColor[t.status]
                  }`}
                >
                  <option value="TODO">Todo</option>
                  <option value="IN_PROGRESS">In Progress</option>
                  <option value="REVIEW">Review</option>
                  <option value="COMPLETED">Completed</option>
                </select>

                <span className={`text-sm ${priorityColor[t.priority]}`}>
                  {t.priority}
                </span>

                <button
                  onClick={() => onDelete(t.id)}
                  className="text-xs text-red-500 hover:text-red-700 underline"
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
