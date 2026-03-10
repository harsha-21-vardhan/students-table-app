import { useReducer, useEffect } from "react";

const BASE_URL = "http://localhost:4000";

const initialState = {
  students: [],
  loading: false,
  error: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "SET_STUDENTS":
      return { ...state, students: action.payload, loading: false };
    case "SET_ERROR":
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
}

export function useStudents() {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Fetch all students from backend
  const fetchStudents = async () => {
    dispatch({ type: "SET_LOADING", payload: true });
    try {
      const res = await fetch(`${BASE_URL}/students`);
      const data = await res.json();
      dispatch({ type: "SET_STUDENTS", payload: data });
    } catch (err) {
      dispatch({ type: "SET_ERROR", payload: "Failed to fetch students" });
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // Add student
  const addStudent = async (studentData) => {
    dispatch({ type: "SET_LOADING", payload: true });
    try {
      const res = await fetch(`${BASE_URL}/students`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(studentData),
      });
      const data = await res.json();
      await fetchStudents();
      return data;
    } catch (err) {
      dispatch({ type: "SET_ERROR", payload: "Failed to add student" });
    }
  };

  // Update student
  const updateStudent = async (studentData) => {
    dispatch({ type: "SET_LOADING", payload: true });
    try {
      const { id, ...rest } = studentData;
      const res = await fetch(`${BASE_URL}/students/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(rest),
      });
      const data = await res.json();
      await fetchStudents();
      return data;
    } catch (err) {
      dispatch({ type: "SET_ERROR", payload: "Failed to update student" });
    }
  };

  // Delete student
  const deleteStudent = async (id) => {
    dispatch({ type: "SET_LOADING", payload: true });
    try {
      await fetch(`${BASE_URL}/students/${id}`, {
        method: "DELETE",
      });
      await fetchStudents();
    } catch (err) {
      dispatch({ type: "SET_ERROR", payload: "Failed to delete student" });
    }
  };

  return {
    students: state.students,
    loading: state.loading,
    error: state.error,
    addStudent,
    updateStudent,
    deleteStudent,
  };
}