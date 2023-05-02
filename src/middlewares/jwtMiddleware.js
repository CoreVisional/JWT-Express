const { expressjwt: expressJwt } = require("express-jwt");
const { secret } = require('../config/jwt');

const getTokenFromHeader = (req) => {

    const authHeader = req.headers.authorization;

      if (authHeader && authHeader.split(" ")[0] === "Bearer") {
          return authHeader.split(" ")[1];
      }

      return null;
};

module.exports = {
    required: expressJwt({
        secret: secret,
        userProperty: "user",
        algorithms: ["HS256"],
        getToken: getTokenFromHeader,
    }),
};
