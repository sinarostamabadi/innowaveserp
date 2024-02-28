import React from "react";
import { Route } from "react-router-dom";
import { TableStatusTypesLoadingDialog } from "./tableStatusTypes-loading-dialog/TableStatusTypesLoadingDialog";
import { TableStatusTypeDeleteDialog } from "./tableStatusType-delete-dialog/TableStatusTypeDeleteDialog";
import { TableStatusTypesCard } from "./TableStatusTypesCard";
import { TableStatusTypesUIProvider } from "./TableStatusTypesUIContext";

export function TableStatusTypesPage({ history }) {
  const tableStatusTypesUIEvents = {
    newTableStatusTypeButtonClick: () => {
      history.push("//tableStatusTypes/new");
    },
    openEditTableStatusTypePage: (id) => {
      history.push(`//tableStatusTypes/${id}/edit`);
    },
    openDeleteTableStatusTypeDialog: (id) => {
      history.push(`//tableStatusTypes/${id}/delete`);
    },
    openDeleteTableStatusTypesDialog: () => {
      history.push(`//tableStatusTypes/deleteTableStatusTypes`);
    },
    openFetchTableStatusTypesDialog: () => {
      history.push(`//tableStatusTypes/fetch`);
    },
    openUpdateTableStatusTypesStatusDialog: () => {
      history.push("//tableStatusTypes/updateStatus");
    },
  };

  return (
    <TableStatusTypesUIProvider
      tableStatusTypesUIEvents={tableStatusTypesUIEvents}
    >
      <TableStatusTypesLoadingDialog />
      <Route path="//tableStatusTypes/:id/delete">
        {({ history, match }) => (
          <TableStatusTypeDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("//tableStatusTypes");
            }}
          />
        )}
      </Route>
      <TableStatusTypesCard />
    </TableStatusTypesUIProvider>
  );
}
