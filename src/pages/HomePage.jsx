import GroceryUpload from "../components/GroceryUpload";
import WeeklyMealPlan from "../components/WeeklyMealPlan";

export default function HomePage() {
  return (
    <div className="flex flex-col gap-4">
      <GroceryUpload />
      <WeeklyMealPlan />
    </div>
  );
}
