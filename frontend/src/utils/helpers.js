export const generateId = () =>
  `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

export const simulateAsync = (fn, delay = 600) =>
  new Promise((resolve) => setTimeout(() => resolve(fn()), delay));

export const validateStudent = (data) => {
  const errors = {};
  if (!data.name || data.name.trim().length < 2)
    errors.name = "Name must be at least 2 characters.";
  if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
    errors.email = "Please enter a valid email address.";
  const age = parseInt(data.age, 10);
  if (!data.age || isNaN(age) || age < 1 || age > 120)
    errors.age = "Age must be a valid number between 1 and 120.";
  return errors;
};
