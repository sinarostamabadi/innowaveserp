import React from "react";
import { Route } from "react-router-dom";
import { IODeviceTypesLoadingDialog } from "./iODeviceTypes-loading-dialog/IODeviceTypesLoadingDialog";
import { IODeviceTypeDeleteDialog } from "./iODeviceType-delete-dialog/IODeviceTypeDeleteDialog";
import { IODeviceTypesCard } from "./IODeviceTypesCard";
import { IODeviceTypesUIProvider } from "./IODeviceTypesUIContext";

export function IODeviceTypesPage({ history }) {
  const iODeviceTypesUIEvents = {
    newIODeviceTypeButtonClick: () => {
      history.push("/employment/iODeviceTypes/new");
    },
    openEditIODeviceTypePage: (id) => {
      history.push(`/employment/iODeviceTypes/${id}/edit`);
    },
    openDeleteIODeviceTypeDialog: (id) => {
      history.push(`/employment/iODeviceTypes/${id}/delete`);
    },
    openDeleteIODeviceTypesDialog: () => {
      history.push(`/employment/iODeviceTypes/deleteIODeviceTypes`);
    },
    openFetchIODeviceTypesDialog: () => {
      history.push(`/employment/iODeviceTypes/fetch`);
    },
    openUpdateIODeviceTypesStatusDialog: () => {
      history.push("/employment/iODeviceTypes/updateStatus");
    },
  };

  return (
    <IODeviceTypesUIProvider iODeviceTypesUIEvents={iODeviceTypesUIEvents}>
      <IODeviceTypesLoadingDialog />
      <Route path="/employment/iODeviceTypes/:id/delete">
        {({ history, match }) => (
          <IODeviceTypeDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/employment/iODeviceTypes");
            }}
          />
        )}
      </Route>
      <IODeviceTypesCard />
    </IODeviceTypesUIProvider>
  );
}
