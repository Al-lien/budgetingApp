// react-router-dom imports
import { useLoaderData } from "react-router-dom";

// helpers
import { createExpense, deleteItem, getAllMatchingitems } from "../helpers";

// components
import BudgetItem from "../components/BudgetItem";
import AddExpenseForm from "../components/AddExpenseForm";
import Table from "../components/Table";

// library
import { toast } from "react-toastify";

// loader
export async function budgetLoader({ params }) {
  const budget = await getAllMatchingitems({
    category: "budgets",
    key: "id",
    value: params.id,
  })[0];

  const expenses = await getAllMatchingitems({
    category: "expenses",
    key: "budgetId",
    value: params.id,
  });

  if (!budget) {
    throw new Error("The budget you're trying to find doesn't exists");
  }

  return { budget, expenses };
}

// action
export async function budgetAction({ request }) {
  const data = await request.formData();
  const { _action, ...values } = Object.fromEntries(data);

  if (_action === "createExpense") {
    try {
      createExpense({
        name: values.newExpense,
        amount: values.newExpenseAmount,
        budgetId: values.newExpenseBudget,
      });
      return toast.success(`Expense ${values.newExpense} created`);
    } catch (error) {
      throw new Error("There was a problem creating your expense.");
    }
  }

  if (_action === "deleteExpense") {
    try {
      deleteItem({
        key: "expenses",
        id: values.expenseId,
      });
      return toast.error("Expense deleted!");
    } catch (error) {
      throw new Error("There was a problem deleting your expense.");
    }
  }
}

export default function BudgetPage() {
  const { budget, expenses } = useLoaderData();
  return (
    <>
      <div className="grid-lg" style={{ "--accent": budget.color }}>
        <h1 className="h2">
          <span className="accent">{budget.name}</span>
        </h1>
        <div className="flex-lg">
          <BudgetItem budget={budget} showDelete={true} />
          <AddExpenseForm budgets={[budget]} />
        </div>
        {expenses && expenses.length > 0 && (
          <div className="grid-md">
            <h2>
              <span className="accent">{budget.name}</span> Expenses
            </h2>
            <Table expenses={expenses} showBudget={false} />
          </div>
        )}
      </div>
    </>
  );
}
