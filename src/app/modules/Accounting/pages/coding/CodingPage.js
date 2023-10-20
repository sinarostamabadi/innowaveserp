import React from "react";
import { Route } from "react-router-dom";
import { CodingLoadingDialog } from "./coding-loading-dialog/CodingLoadingDialog";
import { CodingDeleteDialog } from "./coding-delete-dialog/CodingDeleteDialog";
import { CodingCard } from "./CodingCard";
import { CodingUIProvider } from "./CodingUIContext";

export function CodingPage({ history }) {
  const codingUIEvents = {
    newCodingButtonClick: () => {
      history.push("/accounting/coding/new");
    },
    openEditCodingPage: (id) => {
      history.push(`/accounting/coding/${id}/edit`);
    },
    openDeleteCodingDialog: (id) => {
      history.push(`/accounting/coding/${id}/delete`);
    },
    openDeleteCodingDialog: () => {
      history.push(`/accounting/coding/deleteCoding`);
    },
    openFetchCodingDialog: () => {
      history.push(`/accounting/coding/fetch`);
    },
    openUpdateCodingStatusDialog: () => {
      history.push("/accounting/coding/updateStatus");
    },
  };
  
  return (
    <CodingUIProvider codingUIEvents={codingUIEvents}>
      <CodingLoadingDialog />
      <Route path="/accounting/coding/:id/delete">
        {({ history, match }) => (
          <CodingDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/accounting/coding");
            }}
          />
        )}
      </Route>
      <CodingCard />
    </CodingUIProvider>
  );
}