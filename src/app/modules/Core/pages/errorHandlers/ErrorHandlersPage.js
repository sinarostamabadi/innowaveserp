import React from "react";
import { Route } from "react-router-dom";
import { ErrorHandlersLoadingDialog } from "./errorHandlers-loading-dialog/ErrorHandlersLoadingDialog";
import { ErrorHandlerDeleteDialog } from "./errorHandler-delete-dialog/ErrorHandlerDeleteDialog";
import { ErrorHandlersCard } from "./ErrorHandlersCard";
import { ErrorHandlersUIProvider } from "./ErrorHandlersUIContext";
export function ErrorHandlersPage({ history }) {
  const errorHandlersUIEvents = {
    newErrorHandlerButtonClick: () => {
      history.push("/Core/errorHandlers/new");
    },
    openEditErrorHandlerPage: (id) => {
      history.push(`/Core/errorHandlers/${id}/edit`);
    },
    openDeleteErrorHandlerDialog: (id) => {
      history.push(`/Core/errorHandlers/${id}/delete`);
    },
    openDeleteErrorHandlersDialog: () => {
      history.push(`/Core/errorHandlers/deleteErrorHandlers`);
    },
    openFetchErrorHandlersDialog: () => {
      history.push(`/Core/errorHandlers/fetch`);
    },
    openUpdateErrorHandlersStatusDialog: () => {
      history.push("/Core/errorHandlers/updateStatus");
    },
  };
  return (
    <ErrorHandlersUIProvider errorHandlersUIEvents={errorHandlersUIEvents}>
      <ErrorHandlersLoadingDialog />
      <Route path="/Core/errorHandlers/:id/delete">
        {({ history, match }) => (
          <ErrorHandlerDeleteDialog  
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/Core/errorHandlers");
            }}
          />
        )}
      </Route>
      <ErrorHandlersCard />
    </ErrorHandlersUIProvider>
  );
}
