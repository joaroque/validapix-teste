const API_BASE_URL = "http://localhost:3000";

export async function createClient(
  fullname: string,
  password: string,
  cpf: string,
  balance: number
) {
  const res = await fetch(`${API_BASE_URL}/clients`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ fullname, password, cpf, balance }),
  });
  if (!res.ok) throw new Error("Erro ao criar cliente");
  return res.json();
}

export async function login(cpf: string, password: string) {
  const res = await fetch(`${API_BASE_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ cpf, password }),
  });
  if (!res.ok) throw new Error("Falha no login");
  return res.json();
}

export async function addPix(amount: number, payeeCpf: string, token: string) {
  const res = await fetch(`${API_BASE_URL}/clients/pix`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ amount, payeeCPF: payeeCpf }),
  });
  if (!res.ok) throw new Error("Erro ao fazer PIX");
  return res.json();
}

export async function listTransactions(token: string) {
  const res = await fetch(`${API_BASE_URL}/clients/pix/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error("Erro ao listar PIX");
  const json = await res.json();
  return json.data;
}
