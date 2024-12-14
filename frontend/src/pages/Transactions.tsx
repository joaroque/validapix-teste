import { useEffect, useState } from "react";
import { listTransactions } from "../api/client";
import { useAuth } from "../hooks/useAuth";

interface PixTransaction {
  id: string;
  payerId: string;
  payeeId: string;
  amount: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  payee: {
    cpf: string;
    user: {
      fullname: string;
    };
  };
  payer: {
    cpf: string;
    user: {
      fullname: string;
    };
  };
}

export default function TransactionList() {
  const { token } = useAuth();
  const [pixList, setPixList] = useState<PixTransaction[]>([]);

  useEffect(() => {
    if (token) {
      (async () => {
        try {
          const data = await listTransactions(token);
          setPixList(data);
        } catch (error: any) {
          alert(error.message);
        }
      })();
    }
  }, [token]);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "text-green-600";
      case "pending":
        return "text-yellow-600";
      case "failed":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <div className="flex flex-col bg-gradient-to-br from-gray-100 to-gray-200 px-4 py-6">
      <div className="bg-white shadow-md rounded-xl overflow-hidden">
        <div className="bg-gray-100 p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800 tracking-tight">
            Lista de Transações PIX
          </h2>
        </div>
        {pixList.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            Nenhuma transação encontrada
          </div>
        ) : (
          <ul className="divide-y divide-gray-200">
            {pixList.map((pix: PixTransaction) => (
              <li
                key={pix.id}
                className="p-6 hover:bg-gray-50 transition-colors duration-300"
              >
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">ID da Transação</p>
                    <p className="font-medium text-gray-800">{pix.id}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Valor</p>
                    <p className="font-semibold text-blue-600">
                      R${" "}
                      {parseFloat(pix.amount).toLocaleString("pt-BR", {
                        minimumFractionDigits: 2,
                      })}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Status</p>
                    <p className={`font-medium ${getStatusColor(pix.status)}`}>
                      {pix.status}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Data</p>
                    <p className="text-gray-700">
                      {new Date(pix.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Pagador</p>
                    <p className="text-gray-800">{pix.payer.user.fullname}</p>
                    <p className="text-sm text-gray-600">{pix.payer.cpf}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Destinatário</p>
                    <p className="text-gray-800">{pix.payee.user.fullname}</p>
                    <p className="text-sm text-gray-600">{pix.payee.cpf}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
