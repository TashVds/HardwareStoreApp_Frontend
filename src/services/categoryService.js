// src/services/categoryService.js
import axios from 'axios';

export async function getCategories() {
  try {
    const response = await axios.get('/api/categories');
    return response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}