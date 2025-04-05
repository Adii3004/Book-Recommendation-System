import axios from "axios";

// Function to get book recommendations from your backend API
export const getBookRecommendations = async (query) => {
  try {
    const response = await axios.post("http://localhost:5000/api/recommend", { query });
    
    // Check if the response has the expected format
    if (response.data && response.data.recommendations) {
      return response.data.recommendations;
    } else {
      console.error("Unexpected API response format:", response.data);
      return null;
    }
  } catch (error) {
    console.error("Error fetching recommendations:", error);
    throw error;
  }
};