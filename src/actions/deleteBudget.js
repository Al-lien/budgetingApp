// react-router-dom import
import { redirect } from "react-router-dom";

// helper
import { deleteItem, getAllMatchingitems } from "../helpers";

// library
import { toast } from "react-toastify";

export function deleteBudget({ params }) {
  try {
    deleteItem({
      key: "budgets",
      id: params.id,
    });

    const associatedExpenses = getAllMatchingitems({
      category: "expenses",
      key: "budgetId",
      value: params.id,
    });

    associatedExpenses.forEach((expense) => {
      deleteItem({
        key: "expenses",
        id: expense.id,
      });
    });

    toast.error("Budget deleted!");
  } catch (error) {
    throw new Error("There was a problem deleting your budget.");
  }
  return redirect("/");
}
