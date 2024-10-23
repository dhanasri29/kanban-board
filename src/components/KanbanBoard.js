// src/components/KanbanBoard.js
import React, { useState, useEffect } from "react";
import GroupSelector from "./GroupSelector";
import SortSelector from "./SortSelector";
import TicketCard from "./TicketCard";
import "./KanbanBoard.css";

const KanbanBoard = ({ tickets, groupBy, setGroupBy, sortOrder, setSortOrder }) => {
  const [groupedTickets, setGroupedTickets] = useState({});

  useEffect(() => {
    // Group tickets based on the selected option
    const groupTickets = () => {
      let grouped = {};
      switch (groupBy) {
        case "status":
          grouped = groupByStatus(tickets);
          break;
        case "user":
          grouped = groupByUser(tickets);
          break;
        case "priority":
          grouped = groupByPriority(tickets);
          break;
        default:
          break;
      }
      setGroupedTickets(grouped);
    };

    groupTickets();
  }, [tickets, groupBy]);

  // Grouping logic with safety checks
  const groupByStatus = (tickets) => {
    if (!Array.isArray(tickets)) return {}; // Ensure tickets is an array
    return tickets.reduce((acc, ticket) => {
      (acc[ticket.status] = acc[ticket.status] || []).push(ticket);
      return acc;
    }, {});
  };

  const groupByUser = (tickets) => {
    if (!Array.isArray(tickets)) return {};
    return tickets.reduce((acc, ticket) => {
      (acc[ticket.userId] = acc[ticket.userId] || []).push(ticket);
      return acc;
    }, {});
  };

  const groupByPriority = (tickets) => {
    if (!Array.isArray(tickets)) return {};
    return tickets.reduce((acc, ticket) => {
      (acc[ticket.priority] = acc[ticket.priority] || []).push(ticket);
      return acc;
    }, {});
  };

  return (
    <div className="kanban-board">
      <GroupSelector groupBy={groupBy} setGroupBy={setGroupBy} />
      <SortSelector sortOrder={sortOrder} setSortOrder={setSortOrder} />
      {Object.keys(groupedTickets).map((group) => (
        <div key={group} className="kanban-column">
          <h2>{group}</h2>
          {groupedTickets[group]
            .sort((a, b) => (sortOrder === "priority" ? b.priority - a.priority : a.title.localeCompare(b.title)))
            .map((ticket) => (
              <TicketCard key={ticket.id} ticket={ticket} />
            ))}
        </div>
      ))}
    </div>
  );
};

export default KanbanBoard;
