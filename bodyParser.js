const bodyParser = () => {
  return (req, _res, next) => {

    let data = "";

    req.on("data", (reqData) => {
      data = data + reqData;
    });

    req.on("end", () => {
      try {
        req.body = JSON.parse(data);
      } catch (e) {
        console.log("Error in parsing data");
        req.body = {};
      }

      next();
    });
  };
};

module.exports = bodyParser;
