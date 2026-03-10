import React, { useState, useMemo } from "react";
import StudentTable from "../components/StudentTable";
import StudentForm from "../components/StudentForm";
import ConfirmDialog from "../components/ConfirmDialog";
import { useStudents } from "../hooks/useStudents";
import { exportStudentsToExcel } from "../utils/excelExport";

export default function Dashboard() {
  const { students, loading, addStudent, updateStudent, deleteStudent } = useStudents();

  const [search, setSearch] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const [editTarget, setEditTarget] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [formLoading, setFormLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const filteredStudents = useMemo(() => {
    if (!search.trim()) return students;
    const q = search.toLowerCase();
    return students.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.email.toLowerCase().includes(q)
    );
  }, [students, search]);

  // ── ADD ──────────────────────────────────────────
  const handleAddClick = () => {
    console.log("Add clicked");
    setEditTarget(null);
    setFormOpen(true);
  };

  // ── EDIT ─────────────────────────────────────────
  const handleEditClick = (student) => {
    console.log("Edit clicked, student:", student);
    setEditTarget(student);
    setFormOpen(true);
  };

  // ── DELETE ────────────────────────────────────────
  const handleDeleteClick = (student) => {
    console.log("Delete clicked, student:", student);
    setDeleteTarget(student);
  };

  // ── FORM SUBMIT ───────────────────────────────────
  const handleFormSubmit = async (data) => {
    setFormLoading(true);
    try {
      if (editTarget) {
        const updateData = { ...data, id: editTarget.id };
        console.log("Updating with:", updateData);
        await updateStudent(updateData);
        showToast(`${data.name} updated successfully.`);
      } else {
        console.log("Adding:", data);
        await addStudent(data);
        showToast(`${data.name} added successfully.`);
      }
      setFormOpen(false);
      setEditTarget(null);
    } catch (err) {
      console.error("Submit error:", err);
      showToast("Something went wrong.", "error");
    } finally {
      setFormLoading(false);
    }
  };

  // ── DELETE CONFIRM ────────────────────────────────
  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    try {
      console.log("Confirming delete:", deleteTarget);
      await deleteStudent(deleteTarget.id);
      showToast(`${deleteTarget.name} deleted.`, "error");
    } catch (err) {
      console.error("Delete error:", err);
      showToast("Failed to delete.", "error");
    } finally {
      setDeleteTarget(null);
    }
  };

  // ── EXCEL EXPORT ──────────────────────────────────
  const handleExportAll = () => {
    exportStudentsToExcel(students, "all-students");
    showToast("Exported all students to Excel.");
  };

  const handleExportFiltered = () => {
    exportStudentsToExcel(filteredStudents, "filtered-students");
    showToast("Exported filtered students to Excel.");
  };

  return (
    <div className="dashboard">

      {/* Toast */}
      {toast && (
        <div className={`toast toast-${toast.type}`}>
          <span>{toast.msg}</span>
        </div>
      )}

      {/* Header */}
      <header className="dash-header">
        <div className="dash-header-left">
          <div className="logo-mark">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
              <path d="M6 12v5c3 3 9 3 12 0v-5" />
            </svg>
          </div>
          <div>
            <h1 className="dash-title">Students Registry</h1>
            <p className="dash-subtitle">Manage your student records</p>
          </div>
        </div>
        <div className="dash-header-right">
          <span className="student-count-badge">
            {loading ? "..." : `${students.length} students`}
          </span>
        </div>
      </header>

      {/* Controls Bar */}
      <div className="controls-bar">
        {/* Search */}
        <div className="search-wrapper">
          <svg className="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            className="search-input"
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {search && (
            <button
              className="search-clear"
              onClick={() => setSearch("")}
              aria-label="Clear search"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          )}
        </div>

        {/* Action Buttons */}
        <div className="controls-actions">
          <div className="export-group">
            <button className="btn btn-outline" onClick={handleExportFiltered}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Export Filtered
            </button>
            <button className="btn btn-outline" onClick={handleExportAll}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="12" y1="18" x2="12" y2="12" />
                <line x1="9" y1="15" x2="15" y2="15" />
              </svg>
              Export All
            </button>
          </div>
          <button className="btn btn-primary" onClick={handleAddClick}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Add Student
          </button>
        </div>
      </div>

      {/* Filter Info */}
      {search && !loading && (
        <div className="filter-info">
          Found <strong>{filteredStudents.length}</strong> result
          {filteredStudents.length !== 1 ? "s" : ""} for &ldquo;{search}&rdquo;
        </div>
      )}

      {/* Table */}
      <StudentTable
        students={filteredStudents}
        onEdit={handleEditClick}
        onDelete={handleDeleteClick}
        loading={loading}
      />

      {/* Student Form Modal */}
      <StudentForm
        isOpen={formOpen}
        student={editTarget}
        onSubmit={handleFormSubmit}
        onClose={() => {
          setFormOpen(false);
          setEditTarget(null);
        }}
        loading={formLoading}
      />

      {/* Confirm Delete Dialog */}
      <ConfirmDialog
        isOpen={!!deleteTarget}
        title="Delete Student"
        message={`Are you sure you want to delete "${deleteTarget?.name}"? This action cannot be undone.`}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteTarget(null)}
      />

    </div>
  );
}