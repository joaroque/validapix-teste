import { validateAmount } from "../utils/validate-amount.js";

export default function validateData(req, res, next) {
  const { amount } = req.body;

  if (!amount) {
    return res
      .status(400)
      .json({ error: "O montantge precisa ser informado." });
  }

  if (!validateAmount(amount)) {
    return res
      .status(400)
      .json({ error: "O saldo precisa ser um número intgiro positivo." });
  }

  next();
}
