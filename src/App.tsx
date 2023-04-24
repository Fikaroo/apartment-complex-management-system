import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import Layout from "./layout/Layout";
import Sos from "./pages/Sos/Sos";
import Customers from "./pages/Customers/Customers";
import CustomerDetail from "./pages/CustomerDetail/CustomerDetail";
import Deals from "./pages/Deals/Deals";
import Blog from "./pages/Blog/Blog";
import Notification from "./pages/Notifications/Notifications";

const App = () => {
  return (
    <div className="w-full min-h-screen overflow-hidden bg-background/90 text-dark">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          index
          element={
            <Layout>
              <Dashboard />
            </Layout>
          }
        />
        <Route
          path="/sos"
          element={
            <Layout>
              <Sos />
            </Layout>
          }
        />
        <Route
          path="/customers"
          element={
            <Layout>
              <Customers />
            </Layout>
          }
        />

        <Route
          path="/customers/:customerId"
          element={
            <Layout>
              <CustomerDetail />
            </Layout>
          }
        />
        <Route
          path="/deals"
          element={
            <Layout>
              <Deals />
            </Layout>
          }
        />
        <Route
          path="/customers/detail/:customerId"
          element={
            <Layout>
              <CustomerDetail />
            </Layout>
          }
        />
        <Route
          path="/blog"
          element={
            <Layout>
              <Blog />
            </Layout>
          }
        />
        <Route
          path="/notification"
          element={
            <Layout>
              <Notification />
            </Layout>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
