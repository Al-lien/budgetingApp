/* eslint-disable react/prop-types */
// react-router-dom imports
import { Link, useFetcher } from "react-router-dom";

// helper
import {
  formatCurrency,
  formatDateToLocaleString,
  getAllMatchingitems,
} from "../helpers";

// library
import { TrashIcon } from "@heroicons/react/24/solid";

export default function ExpenseItem({ expense, showBudget }) {
  const budget = getAllMatchingitems({
    category: "budgets",
    key: "id",
    value: expense.budgetId,
  })[0];

  const fetcher = useFetcher();
  return (
    <>
      <td>{expense.name}</td>
      <td>{formatCurrency(expense.amount)}</td>
      <td>{formatDateToLocaleString(expense.createdAt)}</td>
      {showBudget && (
        <td>
          <Link
            to={`/budget/${budget.id}`}
            style={{ "--accent": budget.color }}
          >
            {budget.name}
          </Link>
        </td>
      )}
      <td>
        <fetcher.Form method="post">
          <input type="hidden" name="_action" value="deleteExpense" />
          <input type="hidden" name="expenseId" value={expense.id} />
          <button
            type="submit"
            className="btn btn--warning"
            aria-label={`Delete ${expense.name}`}
          >
            <TrashIcon width={20} />
          </button>
        </fetcher.Form>
      </td>
    </>
  );
}
