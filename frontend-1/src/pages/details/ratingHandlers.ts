import axios from 'axios';
import { API_URL } from "../../api";

// Define types for better code quality
// or any other types you may have
type RatingResponse = {
  score: number;
};

// Function to add a rating
const addRating = async (
  uuid: string,
  mediatype: string,
  tmdb_id: string,
  score: number
): Promise<void> => {
  try {
    const payload = {
      uuid,
      mediatype,
      tmdb_id,
      score,
    };
    
    await axios.post(`${API_URL}/rating`, payload, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    console.log('Rating added successfully');
  } catch (error) {
    console.error(`Failed to add rating: ${error}`);
  }
};

// Function to get a user's rating
const getUserRating = async (
  uuid: string,
  mediatype: string,
  tmdb_id: string
): Promise<number | null> => {
  try {
    const url = `${API_URL}/rating/${uuid}/${mediatype}/${tmdb_id}`;
    
    const response = await axios.get<RatingResponse>(url, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    return response.data.score;
  } catch (error) {
    console.error(`Failed to get user rating: ${error}`);
    return null;
  }
};

export { addRating, getUserRating };
