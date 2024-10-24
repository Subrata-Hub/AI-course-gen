import axios from "axios";

import { YoutubeTranscript } from "youtube-transcript";

const API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;

export const getVideos = async (query) => {
  try {
    const response = await axios.get(
      "https://www.googleapis.com/youtube/v3/search",
      {
        params: {
          part: "snippet",
          q: query,
          maxResults: 5,
          videoDuration: "medium",
          type: "video",
          key: API_KEY,
        },
      }
    );
    if (!response) {
      console.log("Youtube Fail");
      return null;
    }

    if (response.data.items === "undefined") {
      console.log("Youtube Fail");
      return null;
    }
    return response.data.items;
  } catch (error) {
    console.error("Error fetching videos", error);
    throw error;
  }
};

export async function getTranscript(videoId) {
  try {
    const tranScriptArr = await YoutubeTranscript.fetchTranscript(videoId, {
      lang: "en",
      country: "EN",
    });
    let transcript = "";
    for (const t of tranScriptArr) {
      transcript += t.text + " ";
    }
    return transcript.replaceAll("\n", "");
  } catch (error) {
    return "";
  }
}
