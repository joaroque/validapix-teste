import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { getClientByCpf } from "./client.service.js";

const JWT_SECRET = process.env.JWT_SECRET;

export const login = async (cpf, password) => {
  const client = await getClientByCpf(cpf);

  const isPasswordValid = await bcrypt.compare(password, client.user.password);

  if (!isPasswordValid) {
    return false;
  }

  const payload = {
    clientId: client.id,
    fullName: client.user.fullname,
  };

  const token = jwt.sign(payload, JWT_SECRET, {
    expiresIn: "1h",
  });

  return token;
};
