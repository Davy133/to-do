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

  const handleEdit = () => {
    onEdit();
  };

  return (
    <div className="bg-[#2A2C31] p-4 rounded-lg shadow-lg">
      <h3 className="text-xl font-semibold">{title}</h3>
      <p>{description}</p>
      <p className="text-sm text-gray-400">Prazo: {new Date(dueDate).toLocaleDateString()}</p>
      <div className="flex justify-between items-center mt-4">
        <div className="flex space-x-2">
          <button
            onClick={onDelete}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-300"
          >
            Delete
          </button>
          <button
            onClick={handleComplete}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition duration-300"
          >
            Complete
          </button>
          <button 
          onClick={handleEdit}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300"
          >
            Edit
          </button>
        </div>
        <span
          className={`text-sm ${
            isCompleted ? "text-green-500" : "text-yellow-500"
          }`}
        >
          {isCompleted ? "Completed" : "Pending"}
        </span>
      </div>
    </div>
  );
};

export default TaskCard;
