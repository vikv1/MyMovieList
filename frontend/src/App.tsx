// App.tsx
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Recommendations from "./assets/Components/Reccomendations";
import Signup from "./assets/Components/Signup";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/recommendations" element={<Recommendations />} />
        {/* You can add a default route as well */}
        <Route path="/" element={<Signup />} />
      </Routes>
    </Router>
  );
};

export default App;
