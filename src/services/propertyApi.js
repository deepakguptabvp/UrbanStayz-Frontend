import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// GET all properties
export const getAllProperties = () => API.get("/properties");

// GET single property
export const getPropertyById = (id) => API.get(`/properties/${id}`);

// CREATE property
export const createProperty = (data) => API.post("/properties", data);

// UPDATE property
export const updateProperty = (id, data) =>
  API.put(`/properties/${id}`, data);

// DELETE property
export const deleteProperty = (id) =>
  API.delete(`/properties/${id}`);
