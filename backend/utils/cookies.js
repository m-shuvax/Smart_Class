const jwt = require('jsonwebtoken');
require('dotenv').config();


exports.cookieSettings = {
    expires: new Date(
      Date.now() + Number(process.env.JWT_COOKIE_EXPIRES_IN) * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production' // Use secure cookies in production
  };


exports.signToken = id => {
    return jwt.sign({ id, iat: Date.now() }, process.env.JWT_SECRET);
  };