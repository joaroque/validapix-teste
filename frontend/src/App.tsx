import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";

import { useAuth } from "./hooks/useAuth";

import Header from "./components/Header";
import AddPix from "./pages/AddPix";
import Login from "./pages/Login";
import ClientSignup from "./pages/Signup";
import TransactionList from "./pages/Transactions";
function App() {
  const { token } = useAuth();

  return (
    <>
      <div className="flex flex-col h-screen">
        <Router>
          <Header
            title="ValidaPix - App"
            links={[
              { path: "/login", label: "Login" },
              { path: "/register", label: "Cadastrar" },
              { path: "/add-pix", label: "Enviar PIX" },
              { path: "/list-pix", label: "Listar PIX" },
            ]}
          />

          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<ClientSignup />} />

            {token && (
              <>
                <Route path="/add-pix" element={<AddPix />} />
                <Route path="/list-pix" element={<TransactionList />} />
              </>
            )}

            <Route
              path="*"
              element={
                token ? <Navigate to="/list-pix" /> : <Navigate to="/login" />
              }
            />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
