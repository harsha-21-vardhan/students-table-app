import React, { useState } from "react";

export default function StudentTable({ students, onEdit, onDelete, loading }) {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  const sorted = [...(students || [])].sort((a, b) => {
    if (!sortConfig.key) return 0;
    let aVal = a[sortConfig.key];
    let bVal = b[sortConfig.key];
    if (sortConfig.key === "age") {
      aVal = Number(aVal);
      bVal = Number(bVal);
    } else {
      aVal = String(aVal).toLowerCase();
      bVal = String(bVal).toLowerCase();
    }
    if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1;
    if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1;
    return 0;
  });

  if (loading) {
    return (
      <div className="table-loading">
        <div className="loading-pulse">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="skeleton-row">
              <div className="skeleton" style={{ width: "180px" }} />
              <div className="skeleton" style={{ width: "240px" }} />
              <div className="skeleton" style={{ width: "50px" }} />
              <div className="skeleton" style={{ width: "120px" }} />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!students || students.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
          </svg>
        </div>
        <p className="empty-title">No students found</p>
        <p className="empty-subtitle">Try adjusting your search or add a new student.</p>
      </div>
    );
  }

  return (
    <div className="table-wrapper">
      <table className="student-table">
        <thead>
          <tr>
            <th style={{ padding: "12px 16px", fontSize: "0.75rem", fontWeight: 600, color: "var(--text-2)", textTransform: "uppercase" }}>
              #
            </th>
            <th style={{ padding: "12px 16px", fontSize: "0.75rem", fontWeight: 600, color: "var(--text-2)", textTransform: "uppercase", cursor: "pointer" }}
              onClick={() => handleSort("name")}>
              Name {sortConfig.key === "name" ? (sortConfig.direction === "asc" ? "↑" : "↓") : ""}
            </th>
            <th style={{ padding: "12px 16px", fontSize: "0.75rem", fontWeight: 600, color: "var(--text-2)", textTransform: "uppercase", cursor: "pointer" }}
              onClick={() => handleSort("email")}>
              Email {sortConfig.key === "email" ? (sortConfig.direction === "asc" ? "↑" : "↓") : ""}
            </th>
            <th style={{ padding: "12px 16px", fontSize: "0.75rem", fontWeight: 600, color: "var(--text-2)", textTransform: "uppercase", cursor: "pointer", textAlign: "center" }}
              onClick={() => handleSort("age")}>
              Age {sortConfig.key === "age" ? (sortConfig.direction === "asc" ? "↑" : "↓") : ""}
            </th>
            <th style={{ padding: "12px 16px", fontSize: "0.75rem", fontWeight: 600, color: "var(--text-2)", textTransform: "uppercase", textAlign: "right" }}>
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((student, idx) => (
            <tr key={student.id} className="table-row">
              <td style={{ padding: "13px 16px", fontSize: "0.75rem", color: "var(--text-3)" }}>
                {idx + 1}
              </td>
              <td style={{ padding: "13px 16px" }}>
                <div className="student-name-cell">
                  <div className="avatar">
                    {student.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="student-name">{student.name}</span>
                </div>
              </td>
              <td style={{ padding: "13px 16px", fontSize: "0.845rem", color: "var(--text-2)" }}>
                {student.email}
              </td>
              <td style={{ padding: "13px 16px", textAlign: "center" }}>
                <span className="age-badge">{student.age}</span>
              </td>
              <td style={{ padding: "13px 16px" }}>
                <div className="action-btns">
                  <button
                    className="action-btn edit-btn"
                    onClick={() => {
                      console.log("Edit clicked:", student);
                      onEdit(student);
                    }}
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
                      <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
                    </svg>
                    Edit
                  </button>
                  <button
                    className="action-btn delete-btn"
                    onClick={() => {
                      console.log("Delete clicked:", student);
                      onDelete(student);
                    }}
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <polyline points="3 6 5 6 21 6" />
                      <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
                      <path d="M10 11v6M14 11v6" />
                      <path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2" />
                    </svg>
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="table-footer">
        Showing <strong>{students.length}</strong> student{students.length !== 1 ? "s" : ""}
      </div>
    </div>
  );
}