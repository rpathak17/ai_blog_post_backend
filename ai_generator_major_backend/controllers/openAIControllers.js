const asyncHandler = require("express-async-handler");
const axios = require("axios");
//---open ai controller
const openAIControllers = asyncHandler(async (req, res) => {
  const { prompt } = req.body;
  try {
    const response = await axios.post(
      "https://api.openai.com/v1/completions",
      {
        model: 'gpt-3.5-turbo-instruct',
        prompt,
        max_tokens: 500,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json"
        },
      }
    );
    //send the response
    console.log(response.data);
    
  } catch (error) {
    console.log(error);
  }
});


module.exports = {
  openAIControllers,
};
