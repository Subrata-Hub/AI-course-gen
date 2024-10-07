import axios from "axios";

const API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;

export const getVideos = async (query) => {
  try {
    const response = await axios.get(
      "https://www.googleapis.com/youtube/v3/search",
      {
        params: {
          part: "snippet",
          q: query,
          maxResults: 3,
          type: "video",
          key: API_KEY,
        },
      }
    );
    return response.data.items;
  } catch (error) {
    console.error("Error fetching videos", error);
    throw error;
  }
};
