const axios = require("axios");

const sentMessage = function (dataMessage) {
  // sentMessage
  const headers = {
    apikey: "28a4d40c72494913718fe7ec94c66796861ab925",
  };
  const promise = new Promise((resolve, reject) => {
    axios
      .post(`https://starsender.online/api/sendText`, dataMessage, {
        headers: headers,
      })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });

  return promise;
};

module.exports = {
  sentMessage,
};
