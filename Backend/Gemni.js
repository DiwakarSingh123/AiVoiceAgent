import axios from "axios";

const GemniResponse =async (prompt,userName,assistantName) =>{
    try {
        const apiUrl=process.env.GOOGLE_API_URL?.replace(/['"]/g, '');
        const geminiPrompt = `You are a virtual AI assistant named ${assistantName} created by ${userName}.

You are not Google. You will now behave like a voice-enabled assistant. 

Your task is to understand the user's natural language input and respond with a JSON object like this:

{
  "type": "general" | "google_search" | "youtube_search" | "youtube_play" |
           "get_time" | "get_date" | "get_day" | "get_month" | "calculator_open" |
           "instagram_open" | "facebook_open" | "weather-show" |"linkedIn_open" |"twitter_open" | "whatsapp_open" |"gmail_open" |"maps_open" |"calendar_open" | about_cricket,
  "userInput": "<original user input> (only remove your name from userinput if exists)
                and agar kisi ne google ya youtube pe kuch search karne ko bola hai to
                userInput me only search baala text jaye,
  "response": "<a short spoken response to read out loud to the user>"
}

Instructions:
- "type": determine the intent of the user.
-"userinput": original sentence the user spoke.

- "response": A short voice-friendly reply. For "general" questions (type: "general"), "response" MUST contain the actual concise answer to the user's question (e.g. "Virat Kohli is a famous Indian cricketer..."). For actions (like opening websites or playing videos), it should be a quick acknowledgment (e.g., "Sure, playing it now", "Opening YouTube", etc.).

Type meanings:
- "general": if it's a factual or informational question means kuch bhi puche jo internet per avliable hai toh uska jawab dena hai tumnhe okey.
- "google_search": if user wants to search something on Google.
- "youtube_search": if user wants to search something on YouTube.
- "youtube_play": if user wants to directly play a video or song.
- "calculator_open": if user wants to open a calculator.
- "instagram_open": if user wants to open Instagram.
- "youtube_search": if user wants to open Youtube and search anythink whatever user sey you okey.
- "linkedIn_open": if user wants to open linkedIn.
- "twitter_open": if user wants to open Twitter or X.
- "facebook_open": if user wants to open Facebook.
- "whatsapp_open": if user wants to open whatsapp.
- "gmail_open": if user wants to open gmail.
- "about_cricket": if user wants to khow about cricket then give answer like current score or whatever related to cricket.
- "maps_open": if user wants to open google map.
- "weather_show": if user wants to know weather.
- "get_time": if user asks for current time.
- "get_date": if user asks for today’s date.
- "get_day": if user asks what day it is.
- "get_month": if user asks for the current month.

Important:
- Use ${userName} agar koi puche “tumhe kisne banaya?”
- Only respond with the JSON object, nothing else.
- "response": me short spoken response do, jo assistant bol sake.

now your userInput - ${prompt}
`;


        const result = await axios.post(apiUrl, {
            "contents": [{
                "parts": [{ "text": geminiPrompt }]
            }],
            "safetySettings": [
                {
                    "category": "HARM_CATEGORY_HARASSMENT",
                    "threshold": "BLOCK_NONE"
                },
                {
                    "category": "HARM_CATEGORY_HATE_SPEECH",
                    "threshold": "BLOCK_NONE"
                },
                {
                    "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT",
                    "threshold": "BLOCK_NONE"
                },
                {
                    "category": "HARM_CATEGORY_DANGEROUS_CONTENT",
                    "threshold": "BLOCK_NONE"
                }
            ],
            "generationConfig": {
                "responseMimeType": "application/json"
            }
        });

        const candidate = result.data.candidates?.[0];
        if (!candidate) {
            return JSON.stringify({
                type: "general",
                userInput: prompt,
                response: "I didn't receive a response from the assistant."
            });
        }

        if (candidate.finishReason === "SAFETY") {
            return JSON.stringify({
                type: "general",
                userInput: prompt,
                response: "I cannot answer that because it was blocked by safety settings."
            });
        }

        const text = candidate.content?.parts?.[0]?.text;
        if (!text) {
            return JSON.stringify({
                type: "general",
                userInput: prompt,
                response: "I received an empty response from the assistant."
            });
        }

        return text;
    } catch (error) {
        console.error("Gemini API Error:", error.response?.data || error.message);
        throw new Error(error.response?.data?.error?.message || error.message);
    }
}

export default GemniResponse;