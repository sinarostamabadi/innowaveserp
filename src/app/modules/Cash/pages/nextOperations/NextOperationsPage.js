import React from "react";
import { Route } from "react-router-dom";
import { NextOperationsLoadingDialog } from "./nextOperations-loading-dialog/NextOperationsLoadingDialog";
import { NextOperationDeleteDialog } from "./nextOperation-delete-dialog/NextOperationDeleteDialog";
import { NextOperationsCard } from "./NextOperationsCard";
import { NextOperationsUIProvider } from "./NextOperationsUIContext";

export function NextOperationsPage({ history }) {
  const nextOperationsUIEvents = {
    newNextOperationButtonClick: () => {
      history.push("/cash/nextOperations/new");
    },
    openEditNextOperationPage: (id) => {
      history.push(`/cash/nextOperations/${id}/edit`);
    },
    openDeleteNextOperationDialog: (id) => {
      history.push(`/cash/nextOperations/${id}/delete`);
    },
    openDeleteNextOperationsDialog: () => {
      history.push(`/cash/nextOperations/deleteNextOperations`);
    },
    openFetchNextOperationsDialog: () => {
      history.push(`/cash/nextOperations/fetch`);
    },
    openUpdateNextOperationsStatusDialog: () => {
      history.push("/cash/nextOperations/updateStatus");
    },
  };

  return (
    <NextOperationsUIProvider nextOperationsUIEvents={nextOperationsUIEvents}>
      <NextOperationsLoadingDialog />
      <Route path="/cash/nextOperations/:id/delete">
        {({ history, match }) => (
          <NextOperationDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/cash/nextOperations");
            }}
          />
        )}
      </Route>
      <NextOperationsCard />
    </NextOperationsUIProvider>
  );
}
