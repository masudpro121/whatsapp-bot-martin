const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config();
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
module.exports = (prompt) => {
  return new Promise((resolve, reject) => {
    const openai = new OpenAIApi(configuration);
    openai.createCompletion({
        model: "text-davinci-003",
        prompt: prompt,
        max_tokens: 100,
        temperature: 0,
      })
      .then((res) => {
        resolve(res.data.choices[0]?.text);
      })
      .catch((err) => {
        console.log(err);
      });
  });
};
