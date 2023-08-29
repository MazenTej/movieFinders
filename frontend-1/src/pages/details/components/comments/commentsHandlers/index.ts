
import { API_URL } from "../../../../../api";
import axios from 'axios';

export interface Comments {
    uuid: string;
    author: string;
    body: string;
    postedAt: string;
    replies: {
      author: string;
      body: string;
      postedAt: string;
    }[];
  }

export const fetchComments = async (movieId: string): Promise<Comments[]> => {
    try {
      const response = await axios.get(`${API_URL}/movies/${movieId}/comments`);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch comments:', error);
      throw error;
    }
  };

  export const postReply = async (movieId: string, commentId: string, author: string, body: string, postedAt: String): Promise<Comments[]> => {
    try {
      const response = await axios.post(`${API_URL}/movies/${movieId}/comments/${commentId}/replies`, {
        author : author,
        body : body,
        postedAt : postedAt
      });
      const latestComments = await fetchComments(movieId);
        return latestComments;
    } catch (error) {
      console.error('Failed to post reply:', error);
      throw error;
    }
  }

export const postComment = async (movieId: string, author: string, body: string, postedAt: string): Promise<Comments[]> => {
    // Preparing the comment structure before sending to backend
    const newComment = {
        author: author,
        body: body,
        postedAt: postedAt,
        replies: [],
        // We'll let the backend generate the UUID instead of doing it on the client side.
    };

    try {
        await axios.post(`${API_URL}/movies/${movieId}/comments`, newComment);
        const latestComments = await fetchComments(movieId);
        return latestComments;
    } catch (error) {
        console.error('Failed to post comment:', error);
        throw error;
    }
};

