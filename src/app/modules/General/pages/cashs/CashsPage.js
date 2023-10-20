import React from "react";
import { Route } from "react-router-dom";
import { CashsLoadingDialog } from "./cashs-loading-dialog/CashsLoadingDialog";
import { CashDeleteDialog } from "./cash-delete-dialog/CashDeleteDialog";
import { CashsCard } from "./CashsCard";
import { CashsUIProvider } from "./CashsUIContext";

export function CashsPage({ history }) {
  const cashsUIEvents = {
    newCashButtonClick: () => {
      history.push("/general/cashs/new");
    },
    openEditCashPage: (id) => {
      history.push(`/general/cashs/${id}/edit`);
    },
    openDeleteCashDialog: (id) => {
      history.push(`/general/cashs/${id}/delete`);
    },
    openDeleteCashsDialog: () => {
      history.push(`/general/cashs/deleteCashs`);
    },
    openFetchCashsDialog: () => {
      history.push(`/general/cashs/fetch`);
    },
    openUpdateCashsStatusDialog: () => {
      history.push("/general/cashs/updateStatus");
    },
  };
  
  return (
    <CashsUIProvider cashsUIEvents={cashsUIEvents}>
      <CashsLoadingDialog />
      <Route path="/general/cashs/:id/delete">
        {({ history, match }) => (
          <CashDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/general/cashs");
            }}
          />
        )}
      </Route>
      <CashsCard />
    </CashsUIProvider>
  );
}
