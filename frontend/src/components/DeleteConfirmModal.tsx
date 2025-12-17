import React from "react";

type Props = {
  onConfirm: () => void;
  onCancel: () => void;
};

export default function DeleteConfirmModal({
  onConfirm,
  onCancel,
}: Props) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-sm shadow-xl">
        <h2 className="text-lg font-semibold mb-4">
          Delete Task?
        </h2>

        <p className="text-sm text-gray-600 mb-6">
          This action cannot be undone.
        </p>

        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded bg-gray-200"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded bg-red-600 text-white"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
