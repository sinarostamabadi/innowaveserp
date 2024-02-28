import React from "react";
import { Route } from "react-router-dom";
import { ImportXMLSettingLoadingDialog } from "./importXMLSetting-loading-dialog/ImportXMLSettingLoadingDialog";
import { ImportXMLSettingDeleteDialog } from "./importXMLSetting-delete-dialog/ImportXMLSettingDeleteDialog";
import { ImportXMLSettingCard } from "./ImportXMLSettingCard";
import { ImportXMLSettingUIProvider } from "./ImportXMLSettingUIContext";

export function ImportXMLSettingPage({ history }) {
  const importXMLSettingUIEvents = {
    newImportXMLSettingButtonClick: () => {
      history.push("/accounting/importXMLSetting/new");
    },
    openEditImportXMLSettingPage: (id) => {
      history.push(`/accounting/importXMLSetting/${id}/edit`);
    },
    openDeleteImportXMLSettingDialog: (id) => {
      history.push(`/accounting/importXMLSetting/${id}/delete`);
    },
    openDeleteImportXMLSettingDialog: () => {
      history.push(`/accounting/importXMLSetting/deleteImportXMLSetting`);
    },
    openFetchImportXMLSettingDialog: () => {
      history.push(`/accounting/importXMLSetting/fetch`);
    },
    openUpdateImportXMLSettingStatusDialog: () => {
      history.push("/accounting/importXMLSetting/updateStatus");
    },
  };

  return (
    <ImportXMLSettingUIProvider
      importXMLSettingUIEvents={importXMLSettingUIEvents}
    >
      <ImportXMLSettingLoadingDialog />
      <Route path="/accounting/importXMLSetting/:id/delete">
        {({ history, match }) => (
          <ImportXMLSettingDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/accounting/importXMLSetting");
            }}
          />
        )}
      </Route>
      <ImportXMLSettingCard />
    </ImportXMLSettingUIProvider>
  );
}
