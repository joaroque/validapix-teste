async function verifyUser(req, res, next) {
  const { clientId } = req.params;

  if (clientId != req.clientId) {
    return res
      .status(403)
      .json({ error: "Sem permissão para acessar esse recurso." });
  }

  next();
}

export default verifyUser;
