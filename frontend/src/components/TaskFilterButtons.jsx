import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const filterOptions = [
  { label: "All", value: "All Tasks" },
  { label: "Done", value: "Done Task" },
  { label: "In Progress", value: "In Progress Task" },
  { label: "To Do", value: "To Do Task" },
];

export default function TaskFilterButtons() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentStatus = new URLSearchParams(location.search).get("status") || "All Tasks";

  const handleFilter = (status) => {
    navigate(`?status=${encodeURIComponent(status)}`);
  };

  return (
    <div className="flex flex-wrap gap-2 justify-center md:justify-end w-[90%] mx-auto my-3">
      {filterOptions.map((option) => (
        <button
          key={option.value}
          onClick={() => handleFilter(option.value)}
          className={`px-3 py-2 rounded-md font-semibold transition-colors ${
            currentStatus === option.value
              ? "bg-pink-700 text-white"
              : "bg-white text-black border hover:bg-pink-300"
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
