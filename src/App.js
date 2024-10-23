// src/App.js
import React, { useState, useEffect } from "react";
import KanbanBoard from "./components/KanbanBoard";
import "./App.css";

const App = () => {
  const [tickets, setTickets] = useState([]); // Ensure initial state is an empty array
  const [groupBy, setGroupBy] = useState("status");
  const [sortOrder, setSortOrder] = useState("priority");

  useEffect(() => {
    // Fetch data from API
    fetch("https://api.quicksell.co/v1/internal/frontend-assignment")
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched data:", data); // Log the fetched data to check its structure
        setTickets(data.tickets || data); // Adjust based on the actual structure
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);
  

  return (
    <div className="App">
      <h1>Kanban Board</h1>
      <KanbanBoard
        tickets={tickets}
        groupBy={groupBy}
        setGroupBy={setGroupBy}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
      />
    </div>
  );
};

export default App;
