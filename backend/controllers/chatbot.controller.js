import Groq from "groq-sdk";

const client = new Groq({ apiKey: process.env.GROQ_API_KEY });

const askChatBot = async (req, res) => {
  try {
    const { messages } = req.body;
    // messages = [{ role: "user", content: "..." }, { role: "assistant", content: "..." }]
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "Messages required" });
    }

    const response = await client.chat.completions.create({
      model: "llama-3.1-8b-instant",
      max_tokens: 1024,
      messages: [
        {
          role: "system",
          content: `You are a DSA (Data Structures and Algorithms) assistant 
embedded in a coding practice platform similar to LeetCode.

Your ONLY purpose is to help users with:
- Understanding DSA concepts (arrays, trees, graphs, DP, etc.)
- Guiding users on how to APPROACH a problem — never give full solutions
- Explaining time and space complexity
- Suggesting which data structure or algorithm pattern fits a problem
- Competitive programming strategies and techniques
- Clarifying constraints and edge cases in problems

You MUST follow these rules strictly:
1. NEVER write complete working solution code for a problem
2. You CAN write small code snippets to explain a concept (max 10-15 lines)
3. If asked for a full solution, guide with hints and approach only
4. If a question is NOT related to DSA, algorithms, data structures, 
   or competitive programming — politely refuse and redirect
5. Keep responses concise and structured
6. Use examples to explain concepts
7. Always encourage the user to think before giving hints`,
        },
        ...messages,
      ],
    });

    const reply =
      response?.choices?.[0]?.message?.content ||
      "Sorry, I could not generate a response.";

    return res.status(200).json({ success: true, reply });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

export default askChatBot;
