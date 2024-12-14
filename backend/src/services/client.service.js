import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { validateCPF } from "../utils/validate-cpf.js";

const prismaClient = new PrismaClient();

export const createClient = async (fullName, password, cpf, balance) => {
  const cpfExists = await getClientByCpf(cpf);

  if (cpfExists) {
    throw new Error("CPF informado já foi cadastrado.");
  }

  const client = await prismaClient.$transaction(async (prisma) => {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        fullname: fullName,
        password: hashedPassword,
      },
    });

    return await prisma.client.create({
      data: {
        userId: user.id,
        cpf,
        balance: balance ? balance : 0,
      },
      include: {
        user: {
          select: {
            fullname: true,
          },
        },
      },
    });
  });
  return client;
};

export const listTransactions = async (clientId) => {
  return prismaClient.transaction.findMany({
    where: {
      OR: [{ payerId: clientId }, { payeeId: clientId }],
    },
    include: {
      payee: {
        select: {
          cpf: true,
          user: {
            select: { fullname: true },
          },
        },
      },
      payer: {
        select: {
          cpf: true,
          user: {
            select: { fullname: true },
          },
        },
      },
    },
  });
};

export const addPix = async (payerId, payeeCPF, amount) => {
  return prismaClient.$transaction(async (prisma) => {
    const payer = await getClientById(payerId);

    const payee = await prismaClient.client.findUnique({
      where: { cpf: payeeCPF },
      include: {
        user: true,
      },
    });

    if (!payee) {
      throw new Error("Destinatário não encontrado.");
    }

    if (!payer) {
      throw new Error("Pagador não encontrado.");
    }

    if (payer.balance < amount) {
      throw new Error("Saldo insuficiente.");
    }

    await prisma.client.update({
      where: { id: payerId },
      data: {
        balance: {
          decrement: amount,
        },
      },
    });

    await prisma.client.update({
      where: { id: payee.id },
      data: {
        balance: {
          increment: amount,
        },
      },
    });

    return await prisma.transaction.create({
      data: {
        payerId,
        payeeId: payee.id,
        amount,
      },
    });
  });
};

export const getClientById = async (clientId) => {
  return prismaClient.client.findUnique({
    where: { id: clientId },
    include: {
      user: true,
    },
  });
};

export const getClientByCpf = async (cpf) => {
  if (!validateCPF(cpf)) {
    throw new Error("CPF informado é inválido");
  }
  return prismaClient.client.findUnique({
    where: { cpf },
    include: {
      user: true,
    },
  });
};

export const getUserById = async (id) => {
  return prismaClient.user.findUnique({
    where: { id },
    include: {
      client: {
        select: {
          id: true,
          balance: true,
          cpf: true,
        },
      },
    },
  });
};
