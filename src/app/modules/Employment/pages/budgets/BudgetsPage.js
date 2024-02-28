import React from "react";
import { Route } from "react-router-dom";
import { BudgetsLoadingDialog } from "./budgets-loading-dialog/BudgetsLoadingDialog";
import { BudgetDeleteDialog } from "./budget-delete-dialog/BudgetDeleteDialog";
import { BudgetsCard } from "./BudgetsCard";
import { BudgetsUIProvider } from "./BudgetsUIContext";

export function BudgetsPage({ history }) {
  const budgetsUIEvents = {
    newBudgetButtonClick: () => {
      history.push("/employment/budgets/new");
    },
    openEditBudgetPage: (id) => {
      history.push(`/employment/budgets/${id}/edit`);
    },
    openDeleteBudgetDialog: (id) => {
      history.push(`/employment/budgets/${id}/delete`);
    },
    openDeleteBudgetsDialog: () => {
      history.push(`/employment/budgets/deleteBudgets`);
    },
    openFetchBudgetsDialog: () => {
      history.push(`/employment/budgets/fetch`);
    },
    openUpdateBudgetsStatusDialog: () => {
      history.push("/employment/budgets/updateStatus");
    },
  };

  return (
    <BudgetsUIProvider budgetsUIEvents={budgetsUIEvents}>
      <BudgetsLoadingDialog />
      <Route path="/employment/budgets/:id/delete">
        {({ history, match }) => (
          <BudgetDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/employment/budgets");
            }}
          />
        )}
      </Route>
      <BudgetsCard />
    </BudgetsUIProvider>
  );
}
