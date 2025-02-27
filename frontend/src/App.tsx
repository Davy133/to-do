import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import { Login, SignUp, Home } from "./pages";
import { AuthProvider } from "./hooks/useAuth";
import { ProtectedRoute } from "./components";

import "./App.css";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<ProtectedRoute />}>
            <Route index element={<Home />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
