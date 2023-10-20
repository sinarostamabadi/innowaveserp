import React from "react";
import { Route } from "react-router-dom";
import { MonthlyEmployeeIOsLoadingDialog } from "./monthlyEmployeeIOs-loading-dialog/MonthlyEmployeeIOsLoadingDialog";
import { MonthlyEmployeeIODeleteDialog } from "./monthlyEmployeeIO-delete-dialog/MonthlyEmployeeIODeleteDialog";
import { MonthlyEmployeeIOsCard } from "./MonthlyEmployeeIOsCard";
import { MonthlyEmployeeIOsUIProvider } from "./MonthlyEmployeeIOsUIContext";

export function MonthlyEmployeeIOsPage({ history }) {
  const monthlyEmployeeIOsUIEvents = {
    newMonthlyEmployeeIOButtonClick: () => {
      history.push("/employment/monthlyEmployeeIOs/new");
    },
    openEditMonthlyEmployeeIOPage: (id) => {
      history.push(`/employment/monthlyEmployeeIOs/${id}/edit`);
    },
    openDeleteMonthlyEmployeeIODialog: (id) => {
      history.push(`/employment/monthlyEmployeeIOs/${id}/delete`);
    },
    openDeleteMonthlyEmployeeIOsDialog: () => {
      history.push(`/employment/monthlyEmployeeIOs/deleteMonthlyEmployeeIOs`);
    },
    openFetchMonthlyEmployeeIOsDialog: () => {
      history.push(`/employment/monthlyEmployeeIOs/fetch`);
    },
    openUpdateMonthlyEmployeeIOsStatusDialog: () => {
      history.push("/employment/monthlyEmployeeIOs/updateStatus");
    },
  };
  
  return (
    <MonthlyEmployeeIOsUIProvider monthlyEmployeeIOsUIEvents={monthlyEmployeeIOsUIEvents}>
      <MonthlyEmployeeIOsLoadingDialog />
      <Route path="/employment/monthlyEmployeeIOs/:id/delete">
        {({ history, match }) => (
          <MonthlyEmployeeIODeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/employment/monthlyEmployeeIOs");
            }}
          />
        )}
      </Route>
      <MonthlyEmployeeIOsCard />
    </MonthlyEmployeeIOsUIProvider>
  );
}