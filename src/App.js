import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Account from "./pages/Account";
import ProtectedRoute from "./components/ProtectedRoute";
import Search from "./pages/Search";

function App() {
  return (
    <>
      <AuthContextProvider>
        <Navbar />
        <Routes>
          <Route path='/kndlix' element={<Home />} />
          <Route path='/kndlix/login' element={<Login />} />
          <Route path='/kndlix/signup' element={<Signup />} />
          <Route path='/kndlix/account' element={<ProtectedRoute><Account /></ProtectedRoute>} />
          <Route path='/kndlix/search' element={<Search />} />
        </Routes>
      </AuthContextProvider>
    </>
  );
}

export default App;
