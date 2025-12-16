import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ user, children }) => {
  // if (!user.user) return <Navigate to="/login" replace />;
  return children;
};

function App() {
  const user = useSelector((state) => state.user);
  console.log("User in App:", user);

  return (
    <div className="h-screen bg-white text-black dark:bg-gray-900 dark:text-white ml-12 ">
      <Routes>
        <Route
          path="/feed"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
