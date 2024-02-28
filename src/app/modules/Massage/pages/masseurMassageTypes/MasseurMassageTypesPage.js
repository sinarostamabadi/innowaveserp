import React from "react";
import { Route } from "react-router-dom";
import { MasseurMassageTypesLoadingDialog } from "./masseurMassageTypes-loading-dialog/MasseurMassageTypesLoadingDialog";
import { MasseurMassageTypeDeleteDialog } from "./masseurMassageType-delete-dialog/MasseurMassageTypeDeleteDialog";
import { MasseurMassageTypesCard } from "./MasseurMassageTypesCard";
import { MasseurMassageTypesUIProvider } from "./MasseurMassageTypesUIContext";

export function MasseurMassageTypesPage({ history }) {
  const masseurMassageTypesUIEvents = {
    newMasseurMassageTypeButtonClick: () => {
      history.push("/massage/masseurMassageTypes/new");
    },
    openEditMasseurMassageTypePage: (id) => {
      history.push(`/massage/masseurMassageTypes/${id}/edit`);
    },
    openDeleteMasseurMassageTypeDialog: (id) => {
      history.push(`/massage/masseurMassageTypes/${id}/delete`);
    },
    openDeleteMasseurMassageTypesDialog: () => {
      history.push(`/massage/masseurMassageTypes/deleteMasseurMassageTypes`);
    },
    openFetchMasseurMassageTypesDialog: () => {
      history.push(`/massage/masseurMassageTypes/fetch`);
    },
    openUpdateMasseurMassageTypesStatusDialog: () => {
      history.push("/massage/masseurMassageTypes/updateStatus");
    },
  };

  return (
    <MasseurMassageTypesUIProvider
      masseurMassageTypesUIEvents={masseurMassageTypesUIEvents}
    >
      <MasseurMassageTypesLoadingDialog />
      <Route path="/massage/masseurMassageTypes/:id/delete">
        {({ history, match }) => (
          <MasseurMassageTypeDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/massage/masseurMassageTypes");
            }}
          />
        )}
      </Route>
      <MasseurMassageTypesCard />
    </MasseurMassageTypesUIProvider>
  );
}
