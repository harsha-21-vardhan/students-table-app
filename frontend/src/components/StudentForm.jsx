import React, { useState, useEffect } from "react";

function validateStudent(fields) {
  const errors = {};
  if (!fields.name || !fields.name.trim()) {
    errors.name = "Name is required.";
  } else if (fields.name.trim().length < 2) {
    errors.name = "Name must be at least 2 characters.";
  }
  if (!fields.email || !fields.email.trim()) {
    errors.email = "Email is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email.trim())) {
    errors.email = "Enter a valid email address.";
  }
  if (fields.age === "" || fields.age === null || fields.age === undefined) {
    errors.age = "Age is required.";
  } else if (isNaN(Number(fields.age))) {
    errors.age = "Age must be a number.";
  } else if (Number(fields.age) < 1 || Number(fields.age) > 120) {
    errors.age = "Age must be between 1 and 120.";
  }
  return errors;
}

export default function StudentForm({ isOpen, student, onSubmit, onClose, loading }) {
  const emptyForm = { id: "", name: "", email: "", age: "" };
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const isEditing = !!student;

  useEffect(() => {
    if (isOpen) {
      if (student) {
        setForm({
          id: student.id,
          name: student.name,
          email: student.email,
          age: String(student.age),
        });
      } else {
        setForm(emptyForm);
      }
      setErrors({});
      setTouched({});
    }
  }, [isOpen, student]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (touched[name]) {
      const errs = validateStudent({ ...form, [name]: value });
      setErrors((prev) => ({ ...prev, [name]: errs[name] }));
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const errs = validateStudent(form);
    setErrors((prev) => ({ ...prev, [name]: errs[name] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched({ name: true, email: true, age: true });
    const errs = validateStudent(form);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    const payload = {
      name: form.name.trim(),
      email: form.email.trim().toLowerCase(),
      age: Number(form.age),
    };
    if (isEditing && form.id) {
      payload.id = form.id;
    }
    console.log("Submitting payload:", payload);
    onSubmit(payload);
  };

  if (!isOpen) return null;

  return (
    <div className="dialog-overlay" onClick={onClose}>
      <div className="form-modal" onClick={(e) => e.stopPropagation()}>

        {/* Header */}
        <div className="form-modal-header">
          <h2 className="form-modal-title">
            {isEditing ? "Edit Student" : "Add New Student"}
          </h2>
          <button className="close-btn" onClick={onClose} aria-label="Close">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <div className="form-body">

            {/* Name */}
            <div className="field-group">
              <label className="field-label" htmlFor="name">
                Full Name <span className="required-star">*</span>
              </label>
              <input
                id="name"
                name="name"
                type="text"
                className={`field-input ${
                  touched.name && errors.name ? "input-error" :
                  touched.name && !errors.name ? "input-success" : ""
                }`}
                placeholder="e.g. Alice Johnson"
                value={form.name}
                onChange={handleChange}
                onBlur={handleBlur}
                autoComplete="off"
              />
              {touched.name && errors.name && (
                <span className="error-msg">{errors.name}</span>
              )}
            </div>

            {/* Email */}
            <div className="field-group">
              <label className="field-label" htmlFor="email">
                Email Address <span className="required-star">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                className={`field-input ${
                  touched.email && errors.email ? "input-error" :
                  touched.email && !errors.email ? "input-success" : ""
                }`}
                placeholder="e.g. alice@university.edu"
                value={form.email}
                onChange={handleChange}
                onBlur={handleBlur}
                autoComplete="off"
              />
              {touched.email && errors.email && (
                <span className="error-msg">{errors.email}</span>
              )}
            </div>

            {/* Age */}
            <div className="field-group">
              <label className="field-label" htmlFor="age">
                Age <span className="required-star">*</span>
              </label>
              <input
                id="age"
                name="age"
                type="number"
                min="1"
                max="120"
                className={`field-input ${
                  touched.age && errors.age ? "input-error" :
                  touched.age && !errors.age ? "input-success" : ""
                }`}
                placeholder="e.g. 21"
                value={form.age}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.age && errors.age && (
                <span className="error-msg">{errors.age}</span>
              )}
            </div>

          </div>

          {/* Footer */}
          <div className="form-footer">
            <button
              type="button"
              className="btn btn-ghost"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? (
                <span className="btn-loading">
                  <span className="spinner-sm" />
                  Saving...
                </span>
              ) : isEditing ? (
                "Update Student"
              ) : (
                "Add Student"
              )}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}