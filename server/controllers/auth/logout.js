const logOut = (req, res) => {
  res.clearCookie('session').clearCookie('session.sig').json({ success: true });
};

module.exports = logOut;
