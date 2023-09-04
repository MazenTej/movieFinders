
import { API_URL } from "../../../api";
import axios from 'axios';

interface Movie {
  image: string;
  title: string;
  category: string;
  mediaType: string;
  id: string;
}

export const fetchFavorites = async (id: any): Promise<Movie[]> => {
    try {
      const response = await axios.get(`${API_URL}/favourites?uuid=${id}`);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch favourites:', error);
      throw error;
    }
  };