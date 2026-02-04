import React, { useState } from "react";
import Datatable from "./components/Datatable";
import Sorting from "./components/Sorting";
import { Dummydata } from "./Dummydata";

const App = () => {
  const [order, setOrder] = useState("");


 // column config
  const columns = [
  { key: "id", label: "ID", type: "number", width: "100px" },
  { key: "first_name", label: "First Name", type: "text", width: "200px" },
  { key: "last_name", label: "Last Name", type: "text", width: "200px" },
  { key: "email", label: "Email", type: "text", width: "250px" },
  { key: "number", label: "Number", type: "text", width: "200px" },
  { key: "date", label: "Date", type: "date", width: "150px" },
];

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center pt-10">

      <div className="w-full max-w-6xl">

        {/* Sorting */}
        <div className="flex justify-end mb-4">
          <Sorting onSort={setOrder} />
        </div>

        {/* Table */}
        <Datatable
          columns={columns}
          data={Dummydata}
          sortOrder={order}
        />

      </div>
    </div>
  );
};

export default App;
