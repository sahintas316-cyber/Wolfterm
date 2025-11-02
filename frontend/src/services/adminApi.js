import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api/admin`;

const getAuthHeader = () => {
  const token = localStorage.getItem('admin_token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const adminApi = {
  // Dashboard
  getDashboard: async () => {
    const response = await axios.get(`${API}/dashboard`, {
      headers: getAuthHeader()
    });
    return response.data;
  },

  // Products
  createProduct: async (data) => {
    const response = await axios.post(`${API}/products`, data, {
      headers: getAuthHeader()
    });
    return response.data;
  },
  updateProduct: async (id, data) => {
    const response = await axios.put(`${API}/products/${id}`, data, {
      headers: getAuthHeader()
    });
    return response.data;
  },

  deleteProduct: async (id) => {
    const response = await axios.delete(`${API}/products/${id}`, {
      headers: getAuthHeader()
    });
    return response.data;
  },

  // Reviews
  updateReview: async (id, data) => {
    const response = await axios.put(`${API}/reviews/${id}`, data, {
      headers: getAuthHeader()
    });
    return response.data;
  },

  deleteReview: async (id) => {
    const response = await axios.delete(`${API}/reviews/${id}`, {
      headers: getAuthHeader()
    });
    return response.data;
  },

  // Categories
  createCategory: async (data) => {
    const response = await axios.post(`${API}/categories`, data, {
      headers: getAuthHeader()
    });
    return response.data;
  },

  updateCategory: async (id, data) => {
    const response = await axios.put(`${API}/categories/${id}`, data, {
      headers: getAuthHeader()
    });
    return response.data;
  },

  deleteCategory: async (id) => {
    const response = await axios.delete(`${API}/categories/${id}`, {
      headers: getAuthHeader()
    });
    return response.data;
  },

  // Hero Slides
  getHeroSlides: async () => {
    const response = await axios.get(`${API}/hero-slides`, {
      headers: getAuthHeader()
    });
    return response.data;
  },

  createHeroSlide: async (data) => {
    const response = await axios.post(`${API}/hero-slides`, data, {
      headers: getAuthHeader()
    });
    return response.data;
  },

  updateHeroSlide: async (id, data) => {
    const response = await axios.put(`${API}/hero-slides/${id}`, data, {
      headers: getAuthHeader()
    });
    return response.data;
  },

  deleteHeroSlide: async (id) => {
    const response = await axios.delete(`${API}/hero-slides/${id}`, {
      headers: getAuthHeader()
    });
    return response.data;
  },

  // Site Settings
  getSettings: async () => {
    const response = await axios.get(`${API}/settings`, {
      headers: getAuthHeader()
    });
    return response.data;
  },

  updateSettings: async (data) => {
    const response = await axios.put(`${API}/settings`, data, {
      headers: getAuthHeader()
    });
    return response.data;
  },

  // Image Upload
  uploadImage: async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await axios.post(`${API}/upload-image`, formData, {
      headers: {
        ...getAuthHeader(),
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  },

  // Catalogs
  getCatalogs: async () => {
    const response = await axios.get(`${API}/catalogs`, {
      headers: getAuthHeader()
    });
    return response.data;
  },
  createCatalog: async (data) => {
    const response = await axios.post(`${API}/catalogs`, data, {
      headers: getAuthHeader()
    });
    return response.data;
  },
  updateCatalog: async (id, data) => {
    const response = await axios.put(`${API}/catalogs/${id}`, data, {
      headers: getAuthHeader()
    });
    return response.data;
  },
  deleteCatalog: async (id) => {
    const response = await axios.delete(`${API}/catalogs/${id}`, {
      headers: getAuthHeader()
    });
    return response.data;
  }
};