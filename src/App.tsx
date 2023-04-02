import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import Layout from "./layout/Layout";

const App = () => {
  return (
    <div className="w-full min-h-screen overflow-hidden bg-background/90 text-dark">
      <Layout>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route index element={<Dashboard />} />
        </Routes>
      </Layout>
    </div>
  );
};

export default App;
