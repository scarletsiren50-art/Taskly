import api from "./api";

export const getProfile = () => {
    return api.get("/users/profile");
};

export const updateProfile = (profileData) => {
    return api.put("/users/profile", profileData);
};

export const deleteProfile = () => {
    return api.delete("/users/profile");
};