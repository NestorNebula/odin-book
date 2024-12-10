const logOut = (req, res) => {
  req.session = null;
  res.json({ success: true });
};

module.exports = logOut;
