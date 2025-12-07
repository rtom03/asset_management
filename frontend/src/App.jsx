import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Header from "./components/Header";
import Purchase from "./components/Purchase";
import Inventory from "./components/Inventory";
import Rfq from "./components/Rfq";
import TopBar from "./components/TopBar";

const ProtectedRoute = ({ user, children }) => {
  if (!user.user) return <Navigate to="/login" replace />;
  return children;
};

function App() {
  const user = useSelector((state) => state.user);
  console.log("User in App:", user);

  return (
    <div className="h-screen bg-white text-black dark:bg-gray-900 dark:text-white ml-12 ">
      {/* <TopBar /> */}
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute user={user}>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/purchase" element={<Purchase />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/purchase" element={<Rfq />} />
      </Routes>
    </div>
  );
}

export default App;
