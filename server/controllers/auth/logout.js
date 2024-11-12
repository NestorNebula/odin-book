const logOut = (req, res) => {
  res.clearCookie('session').json({ success: true });
};

module.exports = logOut;
