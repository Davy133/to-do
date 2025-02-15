import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import { Login, SignUp } from "./pages";

import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Router>
  );
}

export default App;
