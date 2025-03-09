import React, { useState } from "react";

interface TaskCardProps {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  isCompleted: boolean;
  onDelete: () => void;
  onComplete: () => void;
  onEdit: () => void;
}

const TaskCard: React.FC<TaskCardProps> = ({
  title,
  description,
  dueDate,
  isCompleted: initialIsCompleted,
  onDelete,
  onComplete,
  onEdit,
}) => {
  const [isCompleted, setIsCompleted] = useState(initialIsCompleted);

  const handleComplete = () => {
    setIsCompleted(!isCompleted);
    onComplete();
  };

  return (
    <div className="bg-[#1F2125] p-6 rounded-2xl shadow-lg w-full border border-gray-700 transition hover:shadow-xl min-w-0">
      {/* Title and Status */}
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold text-white truncate overflow-hidden text-ellipsis max-w-full">
          {title}
        </h3>
        <span
          className={`px-3 py-1 text-xs font-semibold rounded-full ${
            isCompleted ? "bg-green-600 text-white" : "bg-yellow-500 text-black"
          }`}
        >
          {isCompleted ? "Completed" : "Pending"}
        </span>
      </div>

      {/* Description */}
      <p className="text-sm text-gray-300 mt-2 break-words line-clamp-3">
        {description}
      </p>

      {/* Due Date */}
      <p className="text-sm text-gray-400 mt-3">
        📅 Due:{" "}
        <span className="font-medium text-white">
          {new Date(new Date(dueDate).getTime() + 4 * 60 * 60 * 1000).toLocaleDateString()}
        </span>
      </p>

      {/* Action Buttons */}
      <div className="grid grid-cols-3 gap-3 mt-6">
        <button
          onClick={handleComplete}
          className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition w-full"
        >
          {isCompleted ? "Undo" : "Done"}
        </button>
        <button
          onClick={onEdit}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition w-full"
        >
          Edit
        </button>
        <button
          onClick={onDelete}
          className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition w-full"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
