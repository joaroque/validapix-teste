import {
  addPix,
  createClient,
  listTransactions,
} from "../services/client.service.js";

export const createClientController = async (req, res) => {
  const { fullname, password, cpf, balance } = req.body;

  if (!fullname || !password || !cpf) {
    return res.status(401).json({ error: "Dados insuficientes." });
  }

  try {
    const client = await createClient(fullname, password, cpf, balance);

    return res
      .status(201)
      .json({ msg: "Operação realizada com sucesso!", data: client });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const listTransactionsController = async (req, res) => {
  const clientId = req.clientId;

  const list = await listTransactions(clientId);
  return res
    .status(200)
    .json({ msg: "Operação realizada com sucesso!", data: list });
};

export const addPixController = async (req, res) => {
  const { amount, payeeCPF } = req.body;

  if (!amount || !amount) {
    return res.status(401).json({ error: "Dados insuficientes." });
  }

  const payerId = req.clientId;

  try {
    const pix = await addPix(payerId, payeeCPF, parseFloat(amount));
    return res
      .status(200)
      .json({ msg: "Operação realizada com sucesso!", data: pix });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
