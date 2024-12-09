// App.tsx
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Recommendations from "./assets/Components/Reccomendations";
import SignUp from "./assets/Components/SignUp/SignUp";
import Login from "./assets/Components/Login/Login";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/recommendations" element={<Recommendations />} />
        {/* You can add a default route as well */}
        <Route path="/" element={<SignUp />} />
      </Routes>
    </Router>
  );
};

export default App;
