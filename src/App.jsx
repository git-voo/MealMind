import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import ShelfPage from "./pages/ShelfPage";
import PlanPage from "./pages/PlanPage";
import { ToastProvider } from "./context/ToastContext";

function App() {
  return (
    <ToastProvider>
      <Router>
        <div className="min-h-screen bg-[#FAFAFA] p-4 flex flex-col gap-4">
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/shelf" element={<ShelfPage />} />
            <Route path="/plan" element={<PlanPage />} />
            <Route path="*" element={<HomePage />} />
          </Routes>
        </div>
      </Router>
    </ToastProvider>
  );
}

export default App;
