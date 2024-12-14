import { cpf } from "cpf-cnpj-validator";

export function validateCPF(clientCpf) {
  return cpf.isValid(clientCpf);
}
