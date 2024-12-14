import { login } from "../services/auth.service.js";

export const loginController = async (req, res) => {
  const { cpf, password } = req.body;

  if (!cpf || !password) {
    return res.status(401).json({ error: "CPF ou senha errado." });
  }

  try {
    const token = await login(cpf, password);

    return res.status(200).json({ msg: "Logged successfuly", token });
  } catch (error) {
    return res.status(401).json({ error: "CPF ou senha errado." });
  }
};
