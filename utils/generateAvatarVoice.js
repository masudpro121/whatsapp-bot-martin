require("dotenv").config();
const axios = require("axios");
const EXH_KEY = process.env.EXH_KEY;
const fs = require("fs");
module.exports = (prompt) => {
  const idle_urls = [
    "https://ugc-idle.s3-us-west-2.amazonaws.com/est_19ee83689e5fd2518ae1011d13824846.mp4",
    "https://ugc-idle.s3-us-west-2.amazonaws.com/est_0ad0762b1035377fb2f5b10a431eded7.mp4",
    "https://ugc-idle.s3-us-west-2.amazonaws.com/est_365c9c88ef3b265ed11209dfc128bd41.mp4",
    "https://ugc-idle.s3-us-west-2.amazonaws.com/est_69007b2ed3a00b42d2b60528158e0e45.mp4",
    "https://ugc-idle.s3-us-west-2.amazonaws.com/est_418a1bf303fef439a995a0f60136fea9.mp4",
    "https://ugc-idle.s3-us-west-2.amazonaws.com/est_9b4f72bc20436e83b7c59f70e0ce04e0.mp4",
    "https://ugc-idle.s3-us-west-2.amazonaws.com/est_e880b0c5a601e813f9e6b19d10b98578.mp4",
    "https://ugc-idle.s3-us-west-2.amazonaws.com/est_738c4820cc30eb43b3889cec38de9369.mp4",
    "https://ugc-idle.s3-us-west-2.amazonaws.com/est_c243d0783c1b5ca793b538d56e1ea167.mp4",
  ]
  return new Promise(async (resolve, reject) => {
    try {
      axios
        .post(
          "https://api.exh.ai/animations/v3/generate_lipsync",
          {
            text: prompt.slice(0,199),
            idle_url: idle_urls[Math.floor(Math.random()*idle_urls.length)],
            voice_name: 'Fiona',
            animation_pipeline: 'high_quality'
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: EXH_KEY,
            },
            responseType: 'arraybuffer'
          }
        )
        .then((response) => {
          
          resolve(response.data)
        })
        .catch((err) => {
          console.log("video generate problem");
          console.log(err.message);
        });
    } catch (err) {
      console.log(err);
    }
  });
};
