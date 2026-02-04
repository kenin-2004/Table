import React, { useState } from "react";

const Sorting = ({ onSort }) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("");

  const options = ["asc", "desc"];

  const handleSort = (order) => {
    setSelected(order);
    setOpen(false);
    onSort?.(order); 
  };

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="bg-black text-white px-4 py-2 text-lg rounded-xl"
      >
        Sort {selected && `(${selected})`}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg overflow-hidden z-10">
          {options.map((order) => (
            <button
              key={order}
              onClick={() => handleSort(order)}
              className="block w-full px-4 py-2 text-left hover:bg-gray-100"
            >
              {order === "asc" ? "Ascending" : "Descending"}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Sorting;
