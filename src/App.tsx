import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import Layout from "./layout/Layout";
import Sos from "./pages/Sos/Sos";

const App = () => {
  return (
    <div className="w-full min-h-screen overflow-hidden bg-background/90 text-dark">
      <Layout>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route index element={<Dashboard />} />
          <Route path="/sos" index element={<Sos />} />
        </Routes>
      </Layout>
    </div>
  );
};

export default App;
