import Navbar from "./components/Navbar";
import GroceryUpload from "./components/GroceryUpload";
import WeeklyMealPlan from "./components/WeeklyMealPlan";
import ToastNotification from "./components/ToastNotification";
import { useState } from "react";

function App() {
  const [showToast, setShowToast] = useState(false);

  return (
    <div className="min-h-screen bg-[#FAFAFA] p-4 flex flex-col gap-4">
      <Navbar />
      <GroceryUpload />
      <WeeklyMealPlan />
      {showToast && (
        <ToastNotification message="We noticed you prefer vegetarian meals. Future plans will reflect this." />
      )}
    </div>
  );
}

export default App;
