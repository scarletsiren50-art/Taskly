import api from "./api";

export const registerUser = (userData) => {
    return api.post("/auth/register", userData);
};

export const loginUser = (credentials) => {
    return api.post("/auth/login", credentials);
};

export const forgotPassword = (emailData) => {
    return api.post("/auth/forgot-password", emailData);

};

export const resetPassword = (resetData) => {
    return api.post("/auth/reset-password", resetData);
};