
// function to send user data in the response
exports.sendUserData = (req, res, next) => {
  console.log('sendUserData');
  // Check if req.user exists (result from the protect function)
  if (req.user) {
    // Retrieve the user from the request
    const user = req.user;

    // Send a response with the user details
    return res.status(200).json({
      status: 'success',
      user: user
    });
  }
};
