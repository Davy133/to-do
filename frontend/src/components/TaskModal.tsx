import React from "react";
import Modal from "react-modal";

Modal.setAppElement('#root');

interface TaskModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  newTask: {
    title: string;
    description: string;
    dueDate: string;
  };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
}

const TaskModal: React.FC<TaskModalProps> = ({ isOpen, onRequestClose, newTask, handleInputChange, handleSubmit }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Add New Task"
      className="text-white bg-[#1E1F22] p-8 rounded-lg shadow-lg max-w-lg mx-auto mt-20"
    >
      <h2 className="text-2xl font-bold mb-4">Add New Task</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Title</label>
          <input
            type="text"
            name="title"
            value={newTask.title}
            onChange={handleInputChange}
            required
            className="w-full p-2 rounded bg-[#2A2C31] border border-gray-700 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            name="description"
            value={newTask.description}
            onChange={handleInputChange}
            required
            className="w-full p-2 rounded bg-[#2A2C31] border border-gray-700 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Due Date</label>
          <input
            type="date"
            name="dueDate"
            value={newTask.dueDate}
            onChange={handleInputChange}
            required
            className="w-full p-2 rounded bg-[#2A2C31] border border-gray-700 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={onRequestClose}
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded transition duration-300"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300"
          >
            Add Task
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default TaskModal;
