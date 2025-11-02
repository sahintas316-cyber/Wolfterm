import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

export const api = {
  // Products
  getProducts: async (category = null) => {
    const url = category ? `${API}/products?category=${category}` : `${API}/products`;
    const response = await axios.get(url);
    return response.data;
  },

  getProduct: async (id) => {
    const response = await axios.get(`${API}/products/${id}`);
    return response.data;
  },

  createProduct: async (product) => {
    const response = await axios.post(`${API}/products`, product);
    return response.data;
  },

  // Reviews
  getReviews: async () => {
    const response = await axios.get(`${API}/reviews`);
    return response.data;
  },

  createReview: async (review) => {
    const response = await axios.post(`${API}/reviews`, review);
    return response.data;
  },

  // Categories
  getCategories: async () => {
    const response = await axios.get(`${API}/categories`);
    return response.data;
  },

  // Catalogs
  getCatalogs: async () => {
    const response = await axios.get(`${API}/catalogs`);
    return response.data;
  },

  // Hero Slides
  getHeroSlides: async () => {
    const response = await axios.get(`${API}/hero-slides`);
    return response.data;
  },

  // Contact
  submitContact: async (form) => {
    const response = await axios.post(`${API}/contact`, form);
    return response.data;
  },

  // Search
  searchProducts: async (query) => {
    const response = await axios.get(`${API}/search?q=${encodeURIComponent(query)}`);
    return response.data;
  }
};
