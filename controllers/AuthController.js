exports.logout = (req, res) => {
  res.clearCookie('jwt');
  req.session.destroy((err) => {
    if (err) {
      console.error("Error al destruir la sesión:", err);
      return res.status(500).send("Error al cerrar sesión");
    }
    res.redirect('/login');
  });
};
