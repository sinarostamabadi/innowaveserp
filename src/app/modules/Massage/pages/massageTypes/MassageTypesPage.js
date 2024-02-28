import React from "react";
import { Route } from "react-router-dom";
import { MassageTypesLoadingDialog } from "./massageTypes-loading-dialog/MassageTypesLoadingDialog";
import { MassageTypeDeleteDialog } from "./massageType-delete-dialog/MassageTypeDeleteDialog";
import { MassageTypesCard } from "./MassageTypesCard";
import { MassageTypesUIProvider } from "./MassageTypesUIContext";

export function MassageTypesPage({ history }) {
  const massageTypesUIEvents = {
    newMassageTypeButtonClick: () => {
      history.push("/massage/massageTypes/new");
    },
    openEditMassageTypePage: (id) => {
      history.push(`/massage/massageTypes/${id}/edit`);
    },
    openDeleteMassageTypeDialog: (id) => {
      history.push(`/massage/massageTypes/${id}/delete`);
    },
    openDeleteMassageTypesDialog: () => {
      history.push(`/massage/massageTypes/deleteMassageTypes`);
    },
    openFetchMassageTypesDialog: () => {
      history.push(`/massage/massageTypes/fetch`);
    },
    openUpdateMassageTypesStatusDialog: () => {
      history.push("/massage/massageTypes/updateStatus");
    },
  };

  return (
    <MassageTypesUIProvider massageTypesUIEvents={massageTypesUIEvents}>
      <MassageTypesLoadingDialog />
      <Route path="/massage/massageTypes/:id/delete">
        {({ history, match }) => (
          <MassageTypeDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/massage/massageTypes");
            }}
          />
        )}
      </Route>
      <MassageTypesCard />
    </MassageTypesUIProvider>
  );
}
