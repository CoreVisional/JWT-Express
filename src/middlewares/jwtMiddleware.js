const { expressjwt: expressJwt } = require("express-jwt");
const { secret } = require('../config/jwt');

// Get the token from the authorization header
// const getTokenFromHeader = (req) => {

//     const authHeader = req.headers.authorization;

//     if (authHeader && authHeader.split(" ")[0] === "Bearer") {
//         return authHeader.split(" ")[1];
//     }

//     return null;
// };

// Get token from cookies
const getTokenFromCookie = (req) => {
    // Check if the jwt cookie is present in the request
    if (req.cookies && req.cookies.jwt) {
        return req.cookies.jwt;
    }
    return null;
};

module.exports = {
    required: expressJwt({
        secret: secret,
        userProperty: "user",
        algorithms: ["HS256"],
        getToken: getTokenFromCookie,
    }),
};
