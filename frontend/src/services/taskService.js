import api from "./api";

export const getTasks = (params = {}) => {
  return api.get("/tasks", {
    params,
  });
};

export const getTask = (taskId) => {
  return api.get(`/tasks/${taskId}`);
};

export const createTask = (taskData) => {
  return api.post("/tasks", taskData);
};

export const updateTask = (taskId, taskData) => {
  return api.put(`/tasks/${taskId}`, taskData);
};

export const deleteTask = (taskId) => {
  return api.delete(`/tasks/${taskId}`);
};