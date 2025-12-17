import React, { useState } from "react";
import taskApi from "../api/task.api";

type Props = {
  onClose: () => void;
  onCreated: () => void;
};

export default function CreateTaskModal({
  onClose,
  onCreated,
}: Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("MEDIUM");
  const [dueDate, setDueDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await taskApi.createTask({
        title,
        description,
        priority,
        dueDate,
      });

      onCreated(); // refresh dashboard
      onClose();   // close modal
    } catch {
      setError("Failed to create task");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md rounded-xl p-6 shadow-lg">
        <h2 className="text-xl font-semibold mb-4">
          ➕ Create Task
        </h2>

        <form onSubmit={submit} className="space-y-4">
          <input
            placeholder="Title"
            className="w-full border p-2 rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <textarea
            placeholder="Description"
            className="w-full border p-2 rounded"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <select
            className="w-full border p-2 rounded"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="LOW">Low</option>
            <option value="MEDIUM">Medium</option>
            <option value="HIGH">High</option>
          </select>

          <input
            type="date"
            className="w-full border p-2 rounded"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            required
          />

          {error && (
            <p className="text-sm text-red-600">{error}</p>
          )}

          <div className="flex justify-end gap-3 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded bg-gray-200"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 rounded bg-indigo-600 text-white disabled:opacity-60"
            >
              {loading ? "Creating..." : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
